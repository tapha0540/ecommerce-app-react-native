<?php

function getProduct(PDO &$pdo, int $productId)
{
    $sql = "SELECT id, name, description, price, stock, categoryId, imageUrl, createdAt, updatedAt FROM products WHERE id = :productId";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['productId' => $productId]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}