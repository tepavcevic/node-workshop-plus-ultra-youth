import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Worldddddddddddddddd!');
});

app.get('/health', (req, res) => {
  res.status(201).send('health is optimal');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
