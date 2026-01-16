<?php

function getAllProductsCategories(PDO &$pdo)
{
    $sql = "SELECT id, name, description, parentId, createdAt, updatedAt
            FROM categories";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}