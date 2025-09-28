import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register routes
router.get('/register', (req, res) => {
  res.render('register', { error: null, user: req.user });
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      return res.render('register', { 
        error: 'Passwords do not match', 
        user: null 
      });
    }

    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.render('register', { 
        error: 'Username already exists', 
        user: null 
      });
    }

    await User.create({ username, password });
    res.redirect('/auth/login?registered=true');
  } catch (error) {
    res.render('register', { 
      error: 'Registration failed. Please try again.', 
      user: null 
    });
  }
});

// Login routes
router.get('/login', (req, res) => {
  const message = req.query.registered ? 'Registration successful! Please log in.' : null;
  res.render('login', { error: null, message, user: req.user });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findByUsername(username);
    if (!user || !User.verifyPassword(password, user.password)) {
      return res.render('login', { 
        error: 'Invalid username or password', 
        message: null,
        user: null 
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, { 
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.redirect('/articles');
  } catch (error) {
    res.render('login', { 
      error: 'Login failed. Please try again.', 
      message: null,
      user: null 
    });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/articles');
});

export default router;