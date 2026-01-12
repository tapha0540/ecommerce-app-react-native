<?php

function getUser(PDO &$pdo, ?int $userId = null, ?string $userEmail = null, ?string $userPhone = null)
{
    $conditions = [];
    $params = [];

    if ($userId !== null) {
        $conditions[] = "id = :id";
        $params['id'] = $userId;
    }

    if ($userEmail !== null) {
        $conditions[] = "email = :email";
        $params['email'] = $userEmail;
    }

    if ($userPhone !== null) {
        $conditions[] = "phone = :phone";
        $params['phone'] = $userPhone;
    }

    if (empty($conditions)) {
        return null;
    }

    $sql = "
        SELECT id, first_name, last_name, email, role, phone, password, created_at, updated_at
        FROM users
        WHERE " . implode(" OR ", $conditions);

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}
