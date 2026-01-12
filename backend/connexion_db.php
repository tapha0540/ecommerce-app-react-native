<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce";
$dbport = 3306;

try {
    $pdo = new PDO(
        "mysql:host=$servername;dbname=$dbname;port=$dbport",
        $username,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    error_log("\n Connection failed: " . $e->getMessage(), 3, 'C:\xampp\htdocs\ecommerce-app-react-native\error_log.log');
}