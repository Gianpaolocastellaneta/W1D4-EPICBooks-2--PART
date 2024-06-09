let totalPrice = 0; // Variabile per tenere traccia del prezzo totale

// Funzione per aggiungere i libri alla pagina HTML
function addBooksToPage(books) {
  const bookOutput = document.getElementById('bookOutput'); // Seleziona l'elemento con l'id 'bookOutput'
  bookOutput.innerHTML = ''; // Pulisce il contenuto dell'elemento

  books.forEach(book => { // Per ogni libro nell'array dei libri
    const bookElement = document.createElement('div'); // Crea un nuovo div
    bookElement.classList.add('col-md-3', 'mb-4'); // Aggiunge le classi di Bootstrap al div
    bookElement.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <img src="${book.img}" class="card-img" alt="${book.title}">
        <div class="card-body flex-grow-1 text-center">
          <h5 class="card-title text-truncate book-title pb-2">${book.title}</h5>
          <p class="card-text">Prezzo: €${book.price.toFixed(2)}</p>
          <a class='w-100' href='/dettagli.html?id=${book.asin}'> Dettagli </a>
        </div>
        <div class="card-footer mt-auto">
          <button class="btn btn-primary" onclick="addToCart('${book.title}', ${book.price}, this)">Aggiungi al carrello</button>
          <button class='btn btn-secondary mt-2' onclick='removeCard(event)'> Nascondi </button>
        </div>
      </div>
    `; // Imposta il contenuto HTML del div
    bookOutput.appendChild(bookElement); // Aggiunge il nuovo div all'elemento 'bookOutput'
  });
}

// Funzione per recuperare i libri dall'API
async function fetchBooks() {
  try {
    const response = await fetch('https://striveschool-api.herokuapp.com/books'); // Effettua una richiesta all'API
    if (!response.ok) {
      throw new Error('La risposta non è ok: ' + response.statusText); // Lancia un errore se la risposta non è ok
    }
    const data = await response.json(); // Converte la risposta in JSON
    addBooksToPage(data); // Aggiunge i libri alla pagina
  } catch (error) {
    console.error('Si è verificato un problema con l\'operazione di recupero: ', error); // Logga l'errore
  }
}

// Funzione per cercare un libro
const searchBook = (ev) => {
  let query = ev.target.value // Ottiene la query di ricerca dall'input
  let allTitles = document.querySelectorAll(".book-title") // Seleziona tutti i titoli dei libri
  // Itera su ciascun titolo per verificare se corrisponde alla query di ricerca
  allTitles.forEach((title) => {
    const currCard = title.parentElement.parentElement.parentElement // Seleziona l'elemento carta genitore
    if (!title.innerText.toLowerCase().includes(query.toLowerCase())) { // Verifica se il titolo corrisponde alla query di ricerca
      currCard.style.display = "none" // Nasconde la carta se non corrisponde
    } else {
      currCard.style.display = "block" // Mostra la carta se corrisponde
    }
  })
}

// Funzione per aggiungere libri al carrello
function addToCart(title, price, btn) {
  const cart = document.getElementById('cart'); // Seleziona l'elemento con l'id 'cart'
  const cartItem = document.createElement('div'); // Crea un nuovo div per l'elemento del carrello
  cartItem.classList.add('card', 'mb-2'); // Aggiunge le classi di Bootstrap al div
  cartItem.innerHTML = `
    <div class="card-body d-flex justify-content-between align-items-center">
      <span>${title}</span>
      <span>€${price.toFixed(2)}</span>
      <button class="btn btn-danger btn-sm" onclick="removeFromCart(this, ${price})">X</button>
    </div>
  `; // Imposta il contenuto HTML del div
  cart.appendChild(cartItem); // Aggiunge il nuovo div al carrello

  // Aggiunge la classe per il bordo rosso alla card
  const cardElement = btn.closest('.card'); // Seleziona la card genitore del pulsante
  cardElement.classList.add('book-selected'); // Aggiunge la classe 'book-selected'

  // Aggiorna il prezzo totale
  totalPrice += price; // Aumenta il prezzo totale
  document.getElementById('totalPrice').innerText = totalPrice.toFixed(2); // Aggiorna il prezzo totale nell'elemento HTML
}

// Funzione per rimuovere un libro specifico dal carrello
function removeFromCart(button, price) {
  const cartItem = button.closest('.card'); // Seleziona l'elemento card genitore del pulsante
  const title = cartItem.querySelector('span').innerText; // Ottiene il titolo del libro
  cartItem.remove(); // Rimuove l'elemento dal carrello

  // Aggiorna il prezzo totale
  totalPrice -= price; // Diminuisce il prezzo totale
  document.getElementById('totalPrice').innerText = totalPrice.toFixed(2); // Aggiorna il prezzo totale nell'elemento HTML

  // Rimuove la classe per il bordo rosso dalla card corrispondente
  const allCards = document.querySelectorAll('.book-selected'); // Seleziona tutte le card con la classe 'book-selected'
  allCards.forEach(card => {
    const cardTitle = card.querySelector('.book-title').innerText; // Ottiene il titolo del libro nella card
    if (cardTitle === title) {
      card.classList.remove('book-selected'); // Rimuove la classe 'book-selected'
    }
  });
}

// Funzione per svuotare il carrello
function emptyCart() {
  const cart = document.getElementById('cart'); // Seleziona l'elemento con l'id 'cart'
  cart.innerHTML = ''; // Rimuove tutti gli elementi dal carrello
  totalPrice = 0; // Azzera il prezzo totale
  document.getElementById('totalPrice').innerText = totalPrice.toFixed(2); // Aggiorna il prezzo totale nell'elemento HTML

  // Rimuove la classe per il bordo rosso da tutte le card
  const allCards = document.querySelectorAll('.book-selected'); // Seleziona tutte le card con la classe 'book-selected'
  allCards.forEach(card => {
    card.classList.remove('book-selected'); // Rimuove la classe 'book-selected'
  });
}

// Aggiungi un pulsante per svuotare il carrello
const emptyCartButton = document.createElement('button'); // Crea un nuovo pulsante
emptyCartButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mt-3'); // Aggiunge le classi di Bootstrap al pulsante
emptyCartButton.textContent = 'Svuota Carrello'; // Imposta il testo del pulsante
emptyCartButton.addEventListener('click', emptyCart); // Aggiunge un event listener al pulsante per svuotare il carrello

// Aggiungi il pulsante sotto il carrello
document.getElementById('emptyCartButtonContainer').appendChild(emptyCartButton); // Aggiunge il pulsante al contenitore

//rimuovi la card con col-md-3
const removeCard = (event) => {
  // event.target.parentElement.parentElement.parentElement.parentElement.remove()
  event.target.closest(".col-md-3").remove()
}

// Carica i libri al caricamento della pagina
document.addEventListener('DOMContentLoaded', fetchBooks); // Aggiunge un event listener per caricare i libri quando la pagina è caricata
