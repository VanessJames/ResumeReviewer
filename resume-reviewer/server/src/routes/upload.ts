import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Setup multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded.' });
      return;
    }

    // You now have access to `req.file.buffer` — the PDF content
    res.json({ message: 'File received successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the file.' });
  }
});

export default router;
