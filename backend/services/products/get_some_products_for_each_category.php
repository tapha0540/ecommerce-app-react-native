<?php
/**
 * Summary of getSomeProductsForEachCategory
 * @param PDO $pdo
 * @param int $numberOfProductsToFetchForEachCategories
 * this function a specfic number of products for each categories.
 *  Paramereters
 *      - $pdo -> database connection
 *      - $n -> number of products to fetch for each categories
 */
function getSomeProductsForEachCategory(PDO &$pdo, int $n = 10)
{
    $sql = "SELECT p.*
            FROM products p
            JOIN (
                SELECT id
                FROM (
                    SELECT id,
                        ROW_NUMBER() OVER (PARTITION BY categoryId ORDER BY createdAt DESC) AS rn
                    FROM products
                ) ranked
                WHERE rn <= :n
            ) t ON p.id = t.id
            ORDER BY p.categoryId, p.createdAt DESC;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'n' => $n
    ]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}