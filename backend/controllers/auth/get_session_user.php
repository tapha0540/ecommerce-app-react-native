<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '../../storage/error_log.log');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


$headers = getallheaders();

if (!isset($headers['authorization'])) {
    http_response_code(response_code: 401);
    echo json_encode([
        'message' => 'Header Authorization is not set.',
        'success' => false
    ]);
    exit;
}

$token = str_replace("Bearer ", "", $headers['authorization']);
session_id($token);
session_start();


if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode([
        'message' => "L'utilisateur n'est pas connecté.",
        'success' => false
    ]);
    exit;
}
http_response_code(200);
echo json_encode([
    "message" => "Session recupérée.",
    'success' => true,
    'user' => $_SESSION['user']
]);
