import axios from 'axios';

export const makeAnthropicRequest = async (
  model: string,
  prompt: string,
  apiKey: string
) => {
  try {
    const response = await axios.post(
      '/api/anthropic',
      {
        model,
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 1024
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2024-01-01',
          'content-type': 'application/json'
        }
      }
    );

    return {
      data: {
        content: [{
          text: response.data.content[0].text
        }]
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid Anthropic API key');
      } else if (error.response?.status === 404) {
        throw new Error(`Model '${model}' not found or not accessible`);
      }
    }
    throw error;
  }
};