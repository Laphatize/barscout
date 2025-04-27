const router = require('express').Router();
const auth = require('../middleware/auth');
const Bar = require('../models/Bar');
const QueueEntry = require('../models/QueueEntry');

// Join queue
router.post('/:barId', auth, async (req, res) => {
  const userId = req.user.id;
  const bar = await Bar.findById(req.params.barId);
  await new QueueEntry({ user: userId, bar: bar._id }).save();
  bar.queueCount++;
  await bar.save();
  res.sendStatus(200);
});

// Leave queue
router.delete('/:barId', auth, async (req, res) => {
  const userId = req.user.id;
  const bar = await Bar.findById(req.params.barId);
  await QueueEntry.deleteOne({ user: userId, bar: bar._id });
  bar.queueCount = Math.max(0, bar.queueCount - 1);
  await bar.save();
  res.sendStatus(200);
});

// Check if joined
router.get('/:barId', auth, async (req, res) => {
  const exists = await QueueEntry.exists({ user: req.user.id, bar: req.params.barId });
  if (!exists) return res.sendStatus(404);
  res.sendStatus(200);
});

module.exports = router;