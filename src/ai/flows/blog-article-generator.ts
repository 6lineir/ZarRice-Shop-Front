'use server';

/**
 * @fileOverview Generates draft blog articles related to Iranian rice.
 *
 * - generateBlogArticle - A function that generates a blog article.
 * - BlogArticleInput - The input type for the generateBlogArticle function.
 * - BlogArticleOutput - The return type for the generateBlogArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogArticleInputSchema = z.object({
  topic: z
    .string()
    .describe(
      'The topic of the blog article. Examples: cultivation, cooking tips, storage guides.'
    ),
  keywords: z
    .string()
    .describe('Comma separated keywords to guide the content.'),
  tone: z
    .string()
    .default('informative')
    .describe('The tone of the article, e.g., informative, friendly, professional.'),
  length: z
    .string()
    .default('medium')
    .describe('The desired length of the article (short, medium, long).'),
});
export type BlogArticleInput = z.infer<typeof BlogArticleInputSchema>;

const BlogArticleOutputSchema = z.object({
  title: z.string().describe('The title of the blog article.'),
  content: z.string().describe('The full content of the blog article.'),
});
export type BlogArticleOutput = z.infer<typeof BlogArticleOutputSchema>;

export async function generateBlogArticle(
  input: BlogArticleInput
): Promise<BlogArticleOutput> {
  return generateBlogArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'blogArticlePrompt',
  input: {schema: BlogArticleInputSchema},
  output: {schema: BlogArticleOutputSchema},
  prompt: `You are an expert blog writer specializing in Iranian rice.

  Write a blog article about {{topic}}.
  Incorporate the following keywords: {{keywords}}.
  The tone of the article should be {{tone}} and the length should be {{length}}.
  The article should be SEO optimized for the keywords provided and target audience looking to purchase premium Iranian rice.
  Do not include any links.

  Article: `,
});

const generateBlogArticleFlow = ai.defineFlow(
  {
    name: 'generateBlogArticleFlow',
    inputSchema: BlogArticleInputSchema,
    outputSchema: BlogArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
