const row = document.getElementsByClassName("row")[0];

function creaCard(immagine, title, descrizione) {
  // ///////////////////////////////////////
  const col = document.createElement("div");
  row.appendChild(col);
  col.className = "col-6 col-md-3";

  // ///////////////////////////////////////
  const card = document.createElement("div");
  col.appendChild(card);
  card.className = "card";

  // ///////////////////////////////////////
  const img = document.createElement("img");
  card.appendChild(img);
  img.className = "card-img-top";
  img.src = immagine;

  // ///////////////////////////////////////
  const body = document.createElement("div");
  card.appendChild(body);
  body.className = "card-body";

  // ///////////////////////////////////////
  const h5 = document.createElement("h5");
  body.appendChild(h5);
  h5.className = "card-title";
  h5.textContent = title;

  // ///////////////////////////////////////
  const p = document.createElement("p");
  body.appendChild(p);
  p.className = "card-text";
  p.textContent = descrizione;

  // ///////////////////////////////////////
  const btnDettaglio = document.createElement("a");
  body.appendChild(btnDettaglio);
  btnDettaglio.href="./dettagli.html"
  btnDettaglio.className = "btn btn-primary me-1";
  btnDettaglio.innerText = "Info";

  // ///////////////////////////////////////
  const btnModifica = document.createElement("a");
  body.appendChild(btnModifica);
  btnModifica.href="./backoffice.html"
  btnModifica.className = "btn btn-success me-1";
  btnModifica.innerText = "Modifica";

}

creaCard("...", "titolo", "descrizione");
creaCard("...", "titolo", "descrizione");
creaCard("...", "titolo", "descrizione");
creaCard("...", "titolo", "descrizione");
