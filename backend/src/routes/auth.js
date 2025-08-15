import express from 'express';
const router = express.Router();

// ✅ This array will "hold" all registered users temporarily
let users = []; 

/**
 * POST /api/auth/signup
 */
router.post('/signup', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // Check if user already exists
  const existing = users.find((user) => user.email === email);
  if (existing) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  // Create new user object
  const newUser = { firstName, lastName, email, phone, password };
  users.push(newUser);

  console.log('👤 User registered:', newUser);
  res.json({ success: true, message: 'User registered successfully' });
});


/**
 * POST /api/auth/login
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        email: user.email,
      },
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }
});


/**
 * POST /api/auth/forgot-password
 */
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if the email exists
  const userExists = users.find((user) => user.email === email);
  if (!userExists) {
    return res.status(200).json({
      success: true,
      message: 'If an account exists, a reset link has been sent.',
    });
  }

  console.log(`Password reset requested for ${email}`);
  res.json({
    success: true,
    message: `Password reset link sent to ${email}`,
  });
});

export default router;
