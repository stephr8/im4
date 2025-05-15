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

document.querySelectorAll('.check-task').forEach(checkbox => {
    checkbox.addEventListener('change', async function () {
        const taskId = this.dataset.taskId;
        const isChecked = this.checked ? 1 : 0;

        const response = await fetch('api/update_task_check.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `task_id=${taskId}&is_checked=${isChecked}`
        });

        const result = await response.json();
        if (!result.success) {
            alert('Fehler beim Aktualisieren!');
        }
    });
});