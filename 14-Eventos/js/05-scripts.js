window.addEventListener("scroll" , () => {

    const premium = document.querySelector('.premium');
    const ubi = premium.getBoundingClientRect();
    // console.log(ubi)

    if(ubi.top < 784 ){
        console.log('el elemento ya esta visible')
    } else {
        console.log(' aun no da mas scroll')
    }
})
console.log("hola")