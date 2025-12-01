// src/context/cart-context.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { CartItem } from '@/lib/types';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/context/auth-context';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (user) {
        try {
          const data = await apiFetch('/api/cart/');
          if (!mounted) return;
          // map backend cart items to frontend CartItem type
          const mapped: CartItem[] = data.items.map((it: any) => ({
            id: String(it.id),
            productId: String(it.product.id),
            name: it.product.title || it.product.name || '',
            price: parseFloat(it.unit_price),
            weight: it.product.metadata?.weight || '',
            quantity: it.quantity,
            image: it.product.images?.[0]?.url || undefined,
          }));
          setItems(mapped);
        } catch (err) {
          console.error('Failed to load cart from API', err);
        }
      } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      }
    }
    load();
    return () => { mounted = false };
  }, []);

  useEffect(() => {
    // persist locally for guests; server persistence done on actions
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
    // if logged in, sync to backend and refresh cart
    (async () => {
      try {
        if (user) {
          await apiFetch('/api/cart/', {
            method: 'POST',
            body: JSON.stringify({ product_id: item.productId, quantity: item.quantity }),
          });
          const data = await apiFetch('/api/cart/');
          const mapped: CartItem[] = data.items.map((it: any) => ({
            id: String(it.id),
            productId: String(it.product.id),
            name: it.product.title || it.product.name || '',
            price: parseFloat(it.unit_price),
            weight: it.product.metadata?.weight || '',
            quantity: it.quantity,
            image: it.product.images?.[0]?.url || undefined,
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.error('Failed to add cart item to API', err);
      }
    })();
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
    (async () => {
      try {
        if (user) {
          await apiFetch(`/api/cart/items/${itemId}/`, { method: 'DELETE' });
        }
      } catch (err) {
        console.error('Failed to remove cart item from API', err);
      }
    })();
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === itemId ? { ...i, quantity } : i))
      );
      (async () => {
        try {
          if (user) {
            await apiFetch(`/api/cart/items/${itemId}/`, {
              method: 'PUT',
              body: JSON.stringify({ quantity }),
            });
          }
        } catch (err) {
          console.error('Failed to update cart item quantity on API', err);
        }
      })();
    }
  };

  const clearCart = () => {
    setItems([]);
  };
  
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);


  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateItemQuantity, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
