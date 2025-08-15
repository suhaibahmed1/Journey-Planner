// backend/src/routes/contact.js
import { Router } from 'express';

const router = Router();

// In-memory storage (you can replace this with a database later).
const messages = [];

/**
 * Route to save a new contact message
 */
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ error: 'All required fields must be filled.' });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    phone,
    subject,
    message,
    receivedAt: new Date(),
  };
  messages.push(newMessage);

  res.json({ message: 'Thank you! Your message has been received.' });
});

/**
 * Route to fetch all messages (optional, for admin review)
 */
router.get('/', (req, res) => {
  res.json(messages);
});

export default router;
