require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/student-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'student-dashboard.html'));
});

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

app.get('/register-student', (req, res) => {
  res.sendFile(path.join(__dirname, 'register-student.html'));
});

app.get('/register-admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'register-admin.html'));
});

app.get('/login-student', (req, res) => {
  res.sendFile(path.join(__dirname, 'login-student.html'));
});

app.get('/login-admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'login-admin.html'));
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📍 Database: ${process.env.MONGODB_URI}`);
})
.catch(err => {
  console.error('❌ MongoDB connection error:');
  console.error(err.message);
  console.error('\n⚠️  Make sure MongoDB is running:');
  console.error('   Windows: mongod --version');
  console.error('   Or use MongoDB Atlas (cloud)');
  process.exit(1);
});

// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
