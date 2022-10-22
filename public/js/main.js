//instanciado de pantallas
let pantallaEmpty = document.getElementById("pantallaEmpty");
let pantallaForm = document.getElementById("pantallaForm");
let pantallaLista = document.getElementById("pantallaLista");
let pantallaDetalle = document.getElementById("pantallaDetalle");
//instanciado formulario
let formulario = document.getElementById("formulario");
//instanciado ul contenedores donde van a ir los item creados por funciones
let ulLista = document.getElementById("ulLista");
let ulDetalle = document.getElementById("ulDetalle");
//declaracion en scope global del contador para la condicion empty state o lista
let contador = 0;

//array para localStorage
let listadoStorage = [];

//instanciado de botones
let botonAdd = document.getElementById("botonAdd");
let btnCerrarForm = document.getElementById("btnCerrarForm");
let btnGuardar = document.getElementById("btnGuardar");
let cerrarDetalle = document.getElementById("cerrarDetalle");
//fab btn para llamar al formulario
botonAdd.addEventListener("click", () => {
    pantallaEmpty.classList.add("sectionOff");
    pantallaForm.classList.remove("sectionOff");
    botonAdd.classList.add("sectionOff");
});
//funcion con condicional para ir al empty state o a la lista
let cerrarForm = () => {
    pantallaForm.classList.add("sectionOff");
    if (contador <= 0) {
        pantallaEmpty.classList.remove("sectionOff");
        botonAdd.classList.remove("sectionOff");
    } else {
        pantallaLista.classList.remove("sectionOff");
        botonAdd.classList.remove("sectionOff");

    }
};

//btn para cerrar formulario con la funcion condicionada 
btnCerrarForm.addEventListener("click", cerrarForm);

//boton para cerrar el detalle

cerrarDetalle.addEventListener("click", () => { 
    pantallaDetalle.classList.add("sectionOff");
    pantallaLista.classList.remove("sectionOff");
    botonAdd.classList.remove("sectionOff");
});
//funcion para crear item en pantalla detalle
const verDetalles = (titulo, categoria, detalle) => { 
    pantallaLista.classList.add("sectionOff")
    pantallaDetalle.classList.remove("sectionOff")
    let item = `<li class="liDetalle">
                    <div class="modeloDetalle">
                        <img
                            src="assets/img/${categoria}"
                            alt=""
                            class="imgDetalle"
                        />
                        <h2 class="h2Modelo">${titulo}</h2>
                        <p>${detalle}</p>
                    </div>
                </li>`;
    botonAdd.classList.add("sectionOff")
    ulDetalle.innerHTML = item;
};

//funcion para crear item en pantalla lista
const addItem = (titulo, categoria, detalle) => {
    let modelo = `<li class="liLista">
                    
                        <img
                            src="assets/img/${categoria}"
                            alt=""
                            class="imgLista"
                        />
                        <h2 class="h2Modelo">${titulo}</h2>
                        <button class="btnDetalle" onclick="verDetalles('${titulo}', '${categoria}', '${detalle}')">></button>
                    
                </li>`;
    ulLista.innerHTML += modelo;
        listadoStorage.push(modelo);
        localStorage.setItem("listaCompras", listadoStorage);
};

//evento del formulario para capturar los value de los productos ingresados por el usuario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let titulo = e.target.tituloProducto.value;
    let categoria = e.target.categoriaProducto.value;
    let detalle = e.target.detalleProducto.value;

    pantallaForm.classList.add("sectionOff");
    pantallaLista.classList.remove("sectionOff");

    addItem(titulo, categoria, detalle)
    contador++;
    botonAdd.classList.remove("sectionOff");
    formulario.reset();
});

//version desktop tuve que cambiar la logica del formulario y utilizar un boton por fuera del mismo
let btnGuardarDesktop = document.getElementById("btnGuardarDesktop");

//instanciado input, select y textarea del formulario
let tituloProducto = document.getElementById("tituloProducto");
let categoriaProducto = document.getElementById("categoriaProducto");
let detalleProducto = document.getElementById("detalleProducto");

let desdeStorage = localStorage.getItem("listaCompras");
if (desdeStorage) {
    pantallaEmpty.classList.add("sectionOff");
    pantallaLista.classList.remove("sectionOff"); //
    ulLista.innerHTML += desdeStorage;;

}
//funcion para capturar values
const saveValues = () => { 
    
    let titulo = tituloProducto.value;
    let categoria = categoriaProducto.value;
    let detalle = detalleProducto.value;
    if (titulo == '' || categoria == '') { 
        alert('Completa todos los campos por favor')
    } else {
        pantallaEmpty.classList.add("sectionOff");
        pantallaLista.classList.remove("sectionOff");
        let modelo = `<li class="liLista">
                        <img
                            src="assets/img/${categoria}"
                            alt=""
                            class="imgLista"
                        />
                        <h2 class="h2Modelo">${titulo}</h2>
                        <button class="btnDetalle" onclick="verDetalles('${titulo}', '${categoria}', '${detalle}')">></button>
                </li>`;
        ulLista.innerHTML += modelo;
        formulario.reset();
            
    }


};

//evento para enviar datos a la lista
btnGuardarDesktop.addEventListener("click", saveValues);