import express from 'express';
import { User } from '../models/User.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware
router.use(authenticateToken);

// Admin dashboard
router.get('/admin', requireAdmin, async (req, res) => {
  res.render('admin', { user: req.user });
});

export default router;