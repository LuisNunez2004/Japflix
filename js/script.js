async function obtenerDatos() { 
  const response = await fetch('https://japceibal.github.io/japflix_api/movies-data.json');
  const data = await response.json();
  return data;
}

function mostrarLista(pelis) {
    document.getElementById("lista").innerHTML = " ";
    let contador = 0;
    pelis.forEach(peli => {
        contador += 1;
        let estrellas = parseInt(peli.vote_average * 5/10);
        let estrellasStr = "";
        for (let i = 0; i < 5; i++) {
            if (i < estrellas) {
                estrellasStr += `<span class="fa fa-star checked"></span>`
            }else {
                estrellasStr += `<span class="fa fa-star"></span>`
            }
        }
       document.getElementById("lista").innerHTML += `<div class="list-item-container" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${contador}" aria-controls="offcanvasTop">
            <div class="item-text">
            <p class="item-title">${peli.title}</p>
            <p class="item-tagline">${peli.tagline}</p>
            </div>
            <div class="item-vote">
            ${estrellasStr}
            </div>
        </div>`; 
        });
}

function generarCanva(pelis) {
    document.getElementById("offcanvas").innerHTML = "";
    let contador = 0;
    pelis.forEach(peli => {
        let genres = "  ";
        for (let i = 0; i < peli.genres.length; i++) {
            if (i < peli.genres.length - 1) {
                genres += `${peli.genres[i].name} - `;
            } else {
                genres += `${peli.genres[i].name}`;
            }
        }
        contador += 1;
        document.getElementById("offcanvas").innerHTML += `<div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${contador}" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">${peli.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                ${peli.overview}
            </div>
            <hr>
            <div class="offcanvas-footer">
            <p>${genres}</p>
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#"><p>Year: </p> <p>${peli.release_date.slice(0, 4)}</p></a></li>
                <li><a class="dropdown-item" href="#"><p>Runtime: </p> <p>${peli.runtime}</p></a></li>
                <li><a class="dropdown-item" href="#"><p>Budget: <p/> <p>$${peli.budget}</p></a></li>
                <li><a class="dropdown-item" href="#"><p>Revenue: </p> <p>$${peli.revenue}</p></a></li>
            </ul>
            </div>
            </div>`; 
        });
}

document.getElementById('btnBuscar').addEventListener('click', async function() {
  const busqueda = document.getElementById('inputBuscar').value.toLowerCase();
  const pelis = await obtenerDatos();
  let pelisF = [];

  if (busqueda) {
    
    for (let peli of pelis) {
        let genres = ""
        for (let genre of peli.genres) {
            genres += genre.name
        }
        if (peli.title.toLowerCase().includes(busqueda) || peli.overview.toLowerCase().includes(busqueda) || peli.tagline.toLowerCase().includes(busqueda) || genres.toLowerCase().includes(busqueda)) {
            pelisF.push(peli);
        }
    }
    
    
  }
  generarCanva(pelisF);
  mostrarLista(pelisF);
});
