<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false, 
        'message' => 'Unauthorized'
    ]);
    exit;
}

// DB connection
require_once '../../system/config.php';

try {
    // 1. Get the user's active backpack
    $backpackQuery = "
        SELECT DISTINCT b.id as backpack_id
        FROM backpack b
        INNER JOIN backpackAccess ba ON b.id = ba.backpack_id
        WHERE ba.user_id = :user_id
        AND ba.isApproved = 1
        LIMIT 1
    ";
    
    $backpackStmt = $pdo->prepare($backpackQuery);
    $backpackStmt->execute([':user_id' => $_SESSION['user_id']]);
    $backpack = $backpackStmt->fetch(PDO::FETCH_ASSOC);

    if (!$backpack) {
        echo json_encode([
            'success' => false,
            'message' => 'No active backpack found'
        ]);
        exit;
    }

    // 2. Get all tasks with their checked status
    $taskQuery = "
        SELECT 
            t.id as task_id,
            t.name as task_name,
            CASE 
                WHEN ut.isChecked IS NULL THEN 0
                ELSE ut.isChecked
            END as is_checked
        FROM task t
        LEFT JOIN user_tasks ut ON t.id = ut.task_id 
            AND ut.backpack_id = :backpack_id
        ORDER BY t.id ASC
    ";
    
    $taskStmt = $pdo->prepare($taskQuery);
    $taskStmt->execute([':backpack_id' => $backpack['backpack_id']]);
    $tasks = $taskStmt->fetchAll(PDO::FETCH_ASSOC);

    // Return success with tasks data
    echo json_encode([
        'success' => true,
        'data' => [
            'backpack_id' => $backpack['backpack_id'],
            'tasks' => array_map(function($task) {
                return [
                    'id' => $task['task_id'],
                    'name' => $task['task_name'],
                    'isChecked' => (bool)$task['is_checked'],
                    'image' => $task['is_checked'] ? 'images/checkedmark.svg' : 'images/uncheckedmark.svg'
                ];
            }, $tasks)
        ]
    ]);

} catch (PDOException $e) {
    error_log('Database error in get_task_status.php: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>