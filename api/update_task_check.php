
<?php
require_once '../system/config.php';



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
}

?>
