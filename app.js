import express from 'express';
const app = express();
import routes from './routes/routes.js';
import cors from 'cors';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
