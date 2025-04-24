const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const barRoutes = require('./routes/bars');
const queueRoutes = require('./routes/queue');
const adminRoutes = require('./routes/admin');

const app = express();
// Increase JSON body size limit to 10mb for image uploads
app.use(express.json({ limit: '10mb' }));

// DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bars', barRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));