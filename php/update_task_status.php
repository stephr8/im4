<?php
header('Content-Type: application/json');

require_once 'db_connect.php';

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['task_id']) || !isset($data['backpack_id']) || !isset($data['is_checked'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required parameters']);
    exit;
}

$task_id = intval($data['task_id']);
$backpack_id = intval($data['backpack_id']);
$is_checked = intval($data['is_checked']);

try {
    $stmt = $conn->prepare("UPDATE user_tasks SET isChecked = ? WHERE task_id = ? AND backpack_id = ?");
    $stmt->bind_param("iii", $is_checked, $task_id, $backpack_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update task status']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?> 