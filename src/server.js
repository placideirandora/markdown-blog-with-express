import path from 'path';
import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';

import indexRouter from './routes';

config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

// Database connection
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.error('Database Not Connected Due To: ', err);
  });

app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App Listening on Port: ${port}`);
});
