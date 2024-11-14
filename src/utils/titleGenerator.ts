import { handleApiCall } from './apiHelpers';
import { ApiKeys } from '../types';

export const generateTitle = async (
  firstMessage: string,
  apiKeys: ApiKeys,
  providers: ('openai')[] = ['openai']
): Promise<string> => {
  const titlePrompt = `Based on this first message, generate a very short, concise title (max 4-5 words):
"${firstMessage}"
Just return the title, nothing else.`;

  try {
    const response = await handleApiCall(
      'openai',
      'gpt-3.5-turbo',
      apiKeys,
      titlePrompt,
      0.3,
      null,
      {
        size: '1024x1024',
        quality: 'standard',
        style: 'natural'
      }
    );

    if (response.type === 'error' || !response.content) {
      return `Chat ${new Date().toLocaleString()}`;
    }

    return response.content
      .trim()
      .replace(/^["']|["']$/g, '')
      .replace(/\n/g, ' ')
      .slice(0, 50);
  } catch (error) {
    console.error('Failed to generate title:', error);
    return `Chat ${new Date().toLocaleString()}`;
  }
};