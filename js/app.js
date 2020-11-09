const ui = new UI()

//Localizamos el formulario de buscar
const campoBuscar = document.querySelector('#buscar input')

campoBuscar.addEventListener('input', (e)=>{
    e.preventDefault();
    if(campoBuscar.value.trim().length > 5) ui.obtenerSugerencias(campoBuscar.value)
    else ui.mostrarEstablecimientos()
})
document.addEventListener('DOMContentLoaded', ()=>{
    ui.mostrarEstablecimientos()
})