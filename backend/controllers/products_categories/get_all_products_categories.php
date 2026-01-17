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

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    require_once('../../config/database/connexion_db.php');
    require_once('../../services/products_categories/get_all_products_categories.php');
    try {
        $productsCategories = getAllProductsCategories($pdo);
        echo json_encode([
            'message' => 'Operation reussie.',
            'success' => true,
            'productsCategories' => $productsCategories
        ]);
    
    } catch (Exception $e) {
        error_log('\n Erreur controllers/products/get_all_products_catgeories.php -> ' . $e->getMessage(), 3, '../../storage/error_log.log');
        echo json_encode([
            'message' => 'Erreur coté serveur.',
            'success' => false
        ]);
    }

}