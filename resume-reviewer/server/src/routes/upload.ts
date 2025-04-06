import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';

const router = express.Router();

// Setup multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded.' });
    return;
  }

  try {
    // Parse PDF buffer
    const pdfData = await pdfParse(req.file.buffer);

    // The extracted text
    const resumeText = pdfData.text;

    res.json({
      message: 'File uploaded and parsed successfully!',
      resumeText: resumeText.substring(0, 5000), // Just return the first 500 characters for now
    });
  } catch (error) {
    res.status(500).json({ error: 'Error parsing the PDF.' });
  }
});

export default router;
