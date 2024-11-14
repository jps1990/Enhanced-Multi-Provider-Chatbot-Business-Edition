import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { model, prompt, apiKey } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024
      },
      {
        headers: {
            'anthropic-version': '2024-10-22',
            'x-api-key': apiKey
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.listen(3000, () => console.log('Server running on port 3000')); 