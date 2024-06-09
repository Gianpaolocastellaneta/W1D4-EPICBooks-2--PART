window.onload = () => {
  // Funzione anonima eseguita quando la pagina è completamente caricata
  const params = new URLSearchParams(location.search)
  // Crea un oggetto URLSearchParams per ottenere i parametri dalla URL
  const id = params.get("id")
  // Estrae il valore del parametro 'id' dalla URL
  fetch("https://striveschool-api.herokuapp.com/books/" + id)
    // Esegue una richiesta HTTP GET all'API per ottenere i dati del libro con l'ID specificato
    .then((res) => res.json())
    // Converte la risposta della richiesta in formato JSON
    .then((book) => {
        // Funzione anonima eseguita quando i dati del libro sono stati ricevuti
        const h2 = document.querySelector("h2")
        // Seleziona il primo elemento <h2> nella pagina
        h2.innerText = book.title
        // Imposta il testo del <h2> con il titolo del libro
        const container = document.querySelector(".album .container")
        // Seleziona il primo elemento con la classe 'container' all'interno di un elemento con la classe 'album'
        container.innerHTML =`
        <div class="card mb-3 w-100 bg-gray" >
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="${book.img}" class="card-image" alt="${book.title}_${book.asin}">
                    <!-- Crea un elemento <img> con l'immagine del libro, impostando l'attributo src e alt -->
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <!-- Crea un elemento <h5> con il titolo del libro -->
                      <div class="btn btn-primary rounded-pill ">${book.price}</div>
                      <!-- Crea un pulsante con il prezzo del libro -->
                      <div class="btn btn-danger rounded-pill ">${book.category.toUpperCase()}</div>
                      <!-- Crea un pulsante con la categoria del libro, convertita in maiuscolo -->
                    </div>
                  </div>
                </div>
              </div>`
              // Inserisce l'HTML costruito nel contenitore selezionato
    })
    // Chiude la funzione anonima eseguita quando i dati del libro sono stati ricevuti
}
// Chiude la funzione anonima eseguita quando la pagina è completamente caricata
