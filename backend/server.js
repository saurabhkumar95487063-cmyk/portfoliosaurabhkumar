const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { saveContactMessage, getAllMessages } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend deployment (Vercel)
app.use(cors({
  origin: '*', // Allow all origins for easy API access, restrict in production if needed
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome & status check
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Saurabh Kumar | Portfolio Backend API</title>
        <style>
          body { font-family: sans-serif; background-color: #060713; color: #f3f4f6; text-align: center; padding: 4rem; }
          h1 { color: #00f0ff; }
          p { color: #9ca3af; font-size: 1.1rem; }
          .status { display: inline-block; padding: 8px 16px; border-radius: 20px; background: rgba(34, 197, 94, 0.15); color: #4ade80; font-weight: bold; border: 1px solid #4ade80; }
        </style>
      </head>
      <body>
        <h1>⚡ Saurabh Kumar Portfolio Backend ⚡</h1>
        <p>Your Express backend server is up and running perfectly on Render!</p>
        <div class="status">● Server Online</div>
      </body>
    </html>
  `);
});

// GET health check route
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// GET Developer data (dynamic endpoint)
app.get('/api/data', (req, res) => {
  res.json({
    name: "Saurabh Kumar",
    role: "BCA Student & Aspiring Software Developer",
    stats: {
      projectsCompleted: 10,
      technologies: 5,
      certifications: 3,
      hoursCoding: 200
    },
    about: {
      bio: "I am a BCA student with a strong interest in software development, web technologies, and database design. I build responsive and interactive applications that create real-world impact and enjoy continuously learning new tools.",
      codeSnippet: `const developer = {
  name: "Saurabh Kumar",
  role: "BCA Student",
  skills: ["C", "Java", "Python", "Web Dev"],
  passion: "Building solutions & learning",
  goal: "To become a Full Stack Developer"
};`
    }
  });
});

// POST Contact Form Route
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const saved = await saveContactMessage(name, email, message);
    console.log(`New contact inquiry saved: ${name} <${email}>`);
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! It has been successfully saved to the database.',
      data: saved
    });
  } catch (error) {
    console.error('Error saving message:', error.message);
    res.status(500).json({ error: 'Server database error. Please try again later.' });
  }
});

// GET Contact Messages Route (Simple admin view, query-key protected)
app.get('/api/messages', async (req, res) => {
  const adminKey = req.query.key || req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_KEY || 'saurabh123'; // Default admin password key

  if (adminKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized. Please provide the correct admin key query parameter (?key=...).' });
  }

  try {
    const messages = await getAllMessages();
    res.json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error('Error retrieving messages:', error.message);
    res.status(500).json({ error: 'Could not fetch messages from database.' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
