<?php
function signup_user(PDO &$pdo, string $firstName, string $lastName, string $phone,string $email, string $password)
{
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (firstName, lastName, email, password, phone) VALUES (:firstName, :lastName, :email, :passwordHash, :phone)");
    $stmt->bindParam(':firstName', $firstName);
    $stmt->bindParam(':lastName', $lastName);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':passwordHash', $passwordHash);
    $stmt->bindParam(':phone', $phone);
    $stmt->execute();
}