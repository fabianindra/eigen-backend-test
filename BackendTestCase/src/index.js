import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import setupSwagger from './swagger.js';
import bookRouter from './routers/bookRouter.js';
import memberRouter from './routers/memberRouter.js';
import borrowRouter from './routers/borrowRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setupSwagger(app);

app.use('/api/books', bookRouter);
app.use('/api/members', memberRouter);
app.use('/api/borrows', borrowRouter);

const PORT = 3300;

app.get('/', (req, res) => {
  res.send({
    message: 'REST API running',
  });
});

app.listen(PORT, () => {
  console.log(`Application running on port: ${PORT}`);
});
