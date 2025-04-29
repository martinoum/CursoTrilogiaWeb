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
let EsPositivo = -1;
if (EsPositivo >= 0) {
  console.log("El numero", EsPositivo, "es positivo");
} else {
  console.log("El numero", EsPositivo, "es negativo");
}

let diaSemana = 2;
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

console.log(" -- BUCLE FOR --");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
console.log("-- FIN BUCLE FOR --");

let numFactorial = 4;
let resFactorial = 1;
let j = 1;

while (j <= numFactorial) {
  resFactorial = resFactorial * j;
  j++;
}

console.log("El resultado del factorial de", numFactorial, "es:", resFactorial);

persona = "Carlos";
edad = 18;

if (edad >= 18) {
  console.log(persona, "tiene edad suficiente, puede votar");
} else {
  console.log(persona, "notiene edad suficiente, no puede votar");
}

console.log("-- BUCLE FOR PARA NUMEROS PARES -- ");
for (let i = 1; i <= 20; i++) {
  if (i % 2 == 0) {
    console.log("Es par / ", i);
  }
}
console.log("-- FIN BUCLE FOR PARA NUMEROS PARES --");

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
