import express from 'express';
import { Article } from '../models/Article.js';
import { Comment } from '../models/Comment.js';
import { authenticateToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Article list
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.render('articleList', { articles, user: req.user });
  } catch (error) {
    res.render('error', { message: 'Failed to load articles', user: req.user });
  }
});

// My articles
router.get('/my-articles', requireAuth, async (req, res) => {
  try {
    const articles = await Article.findByAuthor(req.user.id);
    res.render('myArticles', { articles, user: req.user });
  } catch (error) {
    res.render('error', { message: 'Failed to load your articles', user: req.user });
  }
});

// New article form
router.get('/new', requireAuth, (req, res) => {
  res.render('articleForm', { 
    article: null, 
    isEdit: false, 
    user: req.user 
  });
});

// Create article
router.post('/new', requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    await Article.create({ title, content, author_id: req.user.id });
    res.redirect('/articles/my-articles');
  } catch (error) {
    res.render('articleForm', { 
      article: req.body, 
      isEdit: false, 
      error: 'Failed to create article',
      user: req.user 
    });
  }
});

// View single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    const comments = await Comment.findByArticle(req.params.id);
    
    if (!article) {
      return res.render('error', { message: 'Article not found', user: req.user });
    }
    
    res.render('articleItem', { article, comments, user: req.user });
  } catch (error) {
    res.render('error', { message: 'Failed to load article', user: req.user });
  }
});

// Edit article form
router.get('/:id/edit', requireAuth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.render('error', { message: 'Article not found', user: req.user });
    }
    
    if (article.author_id !== req.user.id && req.user.role !== 'admin') {
      return res.render('error', { 
        message: 'You can only edit your own articles', 
        user: req.user 
      });
    }
    
    res.render('articleForm', { 
      article, 
      isEdit: true, 
      user: req.user 
    });
  } catch (error) {
    res.render('error', { message: 'Failed to load article', user: req.user });
  }
});

// Update article
router.post('/:id/edit', requireAuth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article || (article.author_id !== req.user.id && req.user.role !== 'admin')) {
      return res.render('error', { 
        message: 'You can only edit your own articles', 
        user: req.user 
      });
    }
    
    const { title, content } = req.body;
    await Article.update(req.params.id, { title, content });
    res.redirect(`/articles/${req.params.id}`);
  } catch (error) {
    res.render('error', { message: 'Failed to update article', user: req.user });
  }
});

// Delete article
router.post('/:id/delete', requireAuth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article || (article.author_id !== req.user.id && req.user.role !== 'admin')) {
      return res.render('error', { 
        message: 'You can only delete your own articles', 
        user: req.user 
      });
    }
    
    await Article.delete(req.params.id);
    res.redirect('/articles/my-articles');
  } catch (error) {
    res.render('error', { message: 'Failed to delete article', user: req.user });
  }
});

// Add comment
router.post('/:id/comments', requireAuth, async (req, res) => {
  try {
    const { content } = req.body;
    await Comment.create({
      content,
      article_id: req.params.id,
      author_id: req.user.id
    });
    res.redirect(`/articles/${req.params.id}`);
  } catch (error) {
    res.redirect(`/articles/${req.params.id}?error=Failed to add comment`);
  }
});

export default router;