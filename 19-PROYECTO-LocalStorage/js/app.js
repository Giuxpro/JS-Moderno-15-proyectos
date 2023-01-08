// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//event listeners
eventListener()

function eventListener(){
    formulario.addEventListener('submit', agregarTweet);
};


//Functions

function agregarTweet(e){
    e.preventDefault();

    //text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if(tweet === ""){
        mostrarError("Debes escribir algo antes de enviar");

        return;
    }
    console.log("agg")
};

//Mostrar msj de error

function mostrarError(error){
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');

    //insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(messageError);

    //elimina la alerta despues de 3 seg
    setInterval(()=> {
        contenido.removeChild(messageError)
    }, 3000);
};