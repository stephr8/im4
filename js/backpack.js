// _______________________________________________________________
// Creating a New Backpack and Adding Tasks
// _______________________________________________________________

// Function to send the request to create a new backpack
async function createBackpack() {
    const url = '/api/create_backpack.php';
    const userId = sessionStorage.getItem('userId') || 123;
    const data = { user_id: userId };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        console.log('Response status:', response.status);

        const result = await response.json();
        console.log('Response body:', result);
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            success: false,
            error: error.message || 'Netzwerkfehler'
        };
    }
}


// Trigger the backpack creation when button is clicked
const createBackpackButton = document.querySelector('#createBackpackBtn');
createBackpackButton.addEventListener('click', async () => {
    const result = await createBackpack();

    if (result && result.success) {
        console.log('Backpack created with ID:', result.backpack_id);
        window.location.href = 'backpack.html'; // ✅ redirect here
    } else {
        console.log('Error:', result.error || 'Unknown error');
        alert(result.error || 'Fehler beim Erstellen des Backpacks');
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
