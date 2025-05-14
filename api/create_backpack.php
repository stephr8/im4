

<?php
// give me all errors
error_reporting(E_ALL); 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

session_start();

// Auth check
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// DB-Verbindung
require_once '../system/config.php';

// Logged-in user ID
$loggedInUserId = $_SESSION['user_id'];

try {
    // Check if the user has already created a backpack
    $checkStmt = $pdo->prepare("SELECT id FROM backpack WHERE user_id = :user_id");
    $checkStmt->bindParam(':user_id', $loggedInUserId, PDO::PARAM_INT);
    $checkStmt->execute();
    $existingBackpack = $checkStmt->fetch(PDO::FETCH_ASSOC);

  if ($existingBackpack) {
    echo json_encode([
        "success" => true,
        "message" => "Backpack already exists",
        "backpack_id" => $existingBackpack['id']
    ]);
    exit;
}


    // Begin transaction
    $pdo->beginTransaction();

    // 1. Create new backpack (owned by this user)
    $stmt = $pdo->prepare("INSERT INTO backpack (user_id) VALUES (:user_id)");
    $stmt->bindParam(':user_id', $loggedInUserId, PDO::PARAM_INT);
    $stmt->execute();
    $newBackpackId = $pdo->lastInsertId();

    // 2. Insert all template tasks into user_tasks for this backpack
    $taskStmt = $pdo->query("SELECT id FROM task");
    $taskIds = $taskStmt->fetchAll(PDO::FETCH_COLUMN);

    $insertTaskStmt = $pdo->prepare("
        INSERT INTO user_tasks (backpack_id, task_id, isChecked)
        VALUES (:backpack_id, :task_id, false)
    ");

    foreach ($taskIds as $taskId) {
        $insertTaskStmt->execute([
            ':backpack_id' => $newBackpackId,
            ':task_id' => $taskId
        ]);
    }

    // Optional: Insert access for current user (as admin & approved)
    $accessStmt = $pdo->prepare("
        INSERT INTO backpackAccess (user_id, backpack_id, isAdmin, isApproved)
        VALUES (:user_id, :backpack_id, true, true)
    ");
    $accessStmt->execute([
        ':user_id' => $loggedInUserId,
        ':backpack_id' => $newBackpackId
    ]);

    // Commit all changes
    $pdo->commit();

    echo json_encode(["success" => true, "message" => "Backpack created", "backpack_id" => $newBackpackId]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
