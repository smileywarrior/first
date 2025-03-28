import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Authentication Routes
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❗ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api', urlRoutes);
app.use('/api/auth', authRoutes);  // Authentication API


// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API!');
});

// Server Listener
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
