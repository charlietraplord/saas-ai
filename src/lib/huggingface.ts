import { HfInference } from '@huggingface/inference';

// Initialize the Hugging Face client with your API token
// You can get a token from: https://huggingface.co/settings/tokens
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Default model for customer service
const DEFAULT_MODEL = 'facebook/blenderbot-400M-distill';

// Together API (OpenAI-compatible) chat completion for SaaS AI Agent
export async function togetherChatCompletion({
  messages,
  model = 'deepseek-ai/DeepSeek-R1',
  temperature = 0.5,
  top_p = 0.7,
  stream = false
}: {
  messages: { role: string; content: string }[];
  model?: string;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
}) {
  const togetherApiUrl = 'https://router.huggingface.co/together/v1/chat/completions';
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  const res = await fetch(togetherApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      temperature,
      top_p,
      model,
      stream,
    }),
  });
  if (!res.ok) {
    throw new Error(`Together API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export { hf, DEFAULT_MODEL };
