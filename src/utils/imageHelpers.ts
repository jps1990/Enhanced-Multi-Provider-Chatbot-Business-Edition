import axios from 'axios';

interface ImageGenerationOptions {
  model: string;
  prompt: string;
  n: number;
  size: string;
  quality: 'standard' | 'hd';
  style: 'natural' | 'vivid';
  seed?: string;
}

export const generateImage = async (apiKey: string, options: ImageGenerationOptions): Promise<string> => {
  const { model, prompt, n, size, quality, style, seed } = options;
  
  const requestBody: any = {
    model,
    prompt,
    n,
    size,
    quality,
    style
  };

  if (seed) {
    requestBody.seed = parseInt(seed);
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        ...requestBody,
        response_format: 'url'
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate image');
  }
};