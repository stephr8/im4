// _______________________________________________________________
// Creating a New Backpack and Adding Tasks
// _______________________________________________________________

// Function to send the request to create a new backpack
async function createBackpack() {
    try {
        const response = await fetch('/api/create_backpack.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating backpack:', error);
        return {
            success: false,
            error: error.message || 'Netzwerkfehler'
        };
    }
}

// Handle backpack creation when button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const createBackpackBtn = document.querySelector('#createBackpackBtn');
    if (createBackpackBtn) {
        createBackpackBtn.addEventListener('click', async () => {
            try {
                const result = await createBackpack();
                if (result.success) {
                    // Redirect to backpack page on success
                    window.location.href = 'backpack.html';
                } else {
                    // If backpack already exists, still redirect
                    if (result.message === "Backpack already exists") {
                        window.location.href = 'backpack.html';
                    } else {
                        // Show error for other issues
                        alert(result.error || 'Fehler beim Erstellen des Rucksacks');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Fehler beim Erstellen des Rucksacks');
            }
        });
    }
});

// _______________________________________________________________
// Handling User Tasks and Checking the Response
// _______________________________________________________________
async function addData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
}
