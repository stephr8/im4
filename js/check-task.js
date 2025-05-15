document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".check-task").forEach((checkbox) => {
    checkbox.addEventListener("change", async function () {
      const taskId = this.dataset.taskId;
      const isChecked = this.checked;

      console.log("Checkbox geklickt");
      console.log("Task ID:", taskId);
      console.log("Checked:", isChecked);

      try {
        const response = await fetch("api/update_task_check.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_id: taskId,
            is_checked: isChecked ? 1 : 0,
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log("Daten erfolgreich gespeichert.");
        } else {
          console.warn("Fehler vom Server:", result.message || "Unbekannter Fehler");
        }
      } catch (error) {
        console.error("Fehler beim Senden der Daten:", error);
      }
    });
  });
});

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function (event) {
    // Verhindere, dass Checkbox den Accordion-Toggle auslöst
    if (event.target.tagName.toLowerCase() === 'input') return;

    toggleAccordion(this);
  });
});
