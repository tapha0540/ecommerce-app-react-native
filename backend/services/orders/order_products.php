<?php

require_once('../../services/products/get_products_prices.php');

function orderProducts(PDO &$pdo, int $userId, array $orders)
{
    $deliveryCostsForEachProduct = 0;

    $productIds = array_column($orders, 'productId');
    $products = getPrductsPrices($pdo, $productIds);
    $total = 0;
    foreach ($orders as &$order) {
        $productId = $order['productId'];
        $productPrice = $products[$productId];
        $total += ($productPrice * $order['quantity']) + $deliveryCostsForEachProduct;
        $order['price'] = $productPrice;
    }
    $stmt = $pdo->prepare(
        "INSERT INTO orders (userId, total) VALUES (:userId, :total)"
    );
    $stmt->execute(["userId" => $userId, "total" => $total]);


    return ["orders" => $orders, "orderId" => $pdo->lastInsertId()];
}