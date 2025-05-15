<?php
session_start();

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

// For testing purposes, replace with actual session variable
// $loggedInUserId = 7;


// Read JSON input from fetch request
$input = json_decode(file_get_contents('php://input'), true);


$street = trim($input['street']) ?? null;
$zip = trim($input['zip']) ?? null;
$town = trim($input['town']) ?? null;
$first_name = trim($input['first_name']) ?? null;
$last_name = trim($input['last_name']) ?? null;
$birthdate = trim($input['birthdate']) ?? null;
$nationality = trim($input['nationality']) ?? null;
$ahv = trim($input['ahv']) ?? null;
$trust_person = trim($input['trust_person']) ?? null;
$username = trim($input['username']) ?? null;

// Insert into DB
$stmt = $pdo->prepare("UPDATE user_profiles
SET 
    first_name = :first_name,
    last_name = :last_name,
    username = :username,
    street = :street,
    zip = :zip,
    town = :town,
    birthdate = :birthdate,
    nationality = :nationality,
    ahv = :ahv,
    trust_person = :trust_person
WHERE 
    user_id = :user_id;");
$stmt->bindParam(':user_id', $loggedInUserId, PDO::PARAM_INT);
$stmt->bindParam(':street', $street, PDO::PARAM_STR);
$stmt->bindParam(':zip', $zip, PDO::PARAM_STR);
$stmt->bindParam(':town', $town, PDO::PARAM_STR);
$stmt->bindParam(':first_name', $first_name, PDO::PARAM_STR);
$stmt->bindParam(':last_name', $last_name, PDO::PARAM_STR);
$stmt->bindParam(':birthdate', $birthdate, PDO::PARAM_STR);
$stmt->bindParam(':nationality', $nationality, PDO::PARAM_STR);
$stmt->bindParam(':ahv', $ahv, PDO::PARAM_STR);
$stmt->bindParam(':trust_person', $trust_person, PDO::PARAM_STR);
$stmt->bindParam(':username', $username, PDO::PARAM_STR);

try {
    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Profile updated."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
