<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce_db";
$dbport = 3306;

try {
    $pdo = new PDO(
        "mysql:host=$servername;dbname=$dbname;port=$dbport",
        $username,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    error_log("\n Connection failed: " . $e->getMessage(), 3, 'C:\Users\DELL\Dev\react-native\ecommerce-app-react-native\backend\storage\error_log.log');
}