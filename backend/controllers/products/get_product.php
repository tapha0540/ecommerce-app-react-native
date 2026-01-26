<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '../../storage/error_log.log');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        require_once('../../services/products/get_product.php');
        require_once('../../config/database/connexion_db.php');
        $reqBody = json_decode(file_get_contents('php://input'), true);
        $productId = (int) $reqBody['productId'];

        $product = getProduct($pdo, $productId);

        if (!$product) {
            http_response_code(404);
            echo json_encode([
                'message' => 'Pas de produit avec un tel id.',
                'success' => false
            ]);
            throw new Exception('No product with an id liek that in the database .');
        }

        echo json_encode([
            'message' => 'Opération réussie',
            'success' => true,
            'product' => $product
        ]);
    } catch (Exception $e) {
        error_log('controllers/get_product.php -> ' . $e->getMessage(), 3, '../../storage/error_log.log');
        http_response_code(500);
        echo json_encode([
            'message' => 'Server error',
            'success' => false,
        ]);
    }
}