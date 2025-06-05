// Variables globales
let time = new Date();
let deltaTime = 0;

// Estado del juego
let gameStarted = false;
let paused = false;
let gameOver = false;

// Velocidades y física
let sueloY = 22;
let velY = 0;
let impulso = 900;
let gravedad = 2500;
let gameVel = 1;
let velEscenario = 1280 / 3;
let score = 0;
let nivelActual = 1;
let vidas = 3;

// Estado del jugador
let patoPosX = 50;
let patoPosY = sueloY;
let saltando = false;
let agachado = false;
let patoInvencible = false;

// Obstáculos y elementos
let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;
let tiempoHastaPowerUp = 7;
let obstaculoPosY = 16;
let obstaculos = [];

// Posiciones de fondos para paralaje
let sueloX = 0;
let montanasX = 0;
let arbolesX = 0;
let nubesX = 0;

// Elementos DOM
let contenedor;
let pato;
let textoScore;
let suelo;
let gameOverScreen;
let nivelTexto;

// Efectos y sonidos
const sonidos = {
    salto: new Audio('PatoRunner/audio-pato/action_jump.mp3'),
    golpe: new Audio('PatoRunner/audio-pato/cannard.mp3'),
    punto: new Audio('audio/point.mp3'),
    gameOver: new Audio('PatoRunner/audio-pato/ocarina-of-time-73-game-over.mp3'),
    nivelUp: new Audio('PatoRunner/audio-pato/xp_old.mp3'),
    musicaFondo: new Audio('PatoRunner/audio-pato/unknown-background-music.mp3')
};

// Inicializar el juego cuando el DOM esté listo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    Init();
} else {
    document.addEventListener('DOMContentLoaded', Init);
}

function Init() {
    time = new Date();
    Start();
    Loop();
}

function Loop() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();

    if (gameStarted && !paused && !gameOver) {
        Update();
    }

    requestAnimationFrame(Loop);
}

function Start() {
    gameOverScreen = document.querySelector('.game-over');
    suelo = document.querySelector('.suelo');
    contenedor = document.querySelector('.contenedor');
    textoScore = document.querySelector('.score');
    pato = document.querySelector(".pato");
    nivelTexto = document.querySelector('.nivel-numero');

    document.querySelector('.boton-inicio').addEventListener('click', IniciarJuego);
    document.querySelector('.boton-reinicio').addEventListener('click', ReiniciarJuego);

    document.addEventListener('keydown', HandleKeyDown);
    document.addEventListener('keyup', HandleKeyUp);
    // Preparar música de fondo
    sonidos.musicaFondo.loop = true;
    sonidos.musicaFondo.volume = 0.4;

    // Ajustar volúmenes
    sonidos.salto.volume = 0.5;
    sonidos.golpe.volume = 0.5;
    sonidos.punto.volume = 0.5;
    sonidos.powerUp.volume = 0.7;
    sonidos.gameOver.volume = 0.7;
    sonidos.nivelUp.volume = 0.7;
}

function IniciarJuego() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    nivelActual = 1;
    vidas = 3;
    gameVel = 1;

    document.querySelector('.pantalla-inicio').style.display = 'none';
    document.querySelector('.game-over').style.display = 'none';

    textoScore.innerText = "0";
    nivelTexto.innerText = "1";

    // Mostrar todas las vidas
    ActualizarVidas();

    // Iniciar música si no está sonando
    if (sonidos.musicaFondo.paused) {
        sonidos.musicaFondo.play().catch(error => {
            console.log("Reproducción automática bloqueada:", error);
        });
    }

    // Limpiar obstáculos y power-ups si existen
    LimpiarElementosJuego();

    // Poner al pato corriendo
    pato.className = "pato pato-corriendo";

    // Mostrar mensaje de inicio
    MostrarMensaje("¡VAMOS!", "#4CAF50");
}

function ReiniciarJuego() {
    IniciarJuego();
}

function LimpiarElementosJuego() {
    // Eliminar todos los obstáculos
    obstaculos.forEach(obstaculo => {
        if (obstaculo.parentElement) {
            obstaculo.parentElement.removeChild(obstaculo);
        }
    });
    obstaculos = [];

    // Eliminar todos los power-ups
    Array.from(document.querySelectorAll('.power-up')).forEach(power => {
        power.parentElement.removeChild(power);
    });
    powerUps = [];
}

function Update() {
    MoverSuelo();
    MoverPato();

    DecidirCrearObstaculos();
    DecidirCrearPowerUps();

    MoverObstaculos();
    MoverPowerUps();

    DetectarColision();
}

function HandleKeyDown(ev) {
    if (ev.keyCode == 32 || ev.keyCode == 38 || ev.keyCode == 87) { // Espacio, Flecha arriba, W
        Saltar();
    } else if (ev.keyCode == 40 || ev.keyCode == 83) { // Flecha abajo, S
        Agachar();
    } else if (ev.keyCode == 80) { // P para pausar
        TogglePausa();
    }
}

function HandleKeyUp(ev) {
    if (ev.keyCode == 40 || ev.keyCode == 83) {
        Levantarse();
    }
}

function TogglePausa() {
    if (gameStarted && !gameOver) {
        paused = !paused;
        MostrarMensaje(paused ? "PAUSA" : "¡SIGUE!", paused ? "#FFC107" : "#4CAF50");
    }
}

function Saltar() {
    if (gameStarted && !gameOver && !paused) {
        if (patoPosY === sueloY) {
            saltando = true;
            velY = impulso;
            pato.classList.remove('pato-corriendo');
            pato.classList.remove('pato-agachado');
            pato.classList.add('pato-saltando');

            ReproducirSonido('salto');
            CrearParticulasSalto();
        }
    }
}

function Agachar() {
    if (gameStarted && !gameOver && !paused) {
        if (!agachado && patoPosY === sueloY) {
            agachado = true;
            pato.classList.remove('pato-corriendo');
            pato.classList.remove('pato-saltando');
            pato.classList.add('pato-agachado');
        }
    }
}

function Levantarse() {
    if (agachado) {
        agachado = false;
        pato.classList.remove('pato-agachado');
        pato.classList.add('pato-corriendo');
    }
}

function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.left = -sueloX + "px";

    // Mover capas de fondo con efecto paralaje
    nubesX += CalcularDesplazamiento() * 0.1;
    montanasX += CalcularDesplazamiento() * 0.3;
    arbolesX += CalcularDesplazamiento() * 0.5;

    document.querySelector('.nubes').style.left = -nubesX + "px";
    document.querySelector('.montanas').style.left = -montanasX + "px";
    document.querySelector('.arboles').style.left = -arbolesX + "px";

    // Si el suelo se sale de la pantalla, resetear posición
    if (sueloX > contenedor.clientWidth) {
        sueloX = 0;
    }

    if (nubesX > contenedor.clientWidth) {
        nubesX = 0;
    }

    if (montanasX > contenedor.clientWidth) {
        montanasX = 0;
    }

    if (arbolesX > contenedor.clientWidth) {
        arbolesX = 0;
    }
}

function MoverPato() {
    patoPosY += velY * deltaTime;

    // Aplicar gravedad
    if (patoPosY < sueloY) {
        velY -= gravedad * deltaTime;
    } else {
        TocarSuelo();
    }

    pato.style.bottom = patoPosY + "px";
}

function TocarSuelo() {
    patoPosY = sueloY;
    velY = 0;

    if (saltando) {
        pato.classList.remove('pato-saltando');
        pato.classList.add('pato-corriendo');
        CrearParticulasAterrizaje();
        saltando = false;
    }
}

function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;
    if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
    }
}


function CrearObstaculo() {
    const tipoObstaculo = Math.random() > 0.3 ? 'perro' : 'pajaro';
    let obstaculo;

    if (tipoObstaculo === 'perro') {
        obstaculo = document.createElement('div');
        obstaculo.className = 'perro';
        obstaculo.posY = sueloY;
    } else {
        obstaculo = document.createElement('div');
        obstaculo.className = 'pajaro';
        obstaculo.posY = sueloY + 70 + Math.random() * 50;
    }

    contenedor.appendChild(obstaculo);
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth + "px";
    obstaculo.style.bottom = obstaculo.posY + "px";

    obstaculos.push(obstaculo);
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
}


function MoverObstaculos() {
    for (let i = obstaculos.length - 1; i >= 0; i--) {
        const obstaculo = obstaculos[i];
        obstaculo.posX -= CalcularDesplazamiento();

        if (obstaculo.posX < -obstaculo.clientWidth) {
            // El obstáculo ha salido de la pantalla
            obstaculo.parentNode.removeChild(obstaculo);
            obstaculos.splice(i, 1);
            GanarPuntos();
        } else {
            obstaculo.style.left = obstaculo.posX + "px";
        }
    }
}
