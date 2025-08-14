const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook, handleValidationErrors } = require('../middleware/validation');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { searchRateLimiter } = require('../middleware/rateLimiter');
router.use('/search', searchRateLimiter);
router.get('/', bookController.getAllBooks);
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);
router.post('/', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  validateBook, 
  handleValidationErrors, 
  bookController.addBook
);
router.put('/:id', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  validateBook, 
  handleValidationErrors, 
  bookController.updateBook
);
router.delete('/:id', 
  authenticateToken, 
  requireRole(['admin']), 
  bookController.deleteBook
);
router.get('/availability', bookController.getBooksByAvailability);
router.get('/author', bookController.getBooksByAuthor);
router.get('/stats', bookController.getBookStatistics);
module.exports = router;
