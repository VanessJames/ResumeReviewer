import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { analyzeResume } from '../analysis';

const router = express.Router();

// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/analyze
router.post('/', upload.single('resume'), (req, res) => {
  (async () => {
    try {
      const jobDescription = req.body.jobDescription;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'No resume file uploaded.' });
        return;
      }

      if (!jobDescription) {
        res.status(400).json({ error: 'Job description is required.' });
        return;
      }

      // Parse resume PDF
      const pdfData = await pdfParse(file.buffer);
      const resumeText = pdfData.text;

      // Analyze resume vs job description
      const result = await analyzeResume(resumeText, jobDescription);

      res.json(result);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      res.status(500).json({ error: 'An error occurred while analyzing the resume.' });
    }
  })();
});

export default router;
