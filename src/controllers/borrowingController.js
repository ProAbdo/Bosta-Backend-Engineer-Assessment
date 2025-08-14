const { borrowingService } = require('../services');
const getAllBorrowingRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await borrowingService.getAllBorrowingRecords(page, limit);
    res.json({
      success: true,
      data: result.records,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get all borrowing records error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBorrowingRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await borrowingService.getBorrowingRecordById(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Borrowing record not found'
      });
    }
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    console.error('Get borrowing record by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const checkoutBook = async (req, res) => {
  try {
    const checkoutData = {
      ...req.body,
      user_id: req.user.id
    };
    const borrowingRecord = await borrowingService.checkoutBook(checkoutData);
    res.status(201).json({
      success: true,
      message: 'Book checked out successfully',
      data: borrowingRecord
    });
  } catch (error) {
    console.error('Checkout book error:', error);
    if (error.message === 'Book not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Book is not available for checkout') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Borrower not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Borrower already has this book checked out') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Due date must be in the future') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecord = await borrowingService.returnBook(id);
    res.json({
      success: true,
      message: 'Book returned successfully',
      data: updatedRecord
    });
  } catch (error) {
    console.error('Return book error:', error);
    if (error.message === 'Borrowing record not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Book is already returned') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await borrowingService.getOverdueBooks();
    res.json({
      success: true,
      data: overdueBooks
    });
  } catch (error) {
    console.error('Get overdue books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBorrowerRecords = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const { status } = req.query;
    const records = await borrowingService.getBorrowerRecords(borrowerId, status);
    res.json({
      success: true,
      data: records,
      borrowerId,
      status: status || 'all'
    });
  } catch (error) {
    console.error('Get borrower records error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBookBorrowingHistory = async (req, res) => {
  try {
    const { bookId } = req.params;
    const history = await borrowingService.getBookBorrowingHistory(bookId);
    res.json({
      success: true,
      data: history,
      bookId
    });
  } catch (error) {
    console.error('Get book borrowing history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const updateBorrowingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    const updatedRecord = await borrowingService.updateBorrowingStatus(id, status);
    res.json({
      success: true,
      message: 'Borrowing status updated successfully',
      data: updatedRecord
    });
  } catch (error) {
    console.error('Update borrowing status error:', error);
    if (error.message === 'Borrowing record not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message.includes('Invalid status')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBorrowingStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let start, end;
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    }
    const stats = await borrowingService.getBorrowingStatistics(start, end);
    res.json({
      success: true,
      data: stats,
      period: start && end ? { startDate: start, endDate: end } : 'all time'
    });
  } catch (error) {
    console.error('Get borrowing statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const processOverdueBooks = async (req, res) => {
  try {
    const updatedCount = await borrowingService.processOverdueBooks();
    res.json({
      success: true,
      message: `${updatedCount} books marked as overdue`,
      data: { updatedCount }
    });
  } catch (error) {
    console.error('Process overdue books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const extendDueDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { newDueDate } = req.body;
    if (!newDueDate) {
      return res.status(400).json({
        success: false,
        message: 'New due date is required'
      });
    }
    const updatedRecord = await borrowingService.extendDueDate(id, newDueDate);
    res.json({
      success: true,
      message: 'Due date extended successfully',
      data: updatedRecord
    });
  } catch (error) {
    console.error('Extend due date error:', error);
    if (error.message === 'Borrowing record not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'New due date must be in the future') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Can only extend due date for checked out books') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
module.exports = {
  getAllBorrowingRecords,
  getBorrowingRecordById,
  checkoutBook,
  returnBook,
  getOverdueBooks,
  getBorrowerRecords,
  getBookBorrowingHistory,
  updateBorrowingStatus,
  getBorrowingStatistics,
  processOverdueBooks,
  extendDueDate
};
