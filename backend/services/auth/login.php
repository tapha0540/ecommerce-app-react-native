<?php

function login_user(PDO &$pdo, string $email, string $password) {

    $user = getUser($pdo, userEmail: $email);

    if (!$user) {
        return [
            'message' => 'Email introuvable',
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