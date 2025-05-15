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

    document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("user-info-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Verhindert Neuladen

    // Werte aus Formularfeldern lesen
    const data = {
      first_name: document.getElementById("first_name").value.trim(),
      last_name: document.getElementById("last_name").value.trim(),
      street: document.getElementById("street").value.trim(),
      zip: document.getElementById("zip").value.trim(),
      town: document.getElementById("town").value.trim(),
      birthdate: document.getElementById("birthdate").value.trim(),
      nationality: document.getElementById("nationality").value.trim(),
      trust_person: document.getElementById("trust_person").value.trim(),
      ahv: document.getElementById("ahv").value.trim()
    };

    try {
      const response = await fetch("api/user_info_update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.status === "updated") {
        alert("Profil wurde aktualisiert.");
      } else if (result.status === "inserted") {
        alert("Profil wurde erstellt.");
      } else {
        alert("Etwas ist schiefgelaufen.");
      }
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Verbindungsfehler.");
    }
  });
});
