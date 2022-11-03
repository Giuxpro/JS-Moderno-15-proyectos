document.addEventListener('DOMContentLoaded', function() {
    
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    // seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputText = document.querySelector('#mensaje');
    const formulario = document.querySelector('#enviar-mail');
    const btnSubmit = document.querySelector('#enviar-mail button[type="submit"]');
    const btnReset = document.querySelector('#enviar-mail button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputText.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetForm();
    })

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            //reset formulario
            resetForm();
            //crear alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = " Mensaje enviado con exito";
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            },3000)
        }, 3000);
    }

    //funcion validadora
    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`,e.target.parentElement);
            email[e.target.name] ='';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] ='';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprobar el objeto de email
        comprobarEmail(); 
    }

    //funcion de alerta
    function mostrarAlerta(mensaje, referencia) {
        
        limpiarAlerta(referencia)

        // genera el html con la alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white', 'p-2', 'text-center','m-3');
        // console.log(error)


    //Inyectar el campo de error al formulario

    // forma # 1 <este metodo elimina todo el contenido y crea un elemenmto nuevo con el error>
    //  formulario.innerHTML = error.innerHTML;
     
     // forma # 2 
     referencia.appendChild(error);
    }

    //funcion limpiar
    function limpiarAlerta(referencia) {
         //Comprueba si ya existe una alerta
         const alerta = referencia.querySelector('.bg-red-600');
         if(alerta) {
             alerta.remove()
         }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;
    }
     
    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;      
        }
    }

    function resetForm() {
        // reset form
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});