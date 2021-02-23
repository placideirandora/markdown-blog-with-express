import { Router } from 'express';

import Article from '../models/Article';

const articleRouter = Router();

articleRouter.get('/new', (req, res) => {
  const article = new Article();

  return res.render('article/new', { article });
});

articleRouter.get('/:id', async (req, res) => {
  const article = await Article.findOne({ _id: req.params.id });

  if (!article) return res.redirect('/');

  return res.render('article/show', { article });
});

articleRouter.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    image: req.body.image,
    body: req.body.body,
    markdown: req.body.markdown,
    source: req.body.source
  });

  try {
    const storedArticle = await article.save();

    return res.redirect(`/article/${storedArticle._id}`);
  } catch (error) {
    console.log(error);

    return res.render('article/new', { article });
  }
});

export default articleRouter;
