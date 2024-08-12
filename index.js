const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-ES',{weekday: 'long', month: 'short', day:'numeric'})







// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Si
   // console.log(LIST)
   // console.log(LIST[element.id])
   // console.log(LIST[element.id].realizado)
}

function tareaEliminada(element){
   // console.log(element.parentNode)
   // console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}





// crear un evento para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = ''
        id++
        console.log(LIST)
        }
    }
    
})


lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})




let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}

// Hora
function cambiarFondoPorHora() {
    const horaActual = new Date().getHours();
    const cuerpo = document.body;

    if (horaActual >= 6 && horaActual < 12) {
        cuerpo.className = '000';
    } else if (horaActual >= 12 && horaActual < 18) {
        cuerpo.className = '000';
    } else {
        cuerpo.className = '000';
    }
}

// Consejos
const consejos = [
    "Planta tus cultivos en la primavera y el verano para maximizar las ganancias.",
    "No te olvides de regar tus cultivos diariamente, a menos que tengas aspersores.",
    "Visita la playa en un día lluvioso para encontrar objetos raros.",
    "Cava en las minas para encontrar minerales valiosos y geodas.",
    "Asegúrate de construir silos antes de cortar hierba, para almacenar heno.",
    "Habla con los aldeanos diariamente para mejorar tus relaciones con ellos.",
    "Usa abono de calidad para aumentar las posibilidades de obtener cultivos de mejor calidad.",
    "Guarda materiales como madera y piedra; los necesitarás para futuras construcciones.",
    "Revisa el calendario en Pierre's para no olvidar eventos importantes."
];

function mostrarConsejo() {
    const indiceAleatorio = Math.floor(Math.random() * consejos.length);
    const consejoSeleccionado = consejos[indiceAleatorio];
    document.getElementById('consejo').innerText = consejoSeleccionado;
}

// Llamada a funciones al cargar la página
window.onload = function() {
    cambiarFondoPorHora();
    mostrarConsejo();
};