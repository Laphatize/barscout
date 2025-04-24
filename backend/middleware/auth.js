const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  
  // Check if no auth header
  if (!authHeader) {
    console.log('No Authorization header');
    return res.status(401).json({ error: 'No authorization token, access denied' });
  }
  
  // Extract token from Bearer format
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload to request object
    req.user = decoded;
    console.log('Auth successful, user:', req.user);
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(403).json({ error: 'Token is not valid' });
  }
};