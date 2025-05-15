
<?php
require_once '../system/config.php';


/* 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $taskId = $_POST['task_id'];
    $isChecked = $_POST['is_checked'];

    if (isset($taskId)) {
        $stmt = $conn->prepare("UPDATE tasks SET isChecked = ? WHERE id = ?");
        $stmt->bind_param("ii", $isChecked, $taskId);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'DB-Fehler']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Ungültige Anfrage']);
    }

    $conn->close();
} */


session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
    exit;
}

require_once '../../system/config.php';
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$data = json_decode(file_get_contents("php://input"), true);

$task_id = $data['task_id'] ?? null;
$is_checked = $data['is_checked'] ?? null;

if ($task_id === null || $is_checked === null) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Ungültige Daten"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE tasks SET is_checked = :is_checked WHERE task_id = :task_id");
    $stmt->bindParam(":is_checked", $is_checked, PDO::PARAM_INT);
    $stmt->bindParam(":task_id", $task_id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Datenbankfehler: " . $e->getMessage()]);
}
