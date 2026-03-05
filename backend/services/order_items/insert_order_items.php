<?php

function insertOrderItems(PDO &$pdo, int $orderId, array $orders): void
{
    $sql = "
        INSERT INTO order_items (orderId, productId, quantity, price)
        VALUES (:orderId, :productId, :quantity, :price)
    ";

    $stmt = $pdo->prepare($sql);

    foreach ($orders as $order) {
        $stmt->execute([
            'orderId'   => $orderId,
            'productId'=> $order['productId'],
            'quantity' => $order['quantity'],
            'price'    => $order['price']
        ]);
    }
}
