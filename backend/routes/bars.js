const router = require('express').Router();
const Bar = require('../models/Bar');
const auth = require('../middleware/auth');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

// DigitalOcean Spaces (S3-compatible) config
const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'barscout2',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

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
  const { name, location, image, coordinates } = req.body;

  // Only set coordinates if valid
  let coordsToSave = (Array.isArray(coordinates) && coordinates.length === 2 && coordinates.every(n => typeof n === 'number' && !isNaN(n))) ? coordinates : undefined;
  console.log('Saving bar with coordinates:', coordsToSave);
  const bar = new Bar({ name, location, image, coordinates: coordsToSave });
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

// Upload image to gallery
router.post('/:id/gallery', auth, upload.single('image'), async (req, res) => {
  try {
    const bar = await Bar.findById(req.params.id);
    if (!bar) return res.status(404).json({ error: 'Bar not found' });
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    const galleryItem = {
      user: req.user.id,
      imageUrl: req.file.location, // Spaces public URL
      caption: req.body.caption || '',
      timestamp: new Date()
    };
    bar.gallery.push(galleryItem);
    await bar.save();
    res.status(201).json(galleryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get gallery feed with pagination
router.get('/:id/gallery', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const bar = await Bar.findById(req.params.id).populate('gallery.user', 'username');
    if (!bar) return res.status(404).json({ error: 'Bar not found' });

    // Sort gallery by timestamp descending
    const sortedGallery = [...bar.gallery].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const start = (page - 1) * limit;
    const end = start + limit;
    const pagedGallery = sortedGallery.slice(start, end);

    res.json(pagedGallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;