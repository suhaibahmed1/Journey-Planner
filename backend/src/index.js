import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import tripsRoutes from './routes/trips.js';
import bookingsRoutes from './routes/bookings.js';
import contactRoutes from './routes/contact.js';
import plansRoutes from './routes/plans.js';

dotenv.config();
const app = express();

// ✅ Single declaration
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/plans', plansRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
