// backend/src/routes/bookings.js
import { Router } from 'express';

const router = Router();

// In-memory bookings (you can replace this with a database later)
let bookings = [];

/**
 * POST /api/book
 * Create a new booking
 */
router.post('/', (req, res) => {
  const { name, email, phone, category, selectedTour } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !category || !selectedTour) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    email,
    phone,
    category,
    selectedTour,
    date: new Date(),
  };
  bookings.push(newBooking);

  res.json({ message: 'Booking confirmed', booking: newBooking });
});

/**
 * GET /api/book
 * List all bookings
 */
router.get('/', (req, res) => {
  res.json(bookings);
});

export default router;
