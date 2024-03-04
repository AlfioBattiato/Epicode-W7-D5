const row = document.getElementById("containerCards");

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU0ZjE1YmM1ZTI3NTAwMTkwOTBkMTciLCJpYXQiOjE3MDk1MDI4ODIsImV4cCI6MTcxMDcxMjQ4Mn0.TFo6x5by-KuP3xrN2zIxIh1qC1BNMa1Ys0QhX7sLLQM";

const url = "https://striveschool-api.herokuapp.com/api/product/";

function creaCard(immagine, title, prezzo, id, brand) {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-3 ";

  const card = document.createElement("div");
  card.className = "card";
  card.style.height = "22rem";

  const img = document.createElement("img");
  img.className = "card-img-top object-fit-cover";
  img.src = immagine;
  img.style.height = "10rem";

  const body = document.createElement("div");
  body.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title fw-bold";
  h5.textContent = title;

  const km = document.createElement("p");
  km.className = "card-text d-flex";
  km.textContent = "Km: ";
  const span2 = document.createElement("span");
  span2.className = " badge text-bg-secondary ms-auto";
  span2.textContent = brand;
  km.appendChild(span2);

  const p = document.createElement("p");
  p.className = "card-text d-flex";
  p.textContent = "Prezzo: ";
  const span = document.createElement("span");
  span.className = " badge text-bg-dark ms-auto";
  span.textContent = "€ " + prezzo;
  p.appendChild(span);

  const btnDettaglio = document.createElement("a");
  btnDettaglio.href = `./dettagli.html?idProdotto=${id}`;
  btnDettaglio.className = "btn btn-primary me-1";
  btnDettaglio.innerText = "Info";

  const btnModifica = document.createElement("a");
  btnModifica.href = `./backoffice.html?idProdotto=${id}`;
  btnModifica.className = "btn btn-success me-1";
  btnModifica.innerText = "Modifica";

  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(img);
  card.appendChild(body);
  body.appendChild(h5);
  body.appendChild(km);
  body.appendChild(p);
  body.appendChild(btnDettaglio);
  body.appendChild(btnModifica);
}

//gestione filtri prezzo
const selectPrice = document.getElementById("prezzomax");
const selectkm = document.getElementById("ricercaKm");
const btnfiltri = document.getElementById("btnfiltri");

btnfiltri.addEventListener("click", () => {
  startFetch(selectPrice.value, selectkm.value, creaCard);
});

function startFetch(prezzofiltrato, kmfiltrato, funzione) {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
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
      const arrayfiltrato = newAppointment.filter((auto) => {
        return (
          auto.price <= parseFloat(prezzofiltrato) &&
          auto.brand <= parseFloat(kmfiltrato)
        );
      });
      btnfiltri.innerHTML = arrayfiltrato.length + " risultati ";
      console.log("ciao");
      if (typeof funzione === "function") {
        row.innerHTML = "";
        arrayfiltrato.forEach((oggetto) => {
          funzione(
            oggetto.imageUrl,
            oggetto.name,
            oggetto.price,
            oggetto._id,
            oggetto.brand
          );
        });
      }
    })
    .catch((err) => console.log(err));
}

startFetch(selectPrice.value, selectkm.value, creaCard);

selectPrice.addEventListener("change", function () {
  startFetch(selectPrice.value, selectkm.value);
});
selectkm.addEventListener("change", function () {
  startFetch(selectPrice.value, selectkm.value);
});

// function guardanumero() {
//   fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: apiKey,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then((newAppointment) => {
//       const arrayfiltrato = newAppointment.filter((auto) => {
//         return (
//           auto.price <= parseFloat(selectPrice.value) &&
//           auto.brand <= parseFloat(selectkm.value)
//         );
//       });
//       btnfiltri.innerHTML = arrayfiltrato.length + " risultati ";
//     })
//     .catch((err) => console.log(err));
// }
