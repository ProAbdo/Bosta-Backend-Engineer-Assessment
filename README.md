# 📚 Library Management System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.35+-purple.svg)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-yellow.svg)](https://jwt.io/)
[![Docker](https://img.shields.io/badge/Docker-3.8+-lightblue.svg)](https://www.docker.com/)

A robust, scalable, and feature-rich Library Management System built with **Node.js**, **Express.js**, and **MySQL**. This system provides comprehensive book management, borrower tracking, borrowing records, and advanced reporting capabilities with role-based access control.

## ✨ Features

### 🔐 **Authentication & Authorization**

- **JWT-based authentication** with secure token management
- **Role-based access control** (Admin, Librarian)
- **Secure password hashing** using bcryptjs
- **Profile management** and password change functionality

### 📖 **Book Management**

- **CRUD operations** for books with validation
- **ISBN validation** and duplicate prevention
- **Inventory tracking** (available vs. total quantity)
- **Shelf location management**
- **Advanced search** with rate limiting
- **Author-based filtering** and availability status

### 👥 **Borrower Management**

- **Comprehensive borrower profiles**
- **Contact information management**
- **Borrowing history tracking**
- **Account status monitoring**

### 📋 **Borrowing System**

- **Borrowing record creation** and management
- **Due date calculation** and tracking
- **Overdue book detection**
- **Return processing** and status updates
- **Borrowing analytics** and statistics

### 📊 **Reporting & Analytics**

- **Borrowing analytics** with detailed insights
- **Overdue book reports** and summaries
- **Data export** to CSV and Excel formats
- **Real-time statistics** and metrics

### 🛡️ **Security & Performance**

- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **Input validation** and sanitization
- **CORS configuration** for cross-origin requests
- **Error handling** with detailed logging

### 🐳 **Deployment & DevOps**

- **Docker containerization** with multi-service setup
- **MySQL database** with persistent storage
- **Environment-based configuration**
- **Health check endpoints** for monitoring

## 🏗️ Architecture

```
Library Management System
├── 📁 src/
│   ├── 📁 config/          # Database & Sequelize configuration
│   ├── 📁 controllers/     # Business logic & request handling
│   ├── 📁 middleware/      # Authentication, validation, rate limiting
│   ├── 📁 models/          # Database models & relationships
│   ├── 📁 routes/          # API endpoint definitions
│   ├── 📁 services/        # Business logic services
│   └── 📁 tests/           # Test suites & coverage
├── 🐳 Dockerfile           # Application containerization
├── 🐳 docker-compose.yml   # Multi-service orchestration
├── 📄 server.js            # Express server & middleware setup
└── 📦 package.json         # Dependencies & scripts
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **Docker** & **Docker Compose** (optional)

### 🐳 Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/ProAbdo/Bosta-Backend-Engineer-Assessment.git
   cd Bosta-Backend-Engineer-Assessment
   ```

2. **Start the services**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - **API**: http://localhost:3000
   - **Database**: localhost:3306

## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| `POST` | `/api/auth/login`    | User login        | ❌            |
| `POST` | `/api/auth/register` | User registration | ❌            |
| `GET`  | `/api/auth/profile`  | Get user profile  | ✅            |
| `PUT`  | `/api/auth/profile`  | Update profile    | ✅            |
| `PUT`  | `/api/auth/password` | Change password   | ✅            |

### 📖 Book Management

| Method   | Endpoint                  | Description         | Auth Required | Role            |
| -------- | ------------------------- | ------------------- | ------------- | --------------- |
| `GET`    | `/api/books`              | Get all books       | ❌            | -               |
| `GET`    | `/api/books/:id`          | Get book by ID      | ❌            | -               |
| `POST`   | `/api/books`              | Add new book        | ✅            | Admin/Librarian |
| `PUT`    | `/api/books/:id`          | Update book         | ✅            | Admin/Librarian |
| `DELETE` | `/api/books/:id`          | Delete book         | ✅            | Admin           |
| `GET`    | `/api/books/search`       | Search books        | ❌            | -               |
| `GET`    | `/api/books/availability` | Get by availability | ❌            | -               |
| `GET`    | `/api/books/author`       | Get by author       | ❌            | -               |
| `GET`    | `/api/books/stats`        | Book statistics     | ❌            | -               |

### 👥 Borrower Management

| Method   | Endpoint             | Description        | Auth Required | Role            |
| -------- | -------------------- | ------------------ | ------------- | --------------- |
| `GET`    | `/api/borrowers`     | Get all borrowers  | ✅            | Admin/Librarian |
| `GET`    | `/api/borrowers/:id` | Get borrower by ID | ✅            | Admin/Librarian |
| `POST`   | `/api/borrowers`     | Add new borrower   | ✅            | Admin/Librarian |
| `PUT`    | `/api/borrowers/:id` | Update borrower    | ✅            | Admin/Librarian |
| `DELETE` | `/api/borrowers/:id` | Delete borrower    | ✅            | Admin           |

### 📋 Borrowing Management

| Method   | Endpoint             | Description      | Auth Required | Role            |
| -------- | -------------------- | ---------------- | ------------- | --------------- |
| `GET`    | `/api/borrowing`     | Get all records  | ✅            | Admin/Librarian |
| `GET`    | `/api/borrowing/:id` | Get record by ID | ✅            | Admin/Librarian |
| `POST`   | `/api/borrowing`     | Create borrowing | ✅            | Admin/Librarian |
| `PUT`    | `/api/borrowing/:id` | Update record    | ✅            | Admin/Librarian |
| `DELETE` | `/api/borrowing/:id` | Delete record    | ✅            | Admin           |

### 📊 Reports & Analytics

| Method | Endpoint                              | Description         | Auth Required | Role            |
| ------ | ------------------------------------- | ------------------- | ------------- | --------------- |
| `GET`  | `/api/reports/analytics`              | Borrowing analytics | ✅            | Admin/Librarian |
| `GET`  | `/api/reports/overdue-books`          | Overdue summary     | ✅            | Admin/Librarian |
| `GET`  | `/api/reports/export/overdue-csv`     | Export overdue CSV  | ✅            | Admin/Librarian |
| `GET`  | `/api/reports/export/borrowing-excel` | Export Excel        | ✅            | Admin/Librarian |

## 🗄️ Database Schema

### 📚 Books Table

```sql
CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) UNIQUE NOT NULL,
  available_quantity INT DEFAULT 0,
  total_quantity INT DEFAULT 0,
  shelf_location VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 👤 Users Table

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'librarian') DEFAULT 'librarian',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 👥 Borrowers Table

```sql
CREATE TABLE borrowers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 📋 Borrowing Records Table

```sql
CREATE TABLE borrowing_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT NOT NULL,
  borrower_id INT NOT NULL,
  borrowed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP NOT NULL,
  returned_date TIMESTAMP NULL,
  status ENUM('borrowed', 'returned', 'overdue') DEFAULT 'borrowed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (borrower_id) REFERENCES borrowers(id)
);
```

## 🔧 Configuration

### Environment Variables

If you're using Docker Compose, all required environment variables are already set in `docker-compose.yml`. You don't need to create or configure a `.env` file.

Only define the variables below if you're running the app without Docker or if you want to override the Docker defaults:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=library_user
DB_PASSWORD=library_password
DB_NAME=library_management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```
