import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../types';
import { makeOpenAIRequest } from './providers/openaiProvider';
import { makeCohereRequest } from './providers/cohereProvider';
import { generateImage } from './imageHelpers';

export const handleApiCall = async (
  provider: string,
  model: string,
  apiKeys: { [key: string]: string },
  prompt: string,
  temperature: number,
  file: File | null,
  imageSettings: {
    size: string;
    quality: 'standard' | 'hd';
    style: 'natural' | 'vivid';
  }
): Promise<ApiResponse> => {
  try {
    if (!apiKeys[provider]) {
      return {
        content: `Please provide a valid ${provider.toUpperCase()} API key in the configuration panel.`,
        type: 'error'
      };
    }

    if (model.includes('dall-e')) {
      try {
        const imageUrl = await generateImage(apiKeys.openai, {
          model,
          prompt,
          n: 1,
          size: imageSettings.size,
          quality: imageSettings.quality,
          style: imageSettings.style
        });
        return {
          content: prompt,
          type: 'image',
          imageUrl
        };
      } catch (error) {
        return {
          content: error instanceof Error ? error.message : 'Failed to generate image',
          type: 'error'
        };
      }
    }

    let response;
    switch (provider) {
      case 'openai':
        response = await makeOpenAIRequest(model, prompt, temperature, apiKeys[provider], file);
        return {
          content: response,
          type: 'text'
        };
      case 'cohere':
        response = await makeCohereRequest(model, prompt, temperature, apiKeys[provider]);
        return {
          content: response.data.content[0].text,
          type: 'text'
        };
      default:
        return {
          content: 'Provider not supported',
          type: 'error'
        };
    }
  } catch (error) {
    let errorMessage = `Error with ${provider.toUpperCase()} (${model}): `;
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: { message?: string } }>;
      if (axiosError.response?.data?.error?.message) {
        errorMessage += axiosError.response.data.error.message;
      } else if (axiosError.response?.data && typeof axiosError.response.data === 'string') {
        errorMessage += axiosError.response.data;
      } else if (axiosError.message) {
        errorMessage += axiosError.message;
      } else {
        errorMessage += 'Unknown API error occurred';
      }
    } else {
      errorMessage += error instanceof Error ? error.message : 'Unknown error occurred';
    }

    return {
      content: errorMessage,
      type: 'error'
    };
  }
};