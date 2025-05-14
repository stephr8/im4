// _______________________________________________________________
// Creating a New Backpack and Adding Tasks
// _______________________________________________________________

// Function to send the request to create a new backpack
async function createBackpack() {
    const url = '/api/create_backpack.php';  // Correct the URL to your API
    // Retrieve the user ID from a global variable, session storage, or API
    const userId = sessionStorage.getItem('userId') || 123; // Replace 123 with a fallback or default value
    const data = { user_id: userId };

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

// Trigger the backpack creation when button is clicked
const createBackpackButton = document.querySelector('#createBackpackBtn');
createBackpackButton.addEventListener('click', async () => {
    const result = await createBackpack();

    if (result && result.success) {
        console.log('Backpack created with ID:', result.backpack_id);
        alert('Backpack created successfully!');
    } else {
        console.log('Error:', result.error || 'Unknown error');
        alert('Error creating backpack');
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
