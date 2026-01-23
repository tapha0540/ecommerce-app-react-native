<?php

function getProductCategory(PDO &$pdo, int $categoryId)
{
    $sql = "SELECT id, name, description, icon, parentId, createdAt, updatedAt
            FROM categories 
            WHERE id = :categoryId";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["categoryId"=> $categoryId]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}