    // _______________________________________________________________
    // Loading the profile data from the API
    // _______________________________________________________________

    async function loadData() {
        const url = '/api/profile/readProfile.php'; // mit korrekter API-URL ersetzen
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    const data = await loadData();
    console.log(data);// gibt die Daten der API oder false in der Konsole aus

    const domfirstName = document.querySelector('#firstName');
    const domlastName = document.querySelector('#lastName');

    domfirstName.innerHTML = data.user.first_name;
    domlastName.innerHTML = data.user.last_name;

    // _______________________________________________________________
    // Adding Vorname und Nachname to the Database
    // _______________________________________________________________


    const inputFirstName = document.querySelector('#inputFirstName');
    const inputLastName = document.querySelector('#inputLastName');
    const inputUsername = document.querySelector('#inputUsername');
    const inputStreet = document.querySelector('#inputStreet');
    const inputZip = document.querySelector('#inputZip');
    const inputTown = document.querySelector('#inputTown');
    const inputBirthdate = document.querySelector('#inputBirthdate');
    const inputNationality = document.querySelector('#inputNationality');
    const inputTrust_person = document.querySelector('#inputTrust_person');
    const saveButton = document.querySelector('#Btn_saveInfo');

    saveButton.addEventListener('click', async () => {
        let firstName = inputFirstName.value;
        let lastName = inputLastName.value;
        const url = '/api/profile/createProfile.php'; // mit korrekter API-URL ersetzen
        const data = {
            first_name: firstName,
            last_name: lastName
        };
        const dataAdded = await addData(url, data);
        console.log(dataAdded);
    });

    //I want to post the data to the API and then reload the page
    async function addData(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return false;
        }
    }