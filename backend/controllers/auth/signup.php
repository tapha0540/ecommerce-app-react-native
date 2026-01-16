<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '../../storage/error_log.log');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        require_once '../../config/database/connexion_db.php';
        require_once "../../services/auth/signup.php";
        require_once "../../services/users/getUser.php";

        $data = json_decode(file_get_contents('php://input'), true);

        $firstName = trim($data['firstName'] ?? '');
        $lastName = trim($data['lastName'] ?? '');
        $phone = str_replace(' ', '', $data['phone'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if (empty($firstName) || empty($lastName) || empty($phone) || empty($email) || empty($password)) {
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
        // I verify if the user with an email or phone like this already exits.
        $user = getUser($pdo, userEmail: $email, userPhone: $phone);

        if ($user) {
            http_response_code(400);
            echo json_encode([
                'message' => 'Un compte avec ces même identifiants existe déja.',
                'success' => false
            ]);
            exit;
        }

        signup_user($pdo, $firstName, $lastName, $phone, $email, $password);
        http_response_code(200);

        echo json_encode([
            'message' => 'Votre compte a été créé avec succèss',
            'success' => true
        ]);


    } catch (Exception $e) {
        error_log("\n Error during signup: " . $e->getMessage(), 3, '../../storage/error_log.log');
        http_response_code(500);
        echo json_encode([
            'message' => 'Erreur serveur. Veuillez réessayer plus tard.',
            'success' => false
        ]);
    }
}