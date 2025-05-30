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

try {
    // Get the user's backpack ID
    $stmt = $pdo->prepare("
        SELECT b.id as backpack_id
        FROM backpack b
        JOIN backpackAccess ba ON b.id = ba.backpack_id
        WHERE ba.user_id = :user_id
        AND ba.isApproved = 1
        LIMIT 1
    ");
    
    $stmt->execute([':user_id' => $_SESSION['user_id']]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode([
            'success' => true,
            'backpack_id' => $result['backpack_id']
        ]);
    } else {
        // If no backpack found, try to create one
        $pdo->beginTransaction();

        // Create new backpack
        $createStmt = $pdo->prepare("INSERT INTO backpack (user_id) VALUES (:user_id)");
        $createStmt->execute([':user_id' => $_SESSION['user_id']]);
        $newBackpackId = $pdo->lastInsertId();

        // Create backpack access
        $accessStmt = $pdo->prepare("
            INSERT INTO backpackAccess (user_id, backpack_id, isAdmin, isApproved)
            VALUES (:user_id, :backpack_id, 1, 1)
        ");
        $accessStmt->execute([
            ':user_id' => $_SESSION['user_id'],
            ':backpack_id' => $newBackpackId
        ]);

        $pdo->commit();

        echo json_encode([
            'success' => true,
            'backpack_id' => $newBackpackId,
            'message' => 'New backpack created'
        ]);
    }
} catch (PDOException $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?> 