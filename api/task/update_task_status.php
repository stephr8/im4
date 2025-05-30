<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// DB connection
require_once '../../system/config.php';

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['task_id']) || !isset($data['backpack_id']) || !isset($data['is_checked'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required parameters']);
    exit;
}

$task_id = intval($data['task_id']);
$backpack_id = intval($data['backpack_id']);
$is_checked = intval($data['is_checked']);

try {
    // First verify that the user has access to this backpack
    $accessStmt = $pdo->prepare("
        SELECT 1 FROM backpackAccess 
        WHERE user_id = :user_id 
        AND backpack_id = :backpack_id
    ");
    $accessStmt->execute([
        ':user_id' => $_SESSION['user_id'],
        ':backpack_id' => $backpack_id
    ]);

    if (!$accessStmt->fetch()) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Access denied to this backpack']);
        exit;
    }

    // Begin transaction
    $pdo->beginTransaction();

    // Check if the task exists in user_tasks
    $checkStmt = $pdo->prepare("
        SELECT 1 FROM user_tasks 
        WHERE task_id = :task_id 
        AND backpack_id = :backpack_id
    ");
    $checkStmt->execute([
        ':task_id' => $task_id,
        ':backpack_id' => $backpack_id
    ]);

    if (!$checkStmt->fetch()) {
        // Task doesn't exist, insert it
        $insertStmt = $pdo->prepare("
            INSERT INTO user_tasks (backpack_id, task_id, isChecked)
            VALUES (:backpack_id, :task_id, :is_checked)
        ");
        $insertStmt->execute([
            ':backpack_id' => $backpack_id,
            ':task_id' => $task_id,
            ':is_checked' => $is_checked
        ]);
        
        $success = $insertStmt->rowCount() > 0;
    } else {
        // Task exists, update it
        $updateStmt = $pdo->prepare("
            UPDATE user_tasks 
            SET isChecked = :is_checked 
            WHERE task_id = :task_id 
            AND backpack_id = :backpack_id
        ");
        
        $updateStmt->execute([
            ':is_checked' => $is_checked,
            ':task_id' => $task_id,
            ':backpack_id' => $backpack_id
        ]);
        
        $success = $updateStmt->rowCount() > 0;
    }

    if ($success) {
        $pdo->commit();
        echo json_encode(['success' => true]);
    } else {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update task status']);
    }
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('Database error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error occurred']);
}
?> 