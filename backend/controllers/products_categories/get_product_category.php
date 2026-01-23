<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '../../storage/error_log.log');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once('../../services/products_categories/get_product_category.php');
    require_once('../../config/database/connexion_db.php');
    try {
        $data = json_decode(file_get_contents('php://input') ?? [], true);

        $categoryId = $data['categoryId'];

        echo json_encode([
            'message' => '',
            'success' => true,
            'category' => getProductCategory($pdo, $categoryId),
        ]);

    } catch (Exception $e) {
        error_log('controllers/product_categories/get_product_category.php' . $e->getMessage(), 3, '../../storage/error_log.log');
        echo json_encode([
            'message' => 'Erreur coté serveur !',
            'success' => false
        ]);
    }
}