const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');
const { validateBorrowing, handleValidationErrors } = require('../middleware/validation');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { borrowingRateLimiter } = require('../middleware/rateLimiter');
router.use('/checkout', borrowingRateLimiter);
router.use('/return', borrowingRateLimiter);
router.get('/', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowingController.getAllBorrowingRecords
);
router.get('/overdue', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowingController.getOverdueBooks
);
router.get('/borrower/:borrowerId', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowingController.getBorrowerRecords
);
router.post('/checkout', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  validateBorrowing, 
  handleValidationErrors, 
  borrowingController.checkoutBook
);
router.put('/return/:id', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowingController.returnBook
);
module.exports = router;
