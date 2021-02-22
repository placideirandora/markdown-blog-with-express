import { Router } from 'express';

import articleRouter from './article';

const indexRouter = Router();

const articles = [];

indexRouter.get('/', (req, res) => {
  return res.render('article/index', { articles });
});

indexRouter.use('/article', articleRouter);

export default indexRouter;
