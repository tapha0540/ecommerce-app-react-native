<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'error_log.log');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        require_once '../connexion_db.php';

        $data = json_decode(file_get_contents('php://input'), true);

        $firstName = $data['firstName'] ?? '';
        $lastName = $data['lastName'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode([
                'message' => 'Tous les champs sont requis.',
                'success' => false
            ]);
            exit;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode([
                'message' => 'Adresse e-mail invalide.',
                'success' => false
            ]);
            exit;
        }
        echo json_encode([
            'message' => 'Inscription réussie.',
            'success' => true
        ]);

    } catch (Exception $e) {
        error_log("\n Error during signup: " . $e->getMessage(), 3, '../error_log.log');
        http_response_code(500);
        echo json_encode([
            'message' => 'Erreur serveur. Veuillez réessayer plus tard.',
            'success' => false
        ]);
    }
}