# Habit Tracker

Tämä sovellus on tehty henkilökohtaiseksi työkaluksi omien tapojen ja rutiinien seuraamiseen. 
Käyttäjä voi luoda tehtäviä (habitteja), merkitä ne suoritetuiksi, lisätä niille kategorian, päivämäärän ja muistiinpanoja. 
Lisäksi sovelluksessa on profiilisivu, jossa käyttäjä voi päivittää omia tietojaan ja profiilikuvan.

## Toiminnot

- Rekisteröityminen ja kirjautuminen
- Tehtävän lisääminen, muokkaaminen ja poistaminen
- Tehtävän suorituksen merkitseminen (checkbox)
- Muistiinpanojen lisääminen yksittäiselle tavalle
- Päivämäärän ja kategorian valinta
- Käyttäjäprofiilin muokkaus (nimi, sähköposti, syntymäpäivä, kuva)
- Tallennus MongoDB-tietokantaan
- Token-pohjainen autentikointi

---

## Frontend

- **React (Vite)** – Sovelluksen käyttöliittymä on rakennettu Reactilla, nopean ja modernin Vite-kehitystyökalun avulla
- **Tailwind CSS** – Vastaa ulkoasun suunnittelusta; kaikki tyylit on tehty komponenttipohjaisesti Tailwindin avulla
- **Axios** – Käytössä frontendin ja backendin väliseen tiedonsiirtoon

---

## Backend

- **Node.js + Express** – Serveri on rakennettu Express-frameworkin avulla, Node.js-ympäristössä. Reitit, API:t ja logiikka toteutettu omissa tiedostoissaan
- **MongoDB + Mongoose** – Kaikki käyttäjätiedot ja tavat tallennetaan MongoDB:hen. Mongoose hoitaa skeemat ja yhteydet tietokantaan
- **JWT (JSON Web Tokens)** – Käyttäjän kirjautuminen ja suojattujen reittien hallinta perustuu token-pohjaiseen autentikointiin
- **bcryptjs** – Käyttäjien salasanat kryptataan turvallisesti ennen tallennusta
