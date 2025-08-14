const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const { validateBorrower, handleValidationErrors } = require('../middleware/validation');
const { authenticateToken, requireRole } = require('../middleware/auth');
router.get('/', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.getAllBorrowers
);
router.get('/search', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.searchBorrowers
);
router.get('/stats/all', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.getAllBorrowersWithStats
);
router.get('/:id', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.getBorrowerById
);
router.post('/', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  validateBorrower, 
  handleValidationErrors, 
  borrowerController.addBorrower
);
router.put('/:id', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  validateBorrower, 
  handleValidationErrors, 
  borrowerController.updateBorrower
);
router.delete('/:id', 
  authenticateToken, 
  requireRole(['admin']), 
  borrowerController.deleteBorrower
);
router.get('/:id/history', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.getBorrowingHistory
);
router.get('/:id/current', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.getCurrentlyBorrowedBooks
);
router.get('/:id/overdue', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.getOverdueBooks
);
router.get('/:id/stats', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  borrowerController.getBorrowerStatistics
);
module.exports = router;
