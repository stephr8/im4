// Function to update elements with user's first name
async function updateUserElements() {
    try {
        const response = await fetch('/api/profile/readProfile.php');
        const data = await response.json();
        
        if (data.status === "success" && data.user.first_name) {
            // Update header if it exists
            const headerElement = document.querySelector('.headerTitel');
            if (headerElement) {
                headerElement.textContent = `${data.user.first_name}s Rucksack`;
            }

            // Update button if it exists
            const buttonElement = document.querySelector('#userBackpackBtn');
            if (buttonElement) {
                buttonElement.textContent = `${data.user.first_name}s Rucksack`;
            }
        }
    } catch (error) {
        console.error('Error updating user elements:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateUserElements); 