import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY!;
const HUGGINGFACE_ENDPOINT = process.env.HUGGINGFACE_ENDPOINT!;

interface AnalysisResult {
  matchPercentage: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export const analyzeResume = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
  const prompt = `
You are an intelligent resume reviewer. A user uploaded the following resume and job description. Analyze how well the resume matches the job description.

Respond in JSON format with:
- matchPercentage (0-100),
- strengths (array),
- weaknesses (array),
- suggestions (array)

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond:
`;

  try {
    const response = await axios.post(
      HUGGINGFACE_ENDPOINT,
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 60000, // long timeout in case the model is cold
      }
    );

    // Extract JSON from model output
    const rawOutput = response.data.generated_text || response.data[0]?.generated_text;
    const jsonStart = rawOutput.indexOf('{');
    const jsonEnd = rawOutput.lastIndexOf('}') + 1;
    const jsonString = rawOutput.substring(jsonStart, jsonEnd);

    const result: AnalysisResult = JSON.parse(jsonString);
    return result;
  } catch (error) {
    console.error('Error during resume analysis:', error);
    throw new Error('Failed to analyze resume');
  }
};
