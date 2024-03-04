const apiKey ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU0ZjE1YmM1ZTI3NTAwMTkwOTBkMTciLCJpYXQiOjE3MDk1MDI4ODIsImV4cCI6MTcxMDcxMjQ4Mn0.TFo6x5by-KuP3xrN2zIxIh1qC1BNMa1Ys0QhX7sLLQM"
const url = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.querySelector("form");
const btnSubmit = document.getElementsByClassName("btn-primary")[0];
const titolo = document.getElementById("Titolo");
const descrizione = document.getElementById("Descrizione");
const brand = document.getElementById("brand");
const imgUrl = document.getElementById("img");
const prezzo = document.getElementById("prezzo");
const type = document.getElementById("Tipo");
const btndelete = document.getElementById("delete");

const id = new URLSearchParams(window.location.search).get("idProdotto");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////qua siamo nella modalità modifica
if (id !== null) {
  btnSubmit.className = "btn btn-success";
  btnSubmit.textContent = "Modifica";
  btndelete.className = "btn btn-danger d-inline-block";

  fetch(url + id, {
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
    .then((product) => {
      console.log(product);
      document.getElementById("Titolo").value = product.name;
      document.getElementById("Descrizione").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("img").value = product.imageUrl;
      document.getElementById("prezzo").value = product.price;
      document.getElementById("Tipo").value = product.type;
    })
    .catch((err) => console.log(err));
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    putFetch(id);
  });
  btnSubmit.onclick = function () {};
  ////////////////////////////////////////modalità creazione
} else {
  btnSubmit.className = "btn btn-primary";
  btnSubmit.textContent = "Submit";
  btndelete.className = "btn btn-danger d-none";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    postData();
  });
}

function postData() {
  const data = {
    name: titolo.value,
    description: descrizione.value,
    brand: brand.value,
    imageUrl: imgUrl.value,
    price: prezzo.value,
    type:"0"
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
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
      alert("Annuncio creato correttamente");
      form.reset();
    })
    .catch((err) => console.log(err));
}

function putFetch(id) {
  const data = {
    name: titolo.value,
    description: descrizione.value,
    brand: brand.value,
    imageUrl: imgUrl.value,
    price: prezzo.value,
    type:type.value

  };

  fetch(url + id, {
    method: "PUT",
    body: JSON.stringify(data),
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
    .then((updatedProduct) => {
      console.log(updatedProduct);
      updatedProduct.name = document.getElementById("Titolo").value;
      updatedProduct.description = document.getElementById("Descrizione").value;
      document.getElementById("brand").value = updatedProduct.brand;
      document.getElementById("img").value = updatedProduct.imageUrl;
      document.getElementById("prezzo").value = updatedProduct.price;
      document.getElementById("Tipo").value = updatedProduct.type;
      alert("Annuncio è stato modificato correttamente");
      window.location.assign("./index.html");

    })
    .catch((err) => console.log(err));
}

btndelete.onclick = function () {
  handleDelete();
};

const handleDelete = () => {
  // chiediamo conferma all'utente di voler eliminare
  const confirmed = confirm("Sei proprio sicuro sicuro di voler eliminare?");

  if (confirmed) {
    // se accetta procediamo all'effettiva rimozione
    fetch(url+id, {
       method: "DELETE",
       headers: {
         Authorization: apiKey,
         "Content-Type": "application/json",
       },
  
  
  })
    

    // già a questo punto la risorsa è stata eliminata
      .then((resp) => resp.json()) // aspettare con un then ci può essere utile solo per sapere esattamente quando il server ci ha risposto per avere ulteriore conferma
      .then((deletedApp) => {
        console.log(deletedApp)
        alert("abbiamo eliminato " + deletedApp.name);
        // se non usassimo un alert qui servirebbe ritardare l'esecuzione del metodo assign di window,
        // ma siccome alert è "bloccante" in questo specifico caso non occorre
        window.location.assign("./index.html");
      });
  }
};
