import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/analyze', upload.single('resume'), async (req: Request, res: Response): Promise<void> => {
  const jobDescription = req.body.jobDescription;

  if (!req.file || !jobDescription) {
    res.status(400).json({ error: 'Resume and job description are required.' });
    return;
  }

  try {
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text.toLowerCase();
    const jobText = jobDescription.toLowerCase();

    // Simple keyword matching logic
    const jobKeywords = jobText.match(/\b\w+\b/g) || [];
    const uniqueKeywords = Array.from(new Set(jobKeywords)) as string[];
    
    const matchedKeywords = uniqueKeywords.filter(word => resumeText.includes(word));
    const matchPercentage = ((matchedKeywords.length / uniqueKeywords.length) * 100).toFixed(2);

    const feedback = `
Your resume matches ${matchPercentage}% of the keywords in the job description.
Matched keywords: ${matchedKeywords.slice(0, 10).join(', ') || 'None'}
Try including more relevant skills or experiences mentioned in the job description.
    `;

    res.json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze resume.' });
  }
});

export default router;
