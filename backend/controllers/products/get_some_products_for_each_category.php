<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '../../storage/error_log.log');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        require_once('../../config/database/connexion_db.php');
        require_once('../../services/products/get_some_products_for_each_category.php');
        $n = 10;

        $products = getSomeProductsForEachCategory($pdo, $n);

        echo json_encode([
            'message' => 'Operation succedded',
            'success' => true,
            'products' => $products
        ]);

    } catch (Exception $e) {
        echo json_encode([
            'message' => 'Operation failed',
            'success' => false
        ]);
        error_log(' controllers/products/get_some_products_for_each_category.php -> ' . $e->getMessage(), 3, '../../storage/error_log.log');
    }
}