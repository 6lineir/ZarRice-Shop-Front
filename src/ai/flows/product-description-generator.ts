'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions for rice varieties.
 *
 * The flow takes basic information about a rice variety as input and uses a
 * GenAI model to generate an appealing product description.
 *
 * @exports generateProductDescription - The main function to trigger the flow.
 * @exports ProductDescriptionInput - The input type for the flow.
 * @exports ProductDescriptionOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the product description generator.
const ProductDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the rice variety.'),
  variety: z.string().describe('The variety of the rice (e.g., Tarom, Sadri, Hashemi).'),
  origin: z.string().describe('The geographical origin of the rice.'),
  aroma: z.string().describe('A description of the rice\u2019s aroma.'),
  texture: z.string().describe('A description of the rice\u2019s texture when cooked.'),
  flavor: z.string().describe('A description of the rice\u2019s flavor.'),
  cookingTips: z.string().describe('Cooking tips for this rice variety.'),
});
export type ProductDescriptionInput = z.infer<typeof ProductDescriptionInputSchema>;

// Define the output schema for the product description generator.
const ProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type ProductDescriptionOutput = z.infer<typeof ProductDescriptionOutputSchema>;

// Define the main function to generate the product description.
export async function generateProductDescription(
  input: ProductDescriptionInput
): Promise<ProductDescriptionOutput> {
  return productDescriptionGeneratorFlow(input);
}

// Define the prompt for the product description generator.
const productDescriptionPrompt = ai.definePrompt({
  name: 'productDescriptionPrompt',
  input: {schema: ProductDescriptionInputSchema},
  output: {schema: ProductDescriptionOutputSchema},
  prompt: `Write an enticing product description for our premium Iranian rice, highlighting its unique qualities.

  Rice Name: {{name}}
  Variety: {{variety}}
  Origin: {{origin}}
  Aroma: {{aroma}}
  Texture: {{texture}}
  Flavor: {{flavor}}
  Cooking Tips: {{cookingTips}}

  Description:`,
});

// Define the Genkit flow for generating product descriptions.
const productDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'productDescriptionGeneratorFlow',
    inputSchema: ProductDescriptionInputSchema,
    outputSchema: ProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await productDescriptionPrompt(input);
    return output!;
  }
);
