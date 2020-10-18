import express, { Request, Response } from 'express';
import pkg from '../package.json';

const app = express();

// routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    version: pkg.version,
    name: pkg.name,
  });
});

// server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
