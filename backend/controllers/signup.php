<?php
function signup_user(PDO &$pdo, string $firstName, string  $lastName, string $email, string $passwordHash) {
    $stmt = $pdo->prepare("INSERT INTO users (firstName, lastName, email, password) VALUES (:firstName, :lastName, :email, :password)");
    $stmt->bindParam(':firstName', $firstName);
    $stmt->bindParam(':lastName', $lastName);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $passwordHash);
    return $stmt->execute();
}