const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');

const imagenFondo = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button'); //Indica todos los elementos que coinciden con el nombre específicado

const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const beepInicial = new Audio('./sonidos/beep.mp3');
const pausarSonido = new Audio('./sonidos/pause.mp3');
const inicioLoop = new Audio('./sonidos/play.wav');
const botonIniciarPausar = document.querySelector('#start-pause');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon')

const textoIniciarPausar = document.querySelector('#start-pause span');

const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurridoEnSegundos = 1500; //25 m
let idIntervalo =  null;

musica.loop = true; //Hace que la música se reproduzca constantemente

inputEnfoqueMusica.addEventListener('change', () => {musica.paused ? musica.play() : musica.pause()});

botonCorto.addEventListener('click', () => {tiempoTranscurridoEnSegundos = 300; cambiarContexto('descanso-corto'); botonCorto.classList.add('active')}); //Permite modificar elementos de la clase

botonEnfoque.addEventListener('click', () => {tiempoTranscurridoEnSegundos = 1500; cambiarContexto('enfoque'); botonEnfoque.classList.add('active')});

botonLargo.addEventListener('click', () => {tiempoTranscurridoEnSegundos = 900; cambiarContexto('descanso-largo'); botonLargo.classList.add('active')});

botonIniciarPausar.addEventListener('click', iniciarPausar);

function cambiarContexto(contexto) {
    mostrarTiempo();
    html.addEventListener('click', () => { html.setAttribute('data-contexto', contexto); /*Cambia el fondo*/ imagenFondo.setAttribute('src', `/imagenes/${contexto}.png`) }); //Cambia la imagen de fondo

    botones.forEach(function(contexto){contexto.classList.remove('active')}); //Función Anónima

    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br><strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case 'descanso-corto':
            titulo.innerHTML = `¿Que tal tomar un respiro?<strong class="app__title-strong"> !Haz una pausa corta!</strong>`
            break;
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie,<strong class="app__title-strong"> haz una pausa larga</strong>`
            botonLargo.classList.add('active');
            break;
        default:
            break;
    }

}

function iniciarPausar(){
    if(idIntervalo){
        reiniciar();
        //pausar
        pausarSonido.play();
        return;
    }
    else if(idIntervalo == null){
        inicioLoop.play();
       
    }
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

const cuentaRegresiva = () => {
if (tiempoTranscurridoEnSegundos <= 0 ) {
    reiniciar();

    beepInicial.play();
    return;
}

textoIniciarPausar.textContent = 'Pausar'; //Cambia el texto de un elemento, pero no entiende otras variaciones que se usan en el INNER HTML
iconoIniciarPausar.setAttribute('src', '/imagenes/pause.png');

tiempoTranscurridoEnSegundos -= 1; 
// console.log('Temporizador:' + tiempoTranscurridoEnSegundos);

mostrarTiempo();
}

function reiniciar(){clearInterval(idIntervalo); /* Detiene el intervalo */ textoIniciarPausar.textContent = 'Comenzar'; iconoIniciarPausar.setAttribute('src', '/imagenes/play_arrow.png'); idIntervalo = null};

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit'}); //Formato a minutos
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();

