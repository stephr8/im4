// _______________________________________________________________
// Loading the profile data from the API
// _______________________________________________________________

console.log('Loading profile data...');
async function loadData() {
    const url = '/api/profile/readProfile.php'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        console.log(response);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadData();
console.log('data', data); // gibt die Daten der API oder false in der Konsole aus

const domfirstName = document.querySelector('#first_name');
const domlastName = document.querySelector('#last_name');
const domusername = document.querySelector('#username');
const domstreet = document.querySelector('#street');
const domzip = document.querySelector('#zip');
const domtown = document.querySelector('#town');
const dombirthdate = document.querySelector('#birthdate');
const domnationality = document.querySelector('#nationality');
const domtrust_person = document.querySelector('#trust_person');
const saveButton = document.querySelector('#save_user_information');

domfirstName.value = data.user.first_name;
domlastName.value = data.user.last_name;
domusername.value = data.user.username;
domstreet.value = data.user.street;
domzip.value = data.user.zip;
domtown.value = data.user.town;
dombirthdate.value = data.user.birthdate;
domnationality.value = data.user.nationality;
domtrust_person.value = data.user.trust_person;

// _______________________________________________________________
// Updating user information in the Database
// _______________________________________________________________

saveButton.addEventListener('click', async () => {
    console.log('Saving user information...');
    let firstName = domfirstName.value;
    let lastName = domlastName.value;
    let username = domusername.value;
    let street = domstreet.value;
    let zip = domzip.value;
    let town = domtown.value;
    let birthdate = dombirthdate.value;
    let nationality = domnationality.value;
    let trust_person = domtrust_person.value;
    const url = '/api/profile/updateProfile.php'; // mit korrekter API-URL ersetzen
    const data = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        street: street,
        zip: zip,
        town: town,
        birthdate: birthdate,
        nationality: nationality,
        trust_person: trust_person,
    };
    const dataUpdated = await updateData(url, data);
    console.log(dataUpdated);
    if (dataUpdated) {
        //location.reload(); // Reload the page after successful update
    }
});

async function updateData(url, data) {
    console.log('Updating data...');
    try {
        const response = await fetch(url, {
            method: 'PUT', // Use PUT for updating data
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
