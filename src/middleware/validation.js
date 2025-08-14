const { body, validationResult } = require('express-validator');
const validateBook = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters')
    .escape(),
  body('author')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Author must be between 1 and 255 characters')
    .escape(),
  body('isbn')
    .trim()
    .isLength({ min: 10, max: 13 })
    .withMessage('ISBN must be between 10 and 13 characters')
    .matches(/^[0-9-]+$/)
    .withMessage('ISBN must contain only numbers and hyphens')
    .escape(),
  body('available_quantity')
    .isInt({ min: 0 })
    .withMessage('Available quantity must be a non-negative integer'),
  body('total_quantity')
    .isInt({ min: 1 })
    .withMessage('Total quantity must be a positive integer'),
  body('shelf_location')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Shelf location must be between 1 and 100 characters')
    .escape()
];
const validateBorrower = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 255 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone number must be at most 20 characters')
    .escape(),
  body('address')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Address must be at most 1000 characters')
    .escape()
];
const validateBorrowing = [
  body('book_id')
    .isInt({ min: 1 })
    .withMessage('Book ID must be a positive integer'),
  body('borrower_id')
    .isInt({ min: 1 })
    .withMessage('Borrower ID must be a positive integer'),
  body('due_date')
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date'),
  body('user_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer')
];
const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Username must be between 3 and 255 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];
const validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Username is required')
    .escape(),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required')
];
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};
module.exports = {
  validateBook,
  validateBorrower,
  validateBorrowing,
  validateRegister,
  validateLogin,
  handleValidationErrors
};
