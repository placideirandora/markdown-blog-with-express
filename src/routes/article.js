import { Router } from 'express';

import Article from '../models/Article';

const articleRouter = Router();

articleRouter.get('/new', (req, res) => {
  const article = new Article();

  return res.render('article/new', { article });
});

articleRouter.get('/edit/:id', async (req, res) => {
  const article = await Article.findOne({ _id: req.params.id });

  return res.render('article/edit', { article });
});

articleRouter.put('/edit/:id', async (req, res) => {
  let article = await Article.findOne({ _id: req.params.id });

  article.title = req.body.title;
  article.image = req.body.image;
  article.body = req.body.body;
  article.markdown = req.body.markdown;
  article.source = req.body.source;

  try {
    article.save();

    return res.redirect(`/article/${article.slug}`);
  } catch (error) {
    return res.render('article/edit', { article });
  }
});

articleRouter.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (!article) return res.redirect('/');

  return res.render('article/show', { article });
});

articleRouter.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    image: req.body.image,
    body: req.body.body,
    markdown: req.body.markdown,
    source: req.body.source,
  });

  try {
    const storedArticle = await article.save();

    return res.redirect(`/article/${storedArticle._id}`);
  } catch (error) {
    return res.render('article/new', { article });
  }
});

articleRouter.delete('/:id', async (req, res) => {
  await Article.findOneAndDelete({ _id: req.params.id });

  return res.redirect('/');
});

export default articleRouter;
