console.log('Loading task data...');

async function loadTaskData() {
  const url = '/api/profile/readTask.php';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Laden der Aufgaben:', error);
    return false;
  }
}

async function init() {
  const taskData = await loadTaskData();
  console.log(taskData);

  if (taskData && taskData.status === "success") {
    const taskId = taskData.user.task_id;

    const domTaskId = document.querySelector('#task_id');
    if (domTaskId) {
      domTaskId.value = taskId;
      // domTaskId.textContent = taskId;
    }
  } else {
    console.warn('Keine Aufgaben gefunden oder Fehler beim Laden.');
  }
}

init(); // Startpunkt
