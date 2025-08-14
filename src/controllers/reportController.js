const { reportService } = require('../services');
const getBorrowingAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'Start date must be before end date'
      });
    }
    const analytics = await reportService.getBorrowingAnalytics(start, end);
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Get borrowing analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBookInventoryReport = async (req, res) => {
  try {
    const report = await reportService.getBookInventoryReport();
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Get book inventory report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBorrowerActivityReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'Start date must be before end date'
      });
    }
    const report = await reportService.getBorrowerActivityReport(start, end);
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Get borrower activity report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const exportOverdueBooksCSV = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'Start date must be before end date'
      });
    }
    const csvContent = await reportService.exportOverdueBooksCSV(start, end);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="overdue_books.csv"');
    res.setHeader('Content-Length', Buffer.byteLength(csvContent, 'utf8'));
    res.send(csvContent);
  } catch (error) {
    console.error('Export overdue books CSV error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const exportBorrowingRecordsExcel = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'Start date must be before end date'
      });
    }
    const buffer = await reportService.exportBorrowingRecordsExcel(start, end);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="borrowing_records.xlsx"');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('Export borrowing records Excel error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getSystemOverview = async (req, res) => {
  try {
    const overview = await reportService.getSystemOverview();
    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    console.error('Get system overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getOverdueBooksSummary = async (req, res) => {
  try {
    const overdueBooks = await reportService.getOverdueBooks();
    const summary = {
      total: overdueBooks.length,
      books: overdueBooks.map(record => ({
        id: record.id,
        bookTitle: record.book.title,
        bookAuthor: record.book.author,
        isbn: record.book.isbn,
        borrowerName: record.borrower.name,
        borrowerEmail: record.borrower.email,
        checkoutDate: record.checkout_date,
        dueDate: record.due_date,
        daysOverdue: Math.ceil((new Date() - new Date(record.due_date)) / (1000 * 60 * 60 * 24))
      }))
    };
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Get overdue books summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBorrowingTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    const analytics = await reportService.getBorrowingAnalytics(startDate, endDate);
    const trends = {
      period: { startDate, endDate, days: parseInt(days) },
      summary: analytics.summary,
      dailyTrends: analytics.dailyTrends
    };
    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Get borrowing trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getPopularBooks = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); 
    const analytics = await reportService.getBorrowingAnalytics(startDate, endDate);
    const popularBooks = analytics.topBooks.slice(0, parseInt(limit));
    res.json({
      success: true,
      data: {
        period: { startDate, endDate },
        popularBooks
      }
    });
  } catch (error) {
    console.error('Get popular books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getActiveBorrowers = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); 
    const analytics = await reportService.getBorrowingAnalytics(startDate, endDate);
    const activeBorrowers = analytics.topBorrowers.slice(0, parseInt(limit));
    res.json({
      success: true,
      data: {
        period: { startDate, endDate },
        activeBorrowers
      }
    });
  } catch (error) {
    console.error('Get active borrowers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
module.exports = {
  getBorrowingAnalytics,
  getBookInventoryReport,
  getBorrowerActivityReport,
  exportOverdueBooksCSV,
  exportBorrowingRecordsExcel,
  getSystemOverview,
  getOverdueBooksSummary,
  getBorrowingTrends,
  getPopularBooks,
  getActiveBorrowers
};
