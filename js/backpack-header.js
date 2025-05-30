// Function to update the backpack header with user's first name
async function updateBackpackHeader() {
    try {
        const response = await fetch('/api/profile/readProfile.php');
        const data = await response.json();
        
        if (data.status === "success" && data.user.first_name) {
            const headerElement = document.querySelector('.headerTitel');
            if (headerElement) {
                headerElement.textContent = `${data.user.first_name}s Rucksack`;
            }
        }
    } catch (error) {
        console.error('Error updating backpack header:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateBackpackHeader); 