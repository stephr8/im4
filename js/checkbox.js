function toggleCheckbox(img) {
  const isChecked = img.src.includes("checkedmark.svg");
  const newStatus = !isChecked;

  // Toggle Icon
  img.src = newStatus ? "images/checkedmark.svg" : "images/uncheckedmark.svg";

  // Hole task_id und backpack_id aus data-Attributen
  const taskId = img.dataset.taskId;
  const backpackId = img.dataset.backpackId;

  // Sende die Änderung an den Server
  fetch('/api/update-task-check.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      task_id: taskId,
      backpack_id: backpackId,
      isChecked: newStatus ? 1 : 0
    })
  })
  .then(response => response.json())
  .then(data => {
    if (!data.success) {
      alert("Fehler beim Speichern.");
    }
  })
  .catch(error => {
    console.error("Fehler:", error);
  });
}