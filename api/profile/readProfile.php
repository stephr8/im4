<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// DB-Verbindung
require_once '../../system/config.php';

// Logged-in user ID
$loggedInUserId = $_SESSION['user_id'];


// Get the logged-in user's data
$stmt = $pdo->prepare("SELECT up.user_id, up.first_name, up.last_name, u.email, up.username, up.street, up.zip, up.town, up.birthdate, up.nationality, up.ahv, up.trust_person FROM user_profiles as up, users as u WHERE  u.id = up.user_id and up.user_id = :user_id");
$stmt->bindParam(':user_id', $loggedInUserId, PDO::PARAM_INT);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode([
        "status" => "success",
        "user" => $user
    ]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "User not found"]);
}
?>
