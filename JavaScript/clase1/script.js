//alert("ERROR 404\n\nPage not found!");
let saludo = "Hola, bienvenido a mi página web";

console.log(saludo);
let nombre = "Martino";
const edad = 21;
console.log(nombre, edad);

//tipos de datos
let numero = 42;
let texto = "Hola mundo";
let booleano = true;
let arreglo = [1, 2, 3, 4, 5];
let objeto = { nombre: "Martino", edad: 21 };

console.log("Tipos de datos");
console.log("Numero:", numero);
console.log("Texto:", texto);
console.log("Booleano", booleano);
console.log("Arreglo", arreglo);
console.log("Objeto", objeto);

//Operadores
let suma = 5 + 5;
let resta = 10 - 5;
let multiplicacion = 5 * 5;
let division = 10 / 2;
let modulo = 10 % 3;

console.log("Operadores");

console.log("Suma:" + suma);
console.log("Resta: " + resta);
console.log("Multiplicación: " + multiplicacion);
console.log("Division: " + division);
console.log("Modulo: " + modulo);

//Operadores de comparacion

let mayorQue = 5 > 3;
let menorQue = 5 < 3;
let igualQue = 5 == 5;
let diferenteQue = 5 != 3;
let mayorIgualQue = 5 >= 3;
let menorIgualQue = 5 <= 3;
console.log("Operadores de comparación");
console.log("Mayor que: " + mayorQue);
console.log("Menor que: " + menorQue);
console.log("Igual que: " + igualQue);
console.log("Diferente que: " + diferenteQue);
console.log("Mayor igual que: " + mayorIgualQue);
console.log("Menor igual que: " + menorIgualQue);

//Condicionales
let esVerdadero = true && true; //res falso
let esFalso = false || false; //res verdadero
let noEsVerdadero = !true; //res falso
console.log("Condicionales");
console.log("Es verdadero: " + esVerdadero);
console.log("Es falso: " + esFalso);
console.log("No es verdadero: " + noEsVerdadero);

//Actividad practica. Crea tu primer Script

let num1 = 10;
let num2 = 20;

esMayor = num1 > num2;
esIgual = num1 == num2;
console.log("Ejercicio");
console.log("El numero 1 es mayor que el numero 2?",esMayor);
console.log("El numero 1 es igual al numero 2?",esIgual);

console.log("-- Ejercicio con if --");
if (esMayor) {
    console.log("EL numero 1 es mayor que el numero 2");
} else {
    console.log("El numero 2 es mayor que el numero 1");
}

if (esIgual) {
    console.log("Los numeros son iguales");
} else {
    console.log("Los numeros son diferentes");
}
