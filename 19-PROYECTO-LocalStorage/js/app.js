// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//event listeners
eventListener()

function eventListener(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
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

    //Creamos el objeto tweets
    const tweetObj = {
        id : Date.now(),
        tweet : tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Una vez agregado vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario

    formulario.reset();

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
       messageError.remove();
    }, 3000);
};

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {

            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.innerText = 'X';
            btnEliminar.classList.add('borrar-tweet');

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            };

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el Html
            listaTweets.appendChild(li);
        });
    };

    sincronizarStorage();
};

//Agrega los tweets actuales a localStorage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
};

//Eliminar Tweeet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
};

// Limpiar HTML

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
};