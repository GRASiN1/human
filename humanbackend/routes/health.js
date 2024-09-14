// routes/testRoute.js

const express = require('express');
const { createHealthGoal } = require('../controller/health');
const router = express.Router();

// Basic test route to check if routing is working
router.post('/', createHealthGoal);

module.exports = router;