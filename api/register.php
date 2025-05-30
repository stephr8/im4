<?php
// register.php
session_start();
header('Content-Type: application/json');

require_once '../system/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email      = trim($_POST['email'] ?? '');
    $password   = trim($_POST['password'] ?? '');
    $username   = trim($_POST['username'] ?? '');
    $firstName  = trim($_POST['first_name'] ?? '');
    $lastName   = trim($_POST['last_name'] ?? '');

    if (!$email || !$password || !$username || !$firstName || !$lastName) {
        echo json_encode(["status" => "error", "message" => "Bitte fülle alle Felder aus"]);
        exit;
    }

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Email ist bereits vergeben"]);
        exit;
    }

    // Check if username already exists
    $stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE username = :username");
    $stmt->execute([':username' => $username]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Benutzername ist bereits vergeben"]);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert the new user
    $pdo->beginTransaction();
    try {
        $insertUser = $pdo->prepare("INSERT INTO users (email, password) VALUES (:email, :pass)");
        $insertUser->execute([
            ':email' => $email,
            ':pass'  => $hashedPassword
        ]);

        $userId = $pdo->lastInsertId();

        $insertProfile = $pdo->prepare("INSERT INTO user_profiles (user_id, username, first_name, last_name) VALUES (:user_id, :username, :first_name, :last_name)");
        $insertProfile->execute([
            ':user_id'    => $userId,
            ':username'   => $username,
            ':first_name' => $firstName,
            ':last_name'  => $lastName
        ]);

        $pdo->commit();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(["status" => "error", "message" => "Registration fehlgeschlagen"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
