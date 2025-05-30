async function loadUserBackpack() {
  try {
    const response = await fetch('/api/backpack/get_user_backpack.php');
    const data = await response.json();
    
    if (data.success && data.backpack_id) {
      // Update all checkboxes with the correct backpack ID
      document.querySelectorAll('.check-task').forEach(checkbox => {
        checkbox.dataset.backpackId = data.backpack_id;
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error loading user backpack:', error);
    return false;
  }
}

async function loadTaskStatuses() {
  try {
    const response = await fetch('/api/task/get_task_status.php');
    const data = await response.json();
    
    if (data.success && data.data) {
      // Store the backpack ID for later use
      document.querySelectorAll('.check-task').forEach(checkbox => {
        checkbox.dataset.backpackId = data.data.backpack_id;
      });
      
      // Update all checkboxes with their current status
      document.querySelectorAll('.check-task').forEach(checkbox => {
        const taskId = checkbox.dataset.taskId;
        const task = data.data.tasks.find(t => t.id.toString() === taskId);
        
        if (task) {
          checkbox.src = task.image;
          checkbox.alt = task.isChecked ? 'Checked' : 'Unchecked';
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error loading task statuses:', error);
    return false;
  }
}

async function toggleCheckbox(checkbox) {
  const isCurrentlyUnchecked = checkbox.src.includes('uncheckedmark.svg');
  const taskId = checkbox.dataset.taskId;
  const backpackId = checkbox.dataset.backpackId;

  console.log('Current state:', { isCurrentlyUnchecked, taskId, backpackId });

  // Update UI immediately for better user experience
  checkbox.src = isCurrentlyUnchecked ? 'images/checkedmark.svg' : 'images/uncheckedmark.svg';
  checkbox.alt = isCurrentlyUnchecked ? 'Checked' : 'Unchecked';

  // Then update the database
  const success = await updateTaskStatus(taskId, backpackId, isCurrentlyUnchecked);
  
  console.log('Update result:', success);

  if (!success) {
    // Revert only if the update failed
    checkbox.src = isCurrentlyUnchecked ? 'images/uncheckedmark.svg' : 'images/checkedmark.svg';
    checkbox.alt = isCurrentlyUnchecked ? 'Unchecked' : 'Checked';
    console.error('Failed to update task status');
  }
}

async function updateTaskStatus(taskId, backpackId, isChecked) {
  try {
    console.log('Sending request with:', { taskId, backpackId, isChecked });
    
    const response = await fetch('/api/task/update_task_status.php', {
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

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error details:', errorData);
      return false;
    }

    const data = await response.json();
    console.log('Server response:', data);
    return data.success;
  } catch (error) {
    console.error('Error updating task status:', error);
    return false;
  }
}

function toggleAccordion(header) {
  const accordion = header.closest(".accordion");
  const body = accordion.querySelector('.accordion-body');
  const icon = header.querySelector('.accordion-icon');

  const isOpen = body.style.display === 'block';
  
  body.style.display = isOpen ? 'none' : 'block';
  icon.src = isOpen ? 'images/chevronsmalldown.svg' : 'images/chevronsmallup.svg';
}

document.addEventListener('DOMContentLoaded', async function() {
  // First load the user's backpack and task statuses
  await loadTaskStatuses();

  // Add click handlers for checkboxes
  document.querySelectorAll('.check-task').forEach(checkbox => {
    checkbox.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click from triggering the accordion
      toggleCheckbox(this);
    });
  });

  // Add click handlers for accordion headers
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function(event) {
      // Only toggle accordion if we're not clicking the checkbox
      if (!event.target.classList.contains('check-task')) {
        toggleAccordion(this);
      }
    });
  });
});

  