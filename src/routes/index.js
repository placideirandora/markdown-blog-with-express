import { Router } from 'express';

import articleRouter from './article';
import Article from '../models/Article';

const indexRouter = Router();

indexRouter.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });

  return res.render('article/index', { articles });
});

indexRouter.use('/article', articleRouter);

export default indexRouter;
