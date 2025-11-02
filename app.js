import express from 'express';
const app = express();
import routes from './routes/routes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
