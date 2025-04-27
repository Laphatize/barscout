const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Bar = require('../models/Bar');

// Admin: list bars
router.get('/bars', auth, admin, async (req, res) => {
  const bars = await Bar.find();
  res.json(bars);
});

// Admin: add bar (now supports image)
router.post('/bars', auth, admin, async (req, res) => {
  const { name, location, image } = req.body;
  const bar = new Bar({ name, location, image });
  await bar.save();
  res.status(201).json(bar);
});

module.exports = router;