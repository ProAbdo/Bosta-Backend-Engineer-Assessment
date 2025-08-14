const { bookService } = require('../services');
const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await bookService.getAllBooks(page, limit);
    res.json({
      success: true,
      data: result.books,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get all books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Get book by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const searchBooks = async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    const books = await bookService.searchBooks(q, type);
    res.json({
      success: true,
      data: books,
      search: { query: q, type: type || 'all' }
    });
  } catch (error) {
    console.error('Search books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await bookService.createBook(bookData);
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: newBook
    });
  } catch (error) {
    console.error('Add book error:', error);
    if (error.message === 'Book with this ISBN already exists') {
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
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBook = await bookService.updateBook(id, updateData);
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    console.error('Update book error:', error);
    if (error.message === 'Book not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Book with this ISBN already exists') {
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
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(id);
    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Delete book error:', error);
    if (error.message === 'Book not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message === 'Cannot delete book that is currently borrowed') {
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
const getBooksByAvailability = async (req, res) => {
  try {
    const { available = 'true' } = req.query;
    const isAvailable = available === 'true';
    const books = await bookService.getBooksByAvailability(isAvailable);
    res.json({
      success: true,
      data: books,
      filter: { available: isAvailable }
    });
  } catch (error) {
    console.error('Get books by availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.query;
    if (!author) {
      return res.status(400).json({
        success: false,
        message: 'Author parameter is required'
      });
    }
    const books = await bookService.getBooksByAuthor(author);
    res.json({
      success: true,
      data: books,
      filter: { author }
    });
  } catch (error) {
    console.error('Get books by author error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
const getBookStatistics = async (req, res) => {
  try {
    const stats = await bookService.getBookStatistics();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get book statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
module.exports = {
  getAllBooks,
  getBookById,
  searchBooks,
  addBook,
  updateBook,
  deleteBook,
  getBooksByAvailability,
  getBooksByAuthor,
  getBookStatistics
};
