const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //cuando agregas un curso presionando "agragar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
       articulosCarrito = []; // reseteamos el arreglo

       limpiarHTML(); //eliminamos todo el html
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
     
}

//elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso =>curso.id !== cursoId);

        //volvemos a iterar sobre el carrito y mostramos el html
        carritoHTML();
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        parrafo: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    // console.log(infoCurso);


//revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)

if(existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; //retorna el objeto actualizado si es duplicado
        } 
        else {
            return curso; //retorna los objetos que no son duplicados
        }
    });
    articulosCarrito = [...cursos];
} else {
    //agrega elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso] ;
}

// console.log(articulosCarrito);
carritoHTML();
}

//muestra el carritos de compra en el HTML
function carritoHTML() {

    //Limpiar el HTML
        limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = (`
            <td>
                <img src="${imagen}" width="150">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>

        `)

        //agrega el HTML del carrito en el body de este
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta y bajo performance esto es porq debe borrar todo el HTML y volverlo a pintar
    //contenedorCarrito.innerHTML = '';

    //forma rapida y con mejor performance ya que solo elimina el elemento hijo que no queremos
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}