<?php


// Set session lifetime to 2 months (in seconds)



session_start();

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
        require_once '../controllers/login.php';

        $data = json_decode(file_get_contents('php://input'), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
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
        $res = login_user($pdo, $email, $password);
        $twoMonths = 60 * 60 * 24 * 60; // 60 days

        // Configure session cookie parameters BEFORE starting the session
        session_set_cookie_params([
            'lifetime' => $twoMonths,
            'path' => '/',
            'domain' => '', // Current domain
            'secure' => isset($_SERVER['HTTPS']), // Use HTTPS if available
            'httponly' => true, // Prevent JavaScript access to session cookie
            'samesite' => 'Lax' // Can be 'Strict', 'Lax', or 'None'
        ]);

        // Start the session
        if ($res['success']) {
            session_start();
            // Store user information in session
            $_SESSION['user'] = $res['user'];
        }
        echo json_encode([
            'message' => $res['message'],
            'success' => $res['success']
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