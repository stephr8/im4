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

// Read JSON input from fetch request
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['firstname']) || !isset($input['lastname'])) {
    http_response_code(400);
    echo json_encode(["error" => "Firstname and lastname are required."]);
    exit;
}

$geburtsjahr = trim($input['geburtsjahr']);

// Insert into DB
$stmt = $pdo->prepare("UPDATE user_profiles SET geburtsjahr = :geburtsjahr WHERE user_id = :user_id");
$stmt->bindParam(':user_id', $loggedInUserId, PDO::PARAM_INT);
$stmt->bindParam(':geburtsjahr', $geburtsjahr, PDO::PARAM_STR);

try {
    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Profile updated."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}


session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Nicht eingeloggt"]);
    exit;
}

require_once '../../system/config.php';
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$userId = $_SESSION['user_id'];
$input = json_decode(file_get_contents('php://input'), true);

// Felder aus dem JSON entnehmen
$firstName = trim($input['first_name'] ?? '');
$lastName = trim($input['last_name'] ?? '');
$street = trim($input['street'] ?? '');
$zip = trim($input['zip'] ?? '');
$town = trim($input['town'] ?? '');
$birthdate = trim($input['birthdate'] ?? '');
$nationality = trim($input['nationality'] ?? '');
$trust_person = trim($input['trust_person'] ?? '');
$ahv = trim($input['ahv'] ?? '');

// Prüfen, ob user_profiles-Eintrag existiert
$stmt = $pdo->prepare("SELECT * FROM user_profiles WHERE user_id = ?");
$stmt->execute([$userId]);
$profile = $stmt->fetch(PDO::FETCH_ASSOC);

if ($profile) {
    // UPDATE nur leere Felder (IS NULL)
    $sql = "UPDATE user_profiles SET
        first_name = IF(first_name IS NULL OR first_name = '', :first_name, first_name),
        last_name = IF(last_name IS NULL OR last_name = '', :last_name, last_name),
        street = IF(street IS NULL OR street = '', :street, street),
        zip = IF(zip IS NULL OR zip = '', :zip, zip),
        town = IF(town IS NULL OR town = '', :town, town),
        birthdate = IF(birthdate IS NULL, :birthdate, birthdate),
        nationality = IF(nationality IS NULL OR nationality = '', :nationality, nationality),
        trust_person = IF(trust_person IS NULL OR trust_person = '', :trust_person, trust_person),
        ahv = IF(ahv IS NULL OR ahv = '', :ahv, ahv)
        WHERE user_id = :user_id";

    $update = $pdo->prepare($sql);
    $update->execute([
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':street' => $street,
        ':zip' => $zip,
        ':town' => $town,
        ':birthdate' => $birthdate,
        ':nationality' => $nationality,
        ':trust_person' => $trust_person,
        ':ahv' => $ahv,
        ':user_id' => $userId
    ]);
    echo json_encode(["status" => "updated"]);
} else {
    // INSERT neuer Eintrag
    $sql = "INSERT INTO user_profiles (user_id, first_name, last_name, street, zip, town, birthdate, nationality, trust_person, ahv)
            VALUES (:user_id, :first_name, :last_name, :street, :zip, :town, :birthdate, :nationality, :trust_person, :ahv)";
    $insert = $pdo->prepare($sql);
    $insert->execute([
        ':user_id' => $userId,
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':street' => $street,
        ':zip' => $zip,
        ':town' => $town,
        ':birthdate' => $birthdate,
        ':nationality' => $nationality,
        ':trust_person' => $trust_person,
        ':ahv' => $ahv
    ]);
    echo json_encode(["status" => "inserted"]);
}
