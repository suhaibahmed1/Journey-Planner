// backend/src/routes/plans.js
import { Router } from 'express';
const router = Router();

// In-memory storage for example (you can later save to a database).
const plans = [];

/**
 * Route to create a new custom travel plan request
 */
router.post('/', (req, res) => {
  const {
    destination,
    budget,
    travelers,
    startDate,
    endDate,
    accommodation,
    activities,
    specialRequests,
  } = req.body;

  // Basic Validation
  if (!destination || !travelers || !startDate) {
    return res.status(400).json({ error: 'Destination, travelers, and start date are required.' });
  }

  const newPlan = {
    id: plans.length + 1,
    destination,
    budget,
    travelers,
    startDate,
    endDate,
    accommodation,
    activities,
    specialRequests,
    createdAt: new Date(),
  };
  plans.push(newPlan);

  res.json({ message: 'Plan submitted successfully', plan: newPlan });
});

/**
 * Route to fetch all custom travel plans (for admin or review)
 */
router.get('/', (req, res) => {
  res.json(plans);
});

export default router;

