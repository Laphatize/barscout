const router = require('express').Router();
const Bar = require('../models/Bar');
const auth = require('../middleware/auth');

// List bars
router.get('/', async (req, res) => {
  const bars = await Bar.find();
  res.json(bars);
});

// Get bar detail
router.get('/:id', async (req, res) => {
  const bar = await Bar.findById(req.params.id);
  res.json(bar);
});

// Add bar (for general users, with image)
router.post('/', auth, async (req, res) => {
  const { name, location, image } = req.body;
  const bar = new Bar({ name, location, image });
  await bar.save();
  res.status(201).json(bar);
});

// Rate a bar
router.post('/:id/rate', auth, async (req, res) => {
  const { value } = req.body;
  if (value < 1 || value > 5) return res.status(400).json({ error: 'Rating must be 1-5' });
  const bar = await Bar.findById(req.params.id);
  // Remove previous rating by user
  bar.ratings = bar.ratings.filter(r => r.user.toString() !== req.user.id);
  bar.ratings.push({ user: req.user.id, value });
  await bar.save();
  res.json(bar);
});

// Submit cover fee
router.post('/:id/cover', auth, async (req, res) => {
  const { amount } = req.body;
  if (amount < 0) return res.status(400).json({ error: 'Amount must be positive' });
  const bar = await Bar.findById(req.params.id);
  bar.coverFees.push({ user: req.user.id, amount });
  await bar.save();
  res.json(bar);
});

// Submit traffic report
router.post('/:id/traffic', auth, async (req, res) => {
  const { level } = req.body;
  const allowed = ['Empty', 'Moderate', 'Busy', 'Packed'];
  if (!allowed.includes(level)) return res.status(400).json({ error: 'Invalid traffic level' });
  const bar = await Bar.findById(req.params.id);
  bar.trafficReports.push({ user: req.user.id, level });
  await bar.save();
  res.json(bar);
});

module.exports = router;