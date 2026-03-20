CREATE DATABASE ecommerce;

USE ecommerce;

-- ------------------------
-- TABLE users
-- ------------------------
CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM ('customer', 'admin') DEFAULT 'customer',
        phone VARCHAR(20) NOT NULL UNIQUE,
        profile_url VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE categories
-- ------------------------
CREATE TABLE
    categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        parent_id INT DEFAULT NULL,
        icon VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_category_parent FOREIGN KEY (parent_id) REFERENCES categories (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE products
-- ------------------------
CREATE TABLE
    products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        category_id INT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE orders
-- ------------------------
CREATE TABLE
    orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        status ENUM (
            'pending',
            'processing',
            'shipped',
            'delivered',
            'cancelled'
        ) DEFAULT 'pending',
        total DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE order_items
-- ------------------------
CREATE TABLE
    order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        CONSTRAINT fk_orderitem_order FOREIGN KEY (order_id) REFERENCES orders (id),
        CONSTRAINT fk_orderitem_product FOREIGN KEY (product_id) REFERENCES products (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE payments
-- ------------------------
CREATE TABLE
    payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        amount DECIMAL(10, 2) NOT NULL,
        method ENUM ('wave', 'orange money', 'kpay', 'cash') NOT NULL,
        status ENUM ('pending', 'completed', 'failed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders (id)
    ) ENGINE = InnoDB;

-- ------------------------
-- TABLE reviews
-- ------------------------
CREATE TABLE
    reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        user_id INT,
        rating INT NOT NULL CHECK (rating BETWEEN 0 AND 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES products (id),
        CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users (id)
    ) ENGINE = InnoDB;