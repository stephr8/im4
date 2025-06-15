
## Idee und Ziel
Wegbereiter ist eine Webanwendung, die Menschen dabei unterstützen soll, wichtige persönliche Informationen, Dokumente und Verantwortlichkeiten übersichtlich aufzubereiten, in Form eines digitalen Rucksacks zu sammeln und erwünschten Personen zugänglich zu machen – z. B. für die nahestehenden Personen. Als Inspiration hat uns die App flatastic geholfen.


## Vorgehen
Wir haben erstmal nach Problemen der Ü50-Leute gesucht und uns dann dafür entschieden, etwas zu machen, wovon auch der Nachwuchs profitieren kann. In den beiden Interviews wurde schnell klar, dass bei der Nachlassplanung oft die Übersicht fehlt, was muss man noch alles machen? Wo hinterlegt man die dann? Da war uns klar, wir möchten eine App machen, die genau diese Probleme löst.

Am Anfang haben wir dann die nötigen Tasks und Kategorien recherchiert und versucht, uns den Vorgang hinter der App zu visualisieren mit Screen Flow und dbdiagram. Das war teilweise sehr verwirrend, aber hat schlussendlich geholfen, damit wir wussten was soll wann passieren.

Dazu haben wir ein Mockup in Figma gemacht, um unsere Visualisation vom Kopf auf den Bildschirm zu kriegen, was auch sehr hilfreich war im späteren Prozess, wenn man mal wieder den Faden verloren hatte.

Dann haben wir anhand von dem die Tabellen in der Datenbank erstellt und jeweils getestet, ob bei den verschiedenen Funktionen das Eintragen in die Tabelle funktioniert.

Währenddessen und am Schluss haben wir das Layout noch angepasst und immer im Kopf gehabt, dass alles sehr einfach, etwas grösser und breiter gehalten sein soll. Damit es für Ü50-Leute auch wirklich praktisch ist.


## Technologien
- Figma Mockup als Vorbereitung und UX
- HTML, CSS, JavaScript (Vanilla)
- PHP (mit PDO für sichere Datenbankabfragen)
- MySQL (Datenbankstruktur im ERM-Modell)
- Visual Studio Code + Five Server / PHP-Built-in Server


## Datenbankmodell
- `users` – Enthält Login-Informationen (username, email, password)
- `user_profiles` – Enthält weitere persönliche Infos (Vorname, Adresse etc.)
- `tasks` – Sind Checklistenpunkte (pro Kategorie)
- `documents` – Uploads pro Aufgabe
- `backpacks` – Struktur pro Nutzer
- `backpack_access` – Zugriff und Rollenverwaltung


## Installation (lokal)
1. Projekt in lokalen Serverordner legen (z. B. XAMPP htdocs oder php -S starten)
2. Datenbank importieren (z. B. über phpMyAdmin):  
   → Datei: `a42r14_im4.sql`
3. In `system/config.php` DB-Verbindung einrichten
4. Projekt starten:  
   `http://localhost/weg-bereiter/index.html`


## Struktur und Fuktionen
- Benutzerregistrierung und Login (mit Sessions und Passwortverschlüsselung)
- Die Angaben von der Registration werden bei den Persönlichen Angaben übernommen
- Adminrechte können über die Datenbank manuell gesetzt werden (`backpack_access.isAdmin = 1`)
- Persönliches Profil (Vorname, Adresse, AHV-Nummer, Vertrauensperson etc.)
- Name wird verwendet, um den Rucksack in der Kopfzeile zu personalisieren
- Kategorienübersicht des digitalen Rucksacks (z. B. Finanzen, Gesundheit, Wohnen etc.)
- Accordion-Checklisten pro Kategorie (mit Checkbox)
- Verwaltung von Aufgaben: is_checked Status direkt in der Datenbank gespeichert
- Responsives Design für Desktop, Tablet und Mobile


## Geplante ToDos für die Zukunft
Was wir noch geplant haben, ist die Einladung anderer Personen mit einem Einladungslink. Mit diesem sollten die eingeladenen Personen dann Zugriff auf den Rucksack erhalten, nachdem sie sich mit einem Selfie authentifiziert haben, welches der Rucksackbesitzer bestätigt haben muss.
Diese Anzahl Personen sollten dann schon in einem Zwischentitel angezeigt werden.
Zudem sollten zukünftig die Aufgaben nicht nur abgehakt, sondern auch die dazugehörigen Dokumente hochgeladen werden können.
Zum Schluss wäre noch die Idee gewesen, dass es eine Übersichtsseite geben würde von allen Tasks inkl. Dokumente (falls vorhanden), damit man auf einen Blick sieht, was schon erledigt ist und was nicht.
In ferner Zukunft wäre sicher noch sinnvoll, inhaltlich die Tasks auf die unterschiedichen Kantone anzupassen, da das stark variieren kann.
Zusätzlich wäre es gut, die App noch mehrsprachig zu machen.


## Persönliche Reflexion
Dieses Projekt war wie so oft in diesem Fach eine emotionale Achterfahrt. Es gab sehr frustrierende Momente, aber auch glückliche und stolze Momente, wenn man einen kleinen Erfolg feiern konnte, weil etwas nach langem Probieren endlich funktioniert hat. Es mir geholfen, die verschiedenen Teile einer dynamischen Webanwendung in der Praxis zumindest ein bisschen zu verstehen: Wie Frontend, Backend und Datenbank miteinander kommunizieren, wie wichtig Datenvalidierung und Sicherheit (z. B. durch PDO) sind, und wie sich Benutzerführung durch gute Struktur und Design verbessern lässt. Das Verständnis reicht nicht dafür, dass wir es komplett alleine machen könnten, aber es reicht aus, um die richtigen Fragen zu stellen oder Profi-Entwicklern sagen zu können, was wir wollen würden. Für alles, was wir geplant hatten, hat es am Ende ja nicht gereicht. Wir haben aber gelernt, sauber mit Git und Projektstruktur zu arbeiten, und habe besonders durch die Arbeit mit fetch(), Sessions und responsivem CSS mein Verständnis für moderne Webentwicklung vertieft.

Am Anfang war es herausfordernd, alle Zustände (z. B. ob ein Task gecheckt ist, oder ob ein Benutzerprofil schon existiert) korrekt abzubilden. Durch gezielte Debugging-Tools (Developer Tools, PHP-Fehleranzeigen, Konsolen-Logging) und mithilfe von copilot oder ChatGPT haben wir gelernt, systematisch zu testen und Probleme zu beheben.

Wir sind stolz darauf, dass wir viele unserer Herausforderungen meistern konnten (mit Unterstützung) und das gelernte Wissen aus den letzten Semestern wieder auffrischen konnten, da diese bei mir zumindest schon wieder etwas in den Hintergrund meines Gedächtnis gerutscht sind.
