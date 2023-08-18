import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
// $env:PORT=5000 to set port
const app: Express = express();
const port = process.env.PORT||3002;
console.log(port)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});