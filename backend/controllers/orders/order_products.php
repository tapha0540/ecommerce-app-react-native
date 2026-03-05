<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '../../storage/error_log.log');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POSt');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

session_start();

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    try {
        require_once('../../config/database/connexion_db.php');
        require_once('../../services/orders/order_products.php');
        require_once('../../services/order_items/insert_order_items.php');

        $reqBody = json_decode(file_get_contents("php://input"), true);

        $orders = $reqBody["orders"];
        $userId = $_SESSION['user']['id'];

        $res = orderProducts($pdo, $userId, $orders);

        $orderId = $res['orderId'];
        $orders = $res['orders'];

        insertOrderItems($pdo, $orderId, $orders);

        echo json_encode([
            "message" => "Le produit a été commandé.",
            "success" => true
        ]);

    } catch (Exception $e) {
        error_log("controllers/orders/order_products.php -> " . $e->getMessage(), 3, "../../storage/error_log.log");
        echo json_encode([
            "message" => "Erreur coté serveur.",
            "success" => false,
        ]);
    }
}