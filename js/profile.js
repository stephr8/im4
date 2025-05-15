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
console.log(data);// gibt die Daten der API oder false in der Konsole aus

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
const domemail = document.querySelector('#email');


domfirstName.value = data.user.first_name;
domlastName.value = data.user.last_name;
domusername.value = data.user.username;
domstreet.value = data.user.street;
domzip.value = data.user.zip;
domtown.value = data.user.town;
dombirthdate.value = data.user.birthdate;
domnationality.value = data.user.nationality;
domtrust_person.value = data.user.trust_person;
domemail.value = data.user.email;
// _______________________________________________________________
// Adding everything to the database


saveButton.addEventListener('click', async () => {
  let firstName = inputFirstName.value;
  let lastName = inputLastName.value;
  let username = inputUsername.value;
  let street = inputStreet.value;
  let zip = inputZip.value;
  let town = inputTown.value;
  let birthdate = inputBirthdate.value;
  let nationality = inputNationality.value;
  let trust_person = inputTrust_person.value;
  let email = domemail.value;
  const url = '/api/profile/createProfile.php'; // mit korrekter API-URL ersetzen
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
    email: email
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