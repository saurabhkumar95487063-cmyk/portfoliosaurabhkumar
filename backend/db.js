const mongoose = require('mongoose');

// Determine connection URI from environment, fallback to local MongoDB database
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Define Schema for contact messages
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Create Model
const Message = mongoose.model('Message', messageSchema);

// Save a new contact message (returns a Promise)
async function saveContactMessage(name, email, message) {
  const newMessage = new Message({ name, email, message });
  const saved = await newMessage.save();
  return {
    id: saved._id,
    name: saved.name,
    email: saved.email,
    message: saved.message,
    created_at: saved.created_at
  };
}

// Retrieve all contact messages (returns a Promise)
async function getAllMessages() {
  // Find all messages sorted by creation date descending
  return await Message.find().sort({ created_at: -1 });
}

module.exports = {
  saveContactMessage,
  getAllMessages
};
