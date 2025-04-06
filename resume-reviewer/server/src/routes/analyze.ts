import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { parseResume } from '../parser';
import { extractKeywords, calculateMatch } from '../utils';
import { analyzeWithAI } from '../analysis';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), (req: Request, res: Response, next) => {
  (async () => {
    try {
      const jobDescription = req.body.jobDescription;

      if (!req.file || !jobDescription) {
        return res.status(400).json({ error: 'Resume and job description are required.' });
      }

      const pdfData = await pdfParse(req.file.buffer);
      const parsedResume = parseResume(pdfData.text);
      const jobKeywords = extractKeywords(jobDescription);

      const allResumeWords = extractKeywords(parsedResume.text);
      const matchResult = calculateMatch(allResumeWords, jobKeywords);

      const aiFeedback = await analyzeWithAI(parsedResume.text, jobDescription);

      res.json({
        matchPercentage: matchResult.matchPercentage,
        strengths: matchResult.matchedKeywords,
        weaknesses: matchResult.missingKeywords,
        feedback: aiFeedback,
      });
    } catch (error) {
      console.error('Error during analysis:', error);
      res.status(500).json({ error: 'Something went wrong during analysis.' });
    }
  })().catch(next);
});

export default router;
