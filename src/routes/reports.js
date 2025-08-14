const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateToken, requireRole } = require('../middleware/auth');
router.get('/analytics', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  reportController.getBorrowingAnalytics
);
router.get('/export/overdue-csv', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  reportController.exportOverdueBooksCSV
);
router.get('/overdue-books', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  reportController.getOverdueBooksSummary
);
router.get('/export/borrowing-excel', 
  authenticateToken, 
  requireRole(['admin', 'librarian']), 
  reportController.exportBorrowingRecordsExcel
);
module.exports = router;
