async function updateTaskStatus(taskId, backpackId, isChecked) {
  try {
    const response = await fetch('php/update_task_status.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_id: taskId,
        backpack_id: backpackId,
        is_checked: isChecked ? 1 : 0
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error updating task status:', error);
    return false;
  }
} 