let nombre = "Martino";
console.log(nombre);
let num1 = 2;
let num2 = 5;
let res = num1 + num2;
console.log("El resultado de", num1, "+", num2, "es:", res);
let esMayor = 10 > 5;
let esMenor = 5 < 2;
console.log("10 > 5 es mayor?", esMayor);
console.log("5 < 2 es menor?", esMenor);
let variable = "Carlos";
const constante = 3.14;
console.log("La variable es:", variable);
console.log("La constante es:", constante);
variable = "Jose";
console.log("La nueva variable es:", variable);
//Nos muestra por pantalla que la constante ya tiene asignado un valor

let boolean = false;
if (boolean == true) {
  console.log("El booleano es verdadero");
  console.log(typeof boolean);
} else {
  console.log("El booleano es falso");
  console.log(typeof boolean);
}

let lista = ["manzana", "naranja", "limon", "sandia", "frutilla", "melon"]; // de la posicion 0 a la 5
console.log("La fruta de la lista es:", lista[1]);

let num3 = 17;
let num4 = 3;
let resDivision = num3 % num4;
console.log("El resto de", num3, " % ", num4, "es", resDivision);

let sinValor;
console.log("Valor de la variable vacia:", sinValor);

//Calculadora

//Fin Calculadora

console.log("-- SIGUIENTES EJERCICIOS --");

//ejercicio 1
console.log("ejercicio 1");

let EsPositivo = 10;
if (EsPositivo >= 0) {
  console.log("El numero", EsPositivo, "es positivo");
} else {
  console.log("El numero", EsPositivo, "es negativo");
}

//ejercicio 2
console.log("ejercicio 2");

let diaSemana = 7;
switch (diaSemana) {
  case 1:
    console.log("El dia de la semana es lunes");
    break;
  case 2:
    console.log("El dia de la semana es martes");
    break;
  case 3:
    console.log("El dia de la semana es miercoles");
    break;
  case 4:
    console.log("El dia de la semana es jueves");
    break;
  case 5:
    console.log("El dia de la semana es viernes");
    break;
  case 6:
    console.log("El dia de la semana es sabado");
    break;
  case 7:
    console.log("El dia de la semana es domingo");
    break;
  default:
    console.log("EL dia no es valido");
}

//ejercicio 3
console.log("ejercicio 3");

console.log(" -- BUCLE FOR --");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
console.log("-- FIN BUCLE FOR --");

//ejercicio 4
console.log("ejercicio 4");

let numFactorial = 4;
let resFactorial = 1;
let j = 1;

while (j <= numFactorial) {
  resFactorial = resFactorial * j;
  j++;
}

console.log("El resultado del factorial de", numFactorial, "es:", resFactorial);

//ejercicio 5
console.log("ejercicio 5");

persona = "Carlos";
edad = 18;

if (edad >= 18) {
  console.log(persona, "tiene edad suficiente, puede votar");
} else {
  console.log(persona, "notiene edad suficiente, no puede votar");
}
//ejercicio 6
console.log("ejercicio 6");

console.log("-- BUCLE FOR PARA NUMEROS PARES -- ");
for (let i = 1; i <= 20; i++) {
  if (i % 2 == 0) {
    console.log("Es par / ", i);
  }
}
console.log("-- FIN BUCLE FOR PARA NUMEROS PARES --");

//ejercicio 7
console.log("ejercicio 7");

calificacion = "F";

switch (calificacion) {
  case "A":
    console.log("Calificacion: Muy bien");
    break;
  case "B":
    console.log("Calificacion: Bien");
    break;
  case "C":
    console.log("Califiacion: Masomenos");
    break;
  case "D":
    console.log("Calificacion: Mal");
    break;
  case "F":
    console.log("Calificacion: Muy mal");
    break;
}

//ejercicio 8
console.log("ejercicio 8");
let num5 = -4;
let num6 = 20;

if (num5 >= 0 && num6 >= 0) {
  res = num5 + num6; 
  console.log("La suma entre",num5,"+",num6,"es:",res);
} else {
  console.log("Los numeros o uno de los numeros no son positivos");
}

//ejercicio 9 
console.log("Ejercicio 9");
let m = 10;
while (m > 0) {
  console.log(m);
  m--;
}

//ejercicio 10
console.log("Ejercicio 10");
let num7 = 10;
let num8= 5;
let operador = "+"
switch (operador) {
  case "+": res = num7 + num8;
    console.log("La suma de",num7,"+",num8,"es:",res);
    break;
  case "-": res = num7 - num8;
  console.log("La resta de",num7,"-",num8,"es:",res);
}

console.log("-- SIGUIENTES EJERCICIOS --");

//ejercicio 1
console.log("ejercicio 1");

function calcularArea(base,altura) {
  let area = (base * altura)/2;
  return area;
}

area = calcularArea(5,10)
console.log("El area del triangulo es:",area);

//ejercicio 2
console.log("ejercicio 2");

const evaluarNumero = function(num) {
  if (num >= 0) {
    return console.log("El",num,"es positivo");
  } else {
    return console.log("El",num,"es negativo");
  }
}

evaluarNumero(-232); 

//ejercicio 3
console.log("ejercicio 3");

const multiplicarNum = (numA,numB) => numA * numB;
console.log("El resultado de la multiplicacion es: ",multiplicarNum(2,3));

//ejercicio 4
console.log("ejercicio 4");

const convertMayusculas = function(palabra) {
  let palabraMayus = palabra.toUpperCase();
  return palabraMayus;
}

console.log(convertMayusculas("hola mundo, soy martino")); 

//ejercicio 5
console.log("ejercicio 5");

const numMayor = function(numA,numB) {
  if (numA > numB) {
    return console.log("El",numA,"es el mayor de los numeros");
  } else if (numA < numB){
    return console.log("El",numB,"es el mayor de los numeros");
  } else {
    return console.log("Los numeros son iguales");
  }
}
numMayor(10,30);

//ejercicio 6
console.log("ejercicio 6");

const invertirCadena = function(cadena) {
  return cadena.split("").reverse().join("");
}

console.log(invertirCadena("hola mundo"));

//ejercicio 7 
console.log("ejercicio 7");

function convertToCelsious(fahrenheit) {
  celsious = (fahrenheit - 32) * 5/9;
  return celsious;
} 
let fahrenheit = 32;
console.log("Convertidor =",fahrenheit,"F° a Celsious:",convertToCelsious(fahrenheit),"°C");

//ejercicio 8
console.log("ejercicio 8");

function esPalindromo(texto) {
  let textoInvertido = texto.split("").reverse().join("");
  return texto === textoInvertido;
}
texto = "aerea"
if (esPalindromo(texto)) {
  console.log("El texto",texto,"es palindromo");
} else {
  console.log("El texto",texto,"no es palindromo");
}

//ejercicio 9 
console.log("ejercicio 9");

function sumarArreglo(arreglo) {
  suma = 0;
  for (let i = 0; i < arreglo.length;i++) {
    suma += arreglo[i];
  }
  return suma;
}

let arreglo = [0,1,2,3,4,5,6]
console.log("EL resultado de la suma de los numeros dentro del arreglo es:",sumarArreglo(arreglo));

//ejercicio 10
console.log("ejercicio 10");

