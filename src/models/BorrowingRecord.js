const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const BorrowingRecord = sequelize.define('BorrowingRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id'
    }
  },
  borrower_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'borrowers',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  checkout_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfterNow(value) {
        if (value <= new Date()) {
          throw new Error('Due date must be in the future');
        }
      }
    }
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true
    }
  },
  status: {
    type: DataTypes.ENUM('checked_out', 'returned', 'overdue'),
    defaultValue: 'checked_out',
    validate: {
      isIn: [['checked_out', 'returned', 'overdue']]
    }
  }
}, {
  tableName: 'borrowing_records',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['book_id'] },
    { fields: ['borrower_id'] },
    { fields: ['user_id'] },
    { fields: ['status'] },
    { fields: ['due_date'] },
    { fields: ['checkout_date'] }
  ]
});
module.exports = BorrowingRecord;
