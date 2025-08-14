const rateLimit = require('express-rate-limit');
const searchRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many search requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const borrowingRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many borrowing operations from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = {
  searchRateLimiter,
  borrowingRateLimiter
};
