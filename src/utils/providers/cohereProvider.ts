import axios from 'axios';

export const makeCohereRequest = async (
  model: string,
  prompt: string,
  temperature: number,
  apiKey: string
) => {
  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        prompt: prompt || "Hello",
        model,
        temperature,
        max_tokens: 1024
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      data: {
        content: [{
          text: response.data.generations?.[0]?.text || ''
        }]
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid Cohere API key');
      } else if (error.response?.status === 404) {
        throw new Error(`Model '${model}' not found or not accessible`);
      }
    }
    throw error;
  }
};