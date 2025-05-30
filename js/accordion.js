async function toggleCheckbox(checkbox) {
  const isUnchecked = checkbox.src.includes('uncheckedmark.svg');
  const taskId = checkbox.dataset.taskId;
  const backpackId = checkbox.dataset.backpackId;

  // Update the checkbox image
  checkbox.src = isUnchecked ? 'images/checkedmark.svg' : 'images/uncheckedmark.svg';
  checkbox.alt = isUnchecked ? 'Checked' : 'Unchecked';

  // Update the database
  const success = await updateTaskStatus(taskId, backpackId, isUnchecked);
  if (!success) {
    // Revert the checkbox if the update failed
    checkbox.src = isUnchecked ? 'images/uncheckedmark.svg' : 'images/checkedmark.svg';
    checkbox.alt = isUnchecked ? 'Unchecked' : 'Checked';
    console.error('Failed to update task status');
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

document.addEventListener('DOMContentLoaded', function() {
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

  