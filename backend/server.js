const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const barRoutes = require('./routes/bars');
const queueRoutes = require('./routes/queue');
const adminRoutes = require('./routes/admin');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Increase JSON body size limit to 10mb for image uploads
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: "https://barscout.ctfguide.com" }));
// DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Real-time location tracking
const barPopularity = {}; // Store bar popularity data

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Handle user location updates
  socket.on('updateLocation', (data) => {
    // Debug log for backend reception
    console.log('updateLocation received:', data);
    const { userId, location, barId } = data;
    
    // If user is near a bar, increment that bar's count
    if (barId) {
      if (!barPopularity[barId]) {
        barPopularity[barId] = { count: 0, users: new Set() };
      }
      
      // Add user to the bar's user set
      barPopularity[barId].users.add(userId);
      barPopularity[barId].count = barPopularity[barId].users.size;
      
      // Broadcast updated popularity to all clients
      io.emit('popularityUpdate', barPopularity);
    }
  });
  
  // Handle user leaving a bar area
  socket.on('leaveBar', (data) => {
    const { userId, barId } = data;
    
    if (barId && barPopularity[barId]) {
      // Remove user from the bar's user set
      barPopularity[barId].users.delete(userId);
      barPopularity[barId].count = barPopularity[barId].users.size;
      
      // Broadcast updated popularity to all clients
      io.emit('popularityUpdate', barPopularity);
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Handle user disconnection if needed
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bars', barRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));