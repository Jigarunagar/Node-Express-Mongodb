import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import userRoutes from './routes/users.js';

// Import database initialization
import { initializeDatabase } from './models/database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize database
await initializeDatabase();

// Routes
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/articles');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});