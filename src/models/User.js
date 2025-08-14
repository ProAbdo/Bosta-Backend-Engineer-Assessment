const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
      len: [1, 255]
    }
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [60, 255]
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'librarian'),
    defaultValue: 'librarian',
    validate: {
      isIn: [['admin', 'librarian']]
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['username'] },
    { fields: ['email'] }
  ]
});
module.exports = User;
