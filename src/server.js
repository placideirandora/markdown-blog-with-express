import path from 'path';
import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  return res.render('index');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App Listening on Port: ${port}`);
});
