const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let LIST = [];
let id = 0; // Asegúrate de inicializar id correctamente

// Actualización de la fecha actual
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' });

// Función para agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) return; // Si eliminado es true, no agregar la tarea

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
        <li id="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;
    
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Función para manejar tarea realizada
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = !LIST[element.id].realizado; // Alternar el estado
}

// Función para manejar tarea eliminada
function tareaEliminada(element) {
    element.parentNode.remove(); // Eliminar el elemento
    LIST[element.id].eliminado = true; // Marcar la tarea como eliminada
}

// Evento para agregar tarea con el botón
botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;
        input.value = '';
    }
});

// Evento para agregar tarea con la tecla Enter
document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
            localStorage.setItem('TODO', JSON.stringify(LIST));
            id++;
            input.value = '';
        }
    }
});

// Evento para manejar clics en la lista de tareas
lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.dataset.data;
    
    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
});

// Cargar tareas desde localStorage
let data = localStorage.getItem('TODO');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

// Cargar lista de tareas en el HTML
function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
    });
}

// Cambiar el fondo según la hora del día
function cambiarFondoPorHora() {
    const horaActual = new Date().getHours();
    const cuerpo = document.body;

    if (horaActual >= 6 && horaActual < 12) {
        cuerpo.className = 'morning'; // Define la clase en tu CSS
    } else if (horaActual >= 12 && horaActual < 18) {
        cuerpo.className = 'afternoon'; // Define la clase en tu CSS
    } else {
        cuerpo.className = 'night'; // Define la clase en tu CSS
    }
}

// Mostrar consejo aleatorio
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

// Llamar a funciones al cargar la página
window.onload = function () {
    cambiarFondoPorHora();
    mostrarConsejo();
};
