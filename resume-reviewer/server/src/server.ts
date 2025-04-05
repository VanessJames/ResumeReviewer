import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Backend is running');
});

app.use('/api/upload', uploadRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
