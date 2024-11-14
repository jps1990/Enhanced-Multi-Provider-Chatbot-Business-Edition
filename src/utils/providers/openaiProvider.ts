import axios from 'axios';

export const makeOpenAIRequest = async (
  model: string,
  prompt: string,
  temperature: number,
  apiKey: string,
  uploadedFile: File | null
) => {
  try {
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
        max_tokens: 1024
      },
      { headers }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid OpenAI API key');
      } else if (error.response?.status === 404) {
        throw new Error(`Model '${model}' not found or not accessible`);
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data.error?.message || 'Invalid request to OpenAI API');
      }
    }
    throw error;
  }
};