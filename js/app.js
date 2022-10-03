//Selectores
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

// Leer el elemento Resultado
const contenedor = document.querySelector("#resultado .row");


// crear los años
const years = document.createElement("option");
const max = new Date().getFullYear();
const min = max - 10;

// Datos para la busqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //muestras los autos al  cargar

  llenarSelect(); //llenar el select de años en un rango de 10  años
});

//Event Listeners para el formulario
marca.addEventListener("input", (e) => {
  datosBusqueda.marca = e.target.value;

  // Mandar llamar la función de filtrar Autos
  filtrarAuto();
});

year.addEventListener("input", (e) => {
  datosBusqueda.year = Number(e.target.value);
  // Mandar llamar la función de filtrar Autos
  filtrarAuto();
});

minimo.addEventListener("input", (e) => {
  datosBusqueda.minimo = Number(e.target.value);
  // Mandar llamar la función de filtrar Autos
  filtrarAuto();
});

maximo.addEventListener("input", (e) => {
  datosBusqueda.maximo = Number(e.target.value);
  // Mandar llamar la función de filtrar Autos
  filtrarAuto();
});

puertas.addEventListener("input", (e) => {
  datosBusqueda.puertas = Number(e.target.value);
  // Mandar llamar la función de filtrar Autos
  filtrarAuto();
});

transmision.addEventListener("input", (e) => {
  datosBusqueda.transmision = e.target.value;
  // Mandar llamar la función de filtrar Autos
  filtrarAuto();
});

color.addEventListener("input", (e) => {
  datosBusqueda.color = e.target.value;
  // Mandar llamar la función de filtrar Autos
  filtrarAuto();
});

//funciòn para mostrar los autos en la vista html desde javascript
function mostrarAutos(autos) {
  limpiarHTML();

  /*  //crear un elemento para un carrito estatico solo crea uno
  //DOM
  const fila = document.querySelector("#lista-cursos .row");

  //div para four colums
  const fourColums = document.createElement("DIV");
  fourColums.classList.add("col-md-4");

  //div card
  const carta = document.createElement("DIV");
  carta.classList.add("card");

  //elemento div padres infoCard
  const infoCard = document.createElement("DIV");
  infoCard.classList.add("card-body", "text-center");

  //imagen del automotor
  const imagenAuto = document.createElement("IMG");
  imagenAuto.src = "img/audi.png";
  imagenAuto.classList.add("imagen-curso", "card-img-top");
  imagenAuto.height = 200;

  //marca del auto
  const modeloAuto = document.createElement("h4");
  modeloAuto.textContent = "KIA";
  modeloAuto.classList.add("card-title");

  //parrafo
  const caracteristicas = document.createElement("P");
  caracteristicas.textContent =
    "modelo Serie 3, año 2021, puertas 4, color blanco, transmisión automatico";

  //imagen estrella
  const estrella = document.createElement("IMG");
  estrella.src = "img/estrellas.png";

  //parrafo para precio
  const costo = document.createElement("P");
  costo.textContent = "$800000";
  costo.classList.add("precio");

  //crear enlace con el boton
  const enlace = document.createElement("A");
  enlace.href = "#";
  enlace.textContent = "Agregar al carrito";
  enlace.classList.add(
    "btn",
    "btn-primary",
    "btn-lg",
    "w-100",
    "agregar-carrito"
  );

  //agregar hijos de infoCard
  infoCard.appendChild(modeloAuto);
  infoCard.appendChild(caracteristicas);
  infoCard.appendChild(estrella);
  infoCard.appendChild(costo);
  infoCard.appendChild(enlace);

  //agregar hijos de card
  carta.appendChild(imagenAuto);
  carta.appendChild(infoCard);

  //agregar hijos de fourColumns
  fourColums.appendChild(carta);

  //agregarlo al dom el elemento creado
  fila.appendChild(fourColums);
  console.log(fourColums); */

  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color, imagen, id } = auto;

    //crear un elemento para un carrito
    //DOM
    const fila = document.querySelector("#resultado .row");
    const elemento = document.createElement('DIV')
    elemento.classList.add('col-md-4')

    elemento.innerHTML = `
      <div class="card">
          <img src="${imagen}" class="imagen-curso card-img-top"height="200">
          <div class="card-body text-center">
            <h4 class="card-title">${marca}</h4>
            <p>modelo ${modelo}, año ${year}, puertas ${puertas}, color ${color}, transmisión ${transmision}</p>
            <img src="img/estrellas.png">
            <p class="precio">$${precio}</p>
            <a href="#" class="btn btn-primary btn-lg w-100 agregar-carrito" data-id="${id}">Agregar Al
              Carrito</a>
          </div>
      </div>
    `;

    //agregarlo al dom el elemento creado
    fila.appendChild(elemento);
  });
}

//funciòn para llenar el select dinamicamente con los años actuales. (desde el actual hasta 10 años atras)
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const option = document.createElement("OPTION");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}

function limpiarHTML() {
  // Leer el elemento Resultado
  const contenedor = document.querySelector("#resultado .row");

  // limpiar los resultados anteriores
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.appendChild(document.createTextNode("No hay Resultados"));
  document.querySelector("#resultado .row").appendChild(noResultado);
}

//función que filtra en base a la busqueda del usuario
function filtrarAuto() {
  //se hace encadenamiento de funciones
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }

  console.log(resultado);
}

//filtrar por campos especificos
function filtrarMarca(auto) {
  const { marca } = datosBusqueda;

  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;

  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
}
