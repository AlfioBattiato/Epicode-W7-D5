const apiKey =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxZDNhZDRjNTllYzAwMTk5MGQ4ZGYiLCJpYXQiOjE3MDkyOTg2MDUsImV4cCI6MTcxMDUwODIwNX0.mb1tywt7mUK6KjJ7LSC14VY6TgMaADn0jFNfPfzBsKI";
const url = "https://striveschool-api.herokuapp.com/api/product/";
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    postData();
  });
function postData() {
  const titolo = document.getElementById("Titolo").value;
  const descrizione = document.getElementById("Descrizione").value;
  const brand = document.getElementById("brand").value;
  const imgUrl = document.getElementById("img").value;
  const prezzo = document.getElementById("prezzo").value;

  const data = {
    name:titolo,
    description: descrizione,
    brand: brand,
    imageUrl: imgUrl,
    price: prezzo,
  };

  fetch(url, {
    method: "POST", // è come scrivere method: method,
    body: JSON.stringify(data), // è fondamentale fare la stringhifizzazione dell'oggetto nativo o invieremo "[object Object]"
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }
        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }
        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }
        throw new Error("Errore nel reperimento dati");
      }
    })
    .then((newAppointment) => {
      
        alert("Auto è stata inserita con successo ");
        e.target.reset();
      
    })
    .catch((err) => console.log(err));
}