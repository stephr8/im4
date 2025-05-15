<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

require_once '../../system/config.php';

$input = json_decode(file_get_contents('php://input'), true);

// Input prüfen
if (!isset($input['task_id'], $input['backpack_id'], $input['isChecked'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$userId = $_SESSION['user_id'];
$taskId = (int)$input['task_id'];
$backpackId = (int)$input['backpack_id'];
$isChecked = (int)$input['isChecked'];

// Update DB
$stmt = $pdo->prepare("UPDATE user_tasks SET isChecked = :isChecked WHERE user_id = :user_id AND task_id = :task_id AND backpack_id = :backpack_id");
$stmt->bindParam(':isChecked', $isChecked, PDO::PARAM_INT);
$stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
$stmt->bindParam(':task_id', $taskId, PDO::PARAM_INT);
$stmt->bindParam(':backpack_id', $backpackId, PDO::PARAM_INT);

try {
    $stmt->execute();
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "DB error: " . $e->getMessage()]);
}
?>
