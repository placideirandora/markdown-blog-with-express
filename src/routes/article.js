import { Router } from 'express';

const articleRouter = Router();

articleRouter.get('/new', (req, res) => {
  return res.render('article/new');
});

export default articleRouter;
