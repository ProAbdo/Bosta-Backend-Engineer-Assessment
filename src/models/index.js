const { sequelize } = require('../config/database');
const Book = require('./Book');
const Borrower = require('./Borrower');
const BorrowingRecord = require('./BorrowingRecord');
const User = require('./User');
Book.hasMany(BorrowingRecord, { foreignKey: 'book_id', as: 'borrowings' });
BorrowingRecord.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });
Borrower.hasMany(BorrowingRecord, { foreignKey: 'borrower_id', as: 'borrowings' });
BorrowingRecord.belongsTo(Borrower, { foreignKey: 'borrower_id', as: 'borrower' });
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
    throw error;
  }
};
module.exports = {
  sequelize,
  Book,
  Borrower,
  BorrowingRecord,
  User,
  syncDatabase
};
