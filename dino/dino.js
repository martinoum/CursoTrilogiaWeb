var time = new Date(); //se declara una variable global llamada time y se le asigna la fecha y hora actual
var deltaTime = 0; //Variable que almacenara el tiempo (en seg) que ha pasado entre un frame y otro

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    Init();
} else {
    document.addEventListener('DOMContentLoaded', Init);
}

function Init() {
    time = new Date(); //Se actualiza al tiempo actual
    Start(); //Llama a la funcion para la inicializacion del juego
    Loop(); //Inicia el bucle principal
}

//Bucle de animacion, se ejecuta en cada 'frame' (60 veces por segundo)
function Loop() {
    deltaTime = (new Date() - time) / 1000; //Calcula el tiempo transcurrido desde el frame anterior (segundos)
    time = new Date(); //Se actualiza el time para la siguiente medicion
    Update(); //Logica del juego
    requestAnimationFrame(Loop); //Repite en el siguiente frame
}

var sueloY = 15; //Altura del suelo donde el pato se apoya
var velY = 0; //Velocidad vertical
var impulso = 900; //Velocidad inicial al saltar
var gravedad = 2500; //Aceleracion descendente

var patoPosX = 42;
var patoPosY = sueloY;

var sueloX = 0;
var velEscenario = 1280 / 3;  //velocidad a la que se mueve el fondo
var gameVel = 1; //Factor de velocidad general
var score = 0;

var parado = false; //bandera para detener el juego
var saltando = false; //bandera para saber si el dino esta en el aire
var agachado = false;

var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 1.5;
var tiempoObstaculoMax = 3;
var obstaculoPosY = 16;
var obstaculos = [];

//Elementos del DOM
var contenedor;
var pato;
var textoScore;
var suelo;
var gameOverText;

function Start() {
    gameOverText = document.querySelector('.game-over');
    suelo = document.querySelector('.suelo');
    contenedor = document.querySelector('.contenedor');
    textoScore = document.querySelector('.score');
    pato = document.querySelector(".pato")
    document.addEventListener('keydown', HandleKeyDown);
    document.addEventListener('keyup', HandleKeyUp)
}

function HandleKeyUp(ev) {
    if (ev.keyCode == 40 || ev.keyCode == 83) {
        Levantarse();
    }
}

function HandleKeyDown(ev) {
    if (ev.keyCode == 32) { //Tecla 'espacio'
        Saltar();
    } else if (ev.keyCode == 40 || ev.keyCode == 83) {
        Agachar();
    }
}


function Saltar() {
    if(parado) return;
    if (patoPosY === sueloY) { //solo salta si esta en el suelo
        saltando = true;
        velY = impulso; //aplica impulso para arriba
        pato.classList.remove('pato-corriendo'); //Quita la clase de animacion
        pato.classList.add('pato-saltando');
    }
}

function Levantarse() {
    if (parado) return;
    if (agachado) {
        agachado = false;
        pato.classList.remove('pato-agachado');
        pato.classList.add('pato-corriendo');
    }
}

function Agachar() {
    if(parado) return;
    if (!agachado && patoPosY === sueloY) {
        agachado = true;
        pato.classList.remove('pato-corriendo');
        pato.classList.add('pato-agachado');
    }
}

function Update() {

    if (parado) return;
    MoverSuelo();
    MoverPato();
    DecidirCrearObstaculos();
    MoverObstaculos();
    DetectarColision();
    velY -= gravedad * deltaTime; //aceleracion vertical descendente
}

function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;
    if (tiempoHastaObstaculo <= 0) {
        const cantidad = Math.floor(Math.random() * 1) + 1; // de 1 a 3 enemigos

        for (let i = 0; i < cantidad; i++) {
            const tipo = Math.random() < 0.5 ? 'perro' : 'pajaro';
            setTimeout(() => {
                if (tipo === 'perro') {
                    CrearObstaculoConOffset(i);
                } else {
                    CrearPajaroConOffset(i);
                }
            }, i * 300); // separa los enemigos entre sí
        }

        // Reiniciar el temporizador para el próximo grupo
        tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
    }
}

function CrearObstaculoConOffset(i) {
    var obstaculo = document.createElement('div');
    obstaculo.classList.add('perro');
    obstaculo.posX = contenedor.clientWidth + i * 40; // cada uno un poco más a la derecha
    obstaculo.style.left = obstaculo.posX + 'px';
    obstaculo.style.bottom = sueloY + 'px';
    contenedor.appendChild(obstaculo);
    obstaculos.push(obstaculo);
}

function CrearPajaroConOffset(i) {
    var pajaro = document.createElement('div');
    pajaro.classList.add('pajaro');
    pajaro.posX = contenedor.clientWidth + i * 40; // también offset
    pajaro.style.left = pajaro.posX + 'px';
    pajaro.style.bottom = (60 + Math.random() * 9) + 'px';  // altura entre 42 y 51 px
    pajaro.dataset.tipo = 'pajaro';
    contenedor.appendChild(pajaro);
    obstaculos.push(pajaro);
}

function DetectarColision() {
    for (var i = 0; i < obstaculos.length; i++) {
        if (obstaculos[i].posX > patoPosX + pato.clientWidth) {
            break;
        } else {
            if (IsCollision(pato, obstaculos[i], 10, 10, 10, 10)) {
                gameOver();
            }
        }
    }
}

function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}

function gameOver() {
    Estrellarse();
    gameOverText.style.display = "block";
}

function Estrellarse() {
    pato.classList.remove('pato-corriendo','pato-saltando','pato-agachado');
    pato.classList.add('pato-muerto');
    parado = true;

}

function CrearPajaros() {
    var pajaro = document.createElement('div');
    pajaro.classList.add('pajaro');
    contenedor.appendChild(pajaro);
    pajaro.posX = contenedor.clientWidth;
    pajaro.style.left = pajaro.posX + 'px';

    pajaro.style.bottom = (80 + Math.random() * 80) + 'px';
    pajaro.dataset.tipo = 'pajaro'
    obstaculos.push(pajaro);
}

function CrearObstaculos() {
    var obstaculo = document.createElement('div');
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add('perro');
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth + 'px';
    obstaculos.push(obstaculo);
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
}

function MoverObstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) {
        if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]);
            obstaculos.splice(i, 1);
            GanarPuntos();
        } else {
            obstaculos[i].posX -= CalcularDesplazamiento();
            obstaculos[i].style.left = obstaculos[i].posX + 'px';
        }
    }
}

function GanarPuntos() {
    score++;
    textoScore.innerText = score;
}

function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.backgroundPositionX = -(sueloX) + 'px';
}

function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

function MoverPato() {
    patoPosY += velY * deltaTime;
    if (patoPosY < sueloY) {
        TocarSuelo();
    }
    pato.style.bottom = patoPosY + 'px';
}

function TocarSuelo() {
    patoPosY = sueloY;
    velY = 0;
    if (saltando) {
        pato.classList.add('pato-corriendo');
    }
    saltando = false;
}