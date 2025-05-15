<?php
session_start();
header('Content-Type: application/json');

// if (!isset($_SESSION['user_id'])) {
//     http_response_code(401);
//     header('Content-Type: application/json');
//     echo json_encode(["error" => "Unauthorized"]);
//     exit;
// }

// DB-Verbindung
require_once '../../system/config.php';

// Logged-in user ID
// $loggedInUserId = $_SESSION['user_id'];

$loggedInUserId = 7;


// Get the logged-in user's data
$stmt = $pdo->prepare("
    SELECT ut.task_id 
    FROM user_tasks AS ut
    JOIN backpack AS b ON ut.backpack_id = b.id
    WHERE b.user_id = :user_id
");
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
