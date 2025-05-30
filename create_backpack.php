<?php

function createBackpackForUser($user_id, $pdo) {
    try {
        // Start transaction
        $pdo->beginTransaction();
        
        // Create new backpack
        $stmt = $pdo->prepare("INSERT INTO backpack (user_id) VALUES (?)");
        $stmt->execute([$user_id]);
        $backpack_id = $pdo->lastInsertId();
        
        // Create backpack access
        $stmt = $pdo->prepare("INSERT INTO backpackAccess (user_id, backpack_id, isAdmin, isApproved) VALUES (?, ?, 1, 1)");
        $stmt->execute([$user_id, $backpack_id]);
        
        // Get all tasks
        $stmt = $pdo->query("SELECT id FROM task");
        $tasks = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Create user_tasks entries
        $stmt = $pdo->prepare("INSERT INTO user_tasks (backpack_id, task_id, isChecked) VALUES (?, ?, 0)");
        foreach ($tasks as $task_id) {
            $stmt->execute([$backpack_id, $task_id]);
        }
        
        // Commit transaction
        $pdo->commit();
        return true;
        
    } catch (PDOException $e) {
        // Rollback transaction on error
        $pdo->rollBack();
        error_log("Error creating backpack: " . $e->getMessage());
        return false;
    }
}

// Example usage:
/*
After creating a user profile, call this function:

$pdo = new PDO("mysql:host=your_host;dbname=your_db", "username", "password");
createBackpackForUser($user_id, $pdo);
*/
?> 