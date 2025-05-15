 function toggleCheckbox(checkbox) {
      const isChecked = checkbox.src.includes('uncheckedmark.svg');
      checkbox.src = isChecked ? 'images/checkedmark.svg' : 'images/uncheckedmark.svg';
    }
 function toggleAccordion(header) {
      const accordion = header.closest(".accordion");
      accordion.classList.toggle("open");
  }
    function toggleAccordion(header) {
    const accordion = header.parentElement;
    const body = accordion.querySelector('.accordion-body');
    const icon = header.querySelector('.accordion-icon');

    const isOpen = body.style.display === 'block';

    body.style.display = isOpen ? 'none' : 'block';
    icon.src = isOpen ? 'images/chevronsmalldown.svg' : 'images/chevronsmallup.svg';
  }