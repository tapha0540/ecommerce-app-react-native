<?php

function getAllProductsCategories(PDO &$pdo)
{
    $sql = "SELECT id, name, description, icon, parentId, createdAt, updatedAt
            FROM categories";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}