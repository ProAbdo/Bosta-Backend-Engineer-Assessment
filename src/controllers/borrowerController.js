const { borrowerService } = require('../services');
const getAllBorrowers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await borrowerService.getAllBorrowers(page, limit);
    res.json({
      success: true,
      data: result.borrowers,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get all borrowers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBorrowerById = async (req, res) => {
  try {
    const { id } = req.params;
    const borrower = await borrowerService.getBorrowerById(id);
    if (!borrower) {
      return res.status(404).json({
        success: false,
        message: 'Borrower not found'
      });
    }
    res.json({
      success: true,
      data: borrower
    });
  } catch (error) {
    console.error('Get borrower by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const searchBorrowers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }    
    const borrowers = await borrowerService.searchBorrowers(q);
    res.json({
      success: true,
      data: borrowers,
      search: { query: q }
    });
  } catch (error) {
    console.error('Search borrowers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const addBorrower = async (req, res) => {
  try {
    const borrowerData = req.body;
    const newBorrower = await borrowerService.createBorrower(borrowerData);
    res.status(201).json({
      success: true,
      message: 'Borrower added successfully',
      data: newBorrower
    });
  } catch (error) {
    console.error('Add borrower error:', error);
    if (error.message === 'Borrower with this email already exists') {
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
const updateBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBorrower = await borrowerService.updateBorrower(id, updateData);
    res.json({
      success: true,
      message: 'Borrower updated successfully',
      data: updatedBorrower
    });
  } catch (error) {
    console.error('Update borrower error:', error);
    if (error.message === 'Borrower not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Borrower with this email already exists') {
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
const deleteBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    await borrowerService.deleteBorrower(id);
    res.json({
      success: true,
      message: 'Borrower deleted successfully'
    });
  } catch (error) {
    console.error('Delete borrower error:', error);
    if (error.message === 'Borrower not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Cannot delete borrower with active borrowings') {
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
const getBorrowingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeReturned = 'true' } = req.query;
    const shouldIncludeReturned = includeReturned === 'true';
    const history = await borrowerService.getBorrowingHistory(id, shouldIncludeReturned);
    res.json({
      success: true,
      data: history,
      borrowerId: id,
      includeReturned: shouldIncludeReturned
    });
  } catch (error) {
    console.error('Get borrowing history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getCurrentlyBorrowedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const borrowedBooks = await borrowerService.getCurrentlyBorrowedBooks(id);
    res.json({
      success: true,
      data: borrowedBooks,
      borrowerId: id
    });
  } catch (error) {
    console.error('Get currently borrowed books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getOverdueBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const overdueBooks = await borrowerService.getOverdueBooks(id);
    res.json({
      success: true,
      data: overdueBooks,
      borrowerId: id
    });
  } catch (error) {
    console.error('Get overdue books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBorrowerStatistics = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await borrowerService.getBorrowerStatistics(id);
    res.json({
      success: true,
      data: stats,
      borrowerId: id
    });
  } catch (error) {
    console.error('Get borrower statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getAllBorrowersWithStats = async (req, res) => {
  try {
    const borrowersWithStats = await borrowerService.getAllBorrowersWithStats();
    res.json({
      success: true,
      data: borrowersWithStats
    });
  } catch (error) {
    console.error('Get all borrowers with stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
module.exports = {
  getAllBorrowers,
  getBorrowerById,
  searchBorrowers,
  addBorrower,
  updateBorrower,
  deleteBorrower,
  getBorrowingHistory,
  getCurrentlyBorrowedBooks,
  getOverdueBooks,
  getBorrowerStatistics,
  getAllBorrowersWithStats
};
