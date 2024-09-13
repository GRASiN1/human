// routes/testRoute.js

const express = require('express');
const router = express.Router();

// Basic test route to check if routing is working
router.get('/', (req, res) => {
  res.json({ message: 'Test route is working!', status: 'T' });
});

module.exports = router;