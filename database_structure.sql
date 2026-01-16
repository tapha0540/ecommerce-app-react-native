CREATE DATABASE ecommerce_db;

USE ecommerce_db;

-- ------------------------
-- TABLE users
-- ------------------------
CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM ('customer', 'admin') DEFAULT 'customer',
        phone VARCHAR(20) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE categories
-- ------------------------
CREATE TABLE
    categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        parentId INT DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_category_parent FOREIGN KEY (parentId) REFERENCES categories (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE products
-- ------------------------
CREATE TABLE
    products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        categoryId INT,
        imageUrl VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_product_category FOREIGN KEY (categoryId) REFERENCES categories (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE orders
-- ------------------------
CREATE TABLE
    orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        status ENUM (
            'pending',
            'processing',
            'shipped',
            'delivered',
            'cancelled'
        ) DEFAULT 'pending',
        total DECIMAL(10, 2) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_order_user FOREIGN KEY (userId) REFERENCES users (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE order_items
-- ------------------------
CREATE TABLE
    order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId INT NOT NULL,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        CONSTRAINT fk_orderitem_order FOREIGN KEY (orderId) REFERENCES orders (id),
        CONSTRAINT fk_orderitem_product FOREIGN KEY (productId) REFERENCES products (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE payments
-- ------------------------
CREATE TABLE
    payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        method ENUM ('wave', 'orange money', 'kpay', 'cash') NOT NULL,
        status ENUM ('pending', 'completed', 'failed') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_payment_order FOREIGN KEY (orderId) REFERENCES orders (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE reviews (optionnelle)
-- ------------------------
CREATE TABLE
    reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productId INT NOT NULL,
        userId INT NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_review_product FOREIGN KEY (productId) REFERENCES products (id),
        CONSTRAINT fk_review_user FOREIGN KEY (userId) REFERENCES users (id)
    ) ENGINE = InnoDB;