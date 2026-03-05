<?php

function getPrductsPrices(PDO &$pdo, array $productsIds)
{
    if (empty($productsIds))
        return [];
    $placeholder = implode(',', array_fill(0, count($productsIds), '?'));
    $sql = "SELECT id, price FROM products WHERE id IN ($placeholder)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($productsIds);
    
    return $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
}