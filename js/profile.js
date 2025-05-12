async function loadData() {
    const url = '/api/profile.php'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadData();
console.log(data); // gibt die Daten der API oder false in der Konsole aus

const domFirstName = document.querySelector('#firstName');
const domLastName = document.querySelector('#lastName');

domFirstName.innerHTML = data.first_name;
domLastName.innerHTML = data.last_name;