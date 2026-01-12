<?php

function login_user(PDO &$pdo, string $email, string $password) {

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        return [
            'message' => 'Utilisateur non trouvé.',
            'success' => false
        ];
    } else {
        if (password_verify($password, $user['password'])) {
            return [
                'message' => 'Connexion réussie.',
                'success' => true,
                'user' => $user
            ];
        } else {
            return [
                'message' => 'Mot de passe incorrect.',
                'success' => false
            ];
        }
    }
}