import marked from 'marked';
import slugify from 'slugify';
import mongoose from 'mongoose';
import { JSDOM } from 'jsdom';
import createDomPurifier from 'dompurify';

const dompurify = createDomPurifier(new JSDOM().window);

const ArticleSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ArticleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
  }

  next();
});

export default mongoose.model('Article', ArticleSchema);
