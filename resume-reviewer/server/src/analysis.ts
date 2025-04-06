// src/analysis.ts
import axios from 'axios';

const HUGGINGFACE_API = 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli';

export async function analyzeWithAI(resumeText: string, jobDescription: string): Promise<string> {
  try {
    const response = await axios.post(
      HUGGINGFACE_API,
      {
        inputs: {
          premise: resumeText,
          hypothesis: jobDescription,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        }
      }
    );

    const [result] = response.data;
    const confidence = result?.scores?.[0] ?? 0;

    return `AI Analysis Confidence Score: ${(confidence * 100).toFixed(2)}%`;
  } catch (error) {
    console.error('AI analysis failed:', error);
    return 'AI analysis failed';
  }
}
