/* =================================================================

   Sección 3: Fundamentos de JavaScript, primitivos, arreglos,
   objetos y funciones básicas

================================================================= */

/* -----------------------------------------------------------------
                     Tipos de datos primitivos
----------------------------------------------------------------- */

// - Javascript es un lenguaje debilmente tipado, es decir que nosotros no le decimos explicitamente el tipado de dato que puede tener una variable, mas bien Javascript lo infiere por nosotros, por ejemplo si en la variable existe una declaracion con comilla simple ' o doble "" Javascript lo interpretara como un tipo de dato de texto "string"

// - En la siguiente declaracion Javascript interpreta la variable "canasta" de tipo "string" debido a que "Manzana" se encuentra entre comillas simples '', aunque podria estar en comillas dobles "" tambien:

// let canasta = 'Manzana'

// - Existem 6 tipos de datos primitivos en Javascript:

// - 1. Boolean: Booleano, true/false
// - 2. Null: Sin valor en absoluto
// - 3. Undefined: Una variable declarada que aun no se le asigna valor
// - 4. Number: enteros, flotantes, etc. En Javascript todos los tipos de numeros caben en    esta categoria, por lo que puede darse el caso que al comparar un numero entero con un flotante retorne "true" por ejemplo 1 === 1.00000000000000001 // true
// - 5. String: Una cadena de caracteres, palabras, nombres, etc
// - 6. Symbol: Es un tipo de dato unico que no es igual a ningun valor

// Comentarios utiles de la clase:

// - Cuando se trata de mutabilidad o inmutabilidad de un tipo primitivo se refiere a la identidad del tipado (string, null, undefined y booleanos) con su referencia en memoria.

// Por ejemplo:

// var aString = "Esto es una cadena";
// var bString = aString;

// // ahora modificamos aString
// aString = "La cadena ha cambiado";

// console.log (aString); // La cadena ha cambiado
// console.log (bString); // Esta es una cadena
// console.log (aString === bString); //falso
// Cuando modifica una cadena, se crea una cadena completamente nueva y el nombre de la variable se asigna a su referencia de memoria. No hay forma de cambiar el estado interno de un tipo inmutable, por lo que la variable simplemente se reasigna a una nueva referencia.

// Caso diferente con los mutables, por ejemplo un objeto:

// var car = {
//     color: 'red',
//     tyres: '4'
// }

// var anotherCar = car; // aquí asignamos el valor de car a anotherCar.

// car.color = 'blue'; // modificamos un valor en el objeto original

// console.log(anotherCar.color); // esto muestra "blue" porque hace referencia a la ubicación de la memoria del objeto car.
// console.log (car === anotherCar) // true (porque la comparación es por referencia)

// 1- mutable quiere decir que se puede modificar el mismo objeto y que NO se usara otra celda de memoria  esta caracteristica la poseen los objetos, funciones y arrays.

// - aunque parezca intuitivo crear un objeto u array con const no lo hace inmutable, solo permite que esta variable no sea reasignado su valor

// - para conseguir el efecto contrario es decir crear inmutabilidad en objetos y arrays se usa la func. Object.freeze -> pero tiene algunas limitaciones. actualmente se esta trabajando en records y tupla(no confundir con typescript), funciones que mejoran la performance de freeze ya que hacen un deep freeze asi como permiten las comparaciones entre objetos entre otras cosas

// - si necesitamos trabajar con objetos y modificar sus atributos por ejemplo la mejor forma es usar el spread operator ya que crea un clon(con otro espacio de memoria) del objeto original

// 2- inmutables son aquellos datos primitivos que no se pueden modificar ya que cada vez que se crean usan un espacio de memoria, por eso en la explicacion de Jose console.log (aString === bString); //falso

/* -----------------------------------------------------------------
             Introduccion general a los tipos primitivos
----------------------------------------------------------------- */

// let nombre = 'Peter Parker'
// console.log( nombre )

// // - Con "let" no se permite reinicializar una variable, por eso lo que estamos haciendo aca es cambiar donde apunta la variable nombre
// nombre = 'Ben Parker'
// console.log( nombre )

// // - Con el operador "typeof" podemos saber el tipo de dato del valor al que apunta la variable
// console.log( typeof nombre ) // string

// nombre = 123
// console.log( typeof nombre ) // number

// let esMarvel = false
// console.log( typeof esMarvel ) // boolean

// // - A diferencia de otros lenguajes, en javascript todos los numeros son de tipo "number" independiente de si son enteros, flotantes, etc:
// let edad = 33
// console.log( typeof edad ) // number

// edad = 33.001
// console.log( typeof edad ) // number

// // - Al no inicializar la variable con ningun valor el tipo de dato que arrojara sera "undefined"
// let superPoder
// console.log( superPoder ) // undefined

// let soyNull = null
// console.log( soyNull ) // null

// // - Los simbolos permiten crear identificadores unicos, aca pareciese que "symbol1" y "symbol2" apuntasen al mismo dato, pero al declararlos con Symbol() se crean de manera automatica valores unicos
// let symbol1 = Symbol()
// let symbol2 = Symbol()

// console.log( symbol1 ) // symbol
// console.log( symbol2 ) // symbol

// console.log( symbol1 === symbol2 ) // false

/* -----------------------------------------------------------------
             Palabras reservadas y nombres de variables
----------------------------------------------------------------- */

// - Las palabras reservadas no son mas que las palabras que tienen un uso especifico para el cual fueron creadas, en Javascript existen palabras reservadas que al intentar usarlas como nombres de variables, funciones, etc, daran errores ya que fueron creadas especificamente para realizar ciertas funciones

// - Por ejemplo si intento declarar una variable con nombre "const" javascript me dara un error de sintaxis, ya que "const" es una palabra reservada que sirve para declarar variables constantes:

// let const = 123 // Uncaught SyntaxError: Unexpected token 'const'

// - https://mathiasbynens.be/notes/javascript-identifiers

// - En Javascript esta permitido usar caracteres especiales como nombres de variables, pero es una mala practica debido a que estos caracteres no siempre se encuentran disponibles y pueden variar dependiendo del lenguaje, lo cual podria limitar el alcance de usuarios y programadores que puedan manejar el programa

// var π = Math.PI
// console.log( π ) // 3.141592653589793

// var ლ_ಠ益ಠ_ლ = 42
// console.log( ლ_ಠ益ಠ_ლ ) // 42

// - Por lo mismo se creo un estandar y ciertas recomendaciones para escribir variables:

// - 1. Los nombres de las variables no deben comenzar con un numero:
// let 1variable = 123 // Uncaught SyntaxError: Invalid or unexpected token

// - 2. Los nombres de variables no pueden llevar un punto:
// let variable.vr = 123 // Uncaught SyntaxError: Unexpected token '.'

// - 3. Se recomienda el uso de CamelCase

/* -----------------------------------------------------------------
                             Arreglos
----------------------------------------------------------------- */

// - Los arreglos son un objeto muy parecido a una lista de informacion, que contiene un grupo de elementos

// - Para identificar un arreglo tenemos que fijarnos en el simbolo de corchetes [], y la posicion de la informacion empieza a contarse desde el numero 0

// - Una manera para declarar un arreglo es usando el constructor "new Array", pero no es la manera mas habitual de hacerlo:
// const arr = new Array(10)
// console.log( arr ) // (10) [vacío × 10]

// - La otra forma y la mas habitual, es declarar el arreglo de manera literla con los corchetes:
// const arr = []
// console.log( arr ) // []

// - Creando un arreglo de videojuegos de manera literal:
// let videoJuegos = ['Mario 3', 'Megaman', 'Chrono Trigger']
// console.log( videoJuegos ) // 3) ['Mario 3', 'Megaman', 'Chrono Trigger']

// // - Acceder al dato de la primera posicion del arreglo:
// console.log( videoJuegos[0] ) // Mario 3

// // - Usualmente los elementos de un arreglo son del mismo tipo de dato, pero no necesariamente:
// let arregloCosas = [
//   true,
//   123,
//   'Tulio',
//   1+2,
//   function(){},
//   () => {},
//   { a: 1},
//   ['X', 'Megaman', 'Zero', 'Dr. Light']
// ]
// console.log( arregloCosas ) // (8) [true, 123, 'Tulio', 3, ƒ, ƒ, {…}, Array(4)]

// // - Obtener el primer valor del arreglo "arregloCosas"
// console.log( arregloCosas[0] ) // true

// // - Obtener el tercer valor del arreglo "arregloCosas"
// console.log( arregloCosas[2] ) // Tulio

// // - Obtener el ultimo valor del ultimo arreglo de "arregloCosas"
// console.log( arregloCosas[7][3] ) // Dr. Light

/* -----------------------------------------------------------------
                  Mas detalles sobre los arreglos
----------------------------------------------------------------- */

// - Los arreglos poseen propiedades y metodos:

// let juegos = ['Zelda', 'Mario', 'Metroid', 'Chrono']

// - Cantidad de elementos en un arreglo con la propiedad "length"
// console.log( 'Largo del arreglo juegos: ', juegos.length ) // 4

// - Obtener el primer elemento del arreglo:
// console.log( juegos[0] ) // Zelda

// - Obtener el primer elemento del arreglo con operacion matematica, como se que el largo son 4 puedo ejecutar 2 - 2, lo cual dara 0
// console.log( juegos[ 2 - 2 ] ) // Zelda

// - Obtener el ultimo elemento del arreglo sabiendo el indice:
// console.log( juegos[3] ) // Chrono

// - Obtener el ultimo elemento del arreglo sin saber el indice, ni el largo, obtengo el largo del arreglo y le resto 1 para obtener el ultimo indice, perfecto para arreglos dinamicos:
// console.log( juegos[ juegos.length - 1 ] ) // Chrono

// - Metodo "forEach": ejecuta una instruccion por cada elemento del arreglo
// juegos.forEach( ( elemento, indice, arr ) => {
//  console.log({ elemento, indice, arr })
// })

// Output:
// {elemento: 'Zelda', indice: 0, arr: Array(4)}
// {elemento: 'Mario', indice: 1, arr: Array(4)}
// {elemento: 'Metroid', indice: 2, arr: Array(4)}
// {elemento: 'Chrono', indice: 3, arr: Array(4)}

// - Metodo Push: agrega un nuevo elemento en la ultima posicion del arreglo y devuelve el largo del arreglo
// let nuevaLongitud = juegos.push('F-zero')
// console.log( 'nuevaLongitud: ', nuevaLongitud ) // 5
// console.log({ juegos }) // (5) ['Zelda', 'Mario', 'Metroid', 'Chrono', 'F-zero']

// - Metodo Unshift: agrega un nuevo elemento en la primera posicion del arreglo y devuelve el largo del arreglo
// nuevaLongitud = juegos.unshift('Fire Emblem')
// console.log( 'nuevaLongitud: ', nuevaLongitud ) // 6
// console.log({ juegos }) // (6) ['Fire Emblem', 'Zelda', 'Mario', 'Metroid', 'Chrono', 'F-zero']

// - Metodo Pop: elimina el ultimo elemento del arreglo y lo retorna
// let juegoBorrado = juegos.pop()
// console.log({ juegoBorrado }) // F-zero
// console.log({ juegos }) // (5) ['Fire Emblem', 'Zelda', 'Mario', 'Metroid', 'Chrono']

// - Metodo Splice: el metodo Splice cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos, al eliminar elementos estos son retornados en un nuevo array, si no se elimina nada retorna un array vacio

// - Recibe 3 argumentos:
// - El primero es la posicion inicial del arreglo donde comenzara a contar para agregar/eliminar elementos
// - El segundo argumento es el numero de elementos a eliminar desde la posicion del primer argumento, si no se desea eliminar nada se debe de declarar con valor 0
// - Por ultimo el tercer argumento indica que elementos se agregaran a partir de la posicion del primer argumento

// console.log( juegos ) // (5) ['Fire Emblem', 'Zelda', 'Mario', 'Metroid', 'Chrono']
// let juegosBorrados = juegos.splice( 1, 2 )
// console.log( 'juegosBorrados: ', juegosBorrados ) // (2) ['Zelda', 'Mario']
// console.log( 'Array juegos: ', juegos ) // ['Fire Emblem', 'Metroid', 'Chrono']

// - Metodo indexOf: retorna el indice de un elemento del arreglo, si retorna -1 significa que no encontro el elemento en el arreglo
// let metroidIndex = juegos.indexOf('Metroid')
// console.log( 'metroidIndex: ', metroidIndex ) // 1

/* -----------------------------------------------------------------
                        Objectos literales
----------------------------------------------------------------- */

// - En Javascript los objetos literales son los que se crean usando directamente los corchetes {} y dentro del objeto va definido una llave y un valor:

// let personaje = {
//   nombre: 'Tulio',
//   codeName: 'Triviño',
//   vivo: false,
//   edad: 30,
//   coords: {
//     lat: 34.034,
//     lng: -118.70
//   },
//   trajes: ['Amarillo', 'Cafe', 'Gris'],
//   direccion: {
//     zip: '12340,90265',
//     ubicación: 'Titirilquen'
//   },
//   'Ultima pelicula': '31 Minutos La Pelicula'
// }

// console.log( personaje )
// console.log( 'Nombre:', personaje.nombre ) // Nombre: Tulio
// console.log( 'Nombre:', personaje['nombre'] ) // Nombre: Tulio
// console.log( 'Edad:', personaje.edad ) // Edad: 30
// console.log( 'Coords:', personaje.coords ) // Coords: {lat: 34.034, lng: -118.7}
// console.log( 'Lat:', personaje.coords.lat ) // Lat: 34.034
// console.log( 'Numero Trajes:', personaje.trajes.length ) // Numero Trajes: 3
// console.log( 'Ultimo Traje:', personaje.trajes[ personaje.trajes.length - 1 ] ) // Ultimo Traje: Gris

// const x = 'vivo'
// console.log( 'Vivo:', personaje[x] ) // Vivo: false
// console.log( 'Ultima pelicula:', personaje['Ultima pelicula'] ) // Ultima pelicula: 31 Minutos La Pelicula

/* -----------------------------------------------------------------
              Mas detalles sobre los Objectos literales
----------------------------------------------------------------- */

// - Para borrar una propiedad de un objeto, se usa el operador "delete", ejemplo, borrar la propiedad "edad" del objeto "personaje":
// delete personaje.edad
// console.log( personaje )

// - Metodo Object.entries: con este metodo convertimos el objeto en un arreglo, donde sus pares de valores "propiedad/valor" tambien son convertidos a arreglos, esto es util para poder "barrer/leer" cada elemento y obtener su valor:
// const entriesPares = Object.entries( personaje )
// console.log( entriesPares )
// Output:
// [
//   ['nombre', 'Tulio'],
//   ['codeName', 'Triviño'],
//   ['vivo', false],
//   ['coords', {lat: 34.034, lng: -118.7}],
//   ['trajes', Array(3)],
//   ['direccion', {zip: '12340,90265', ubicación: 'Titirilquen'}],
//   ['Ultima pelicula', '31 Minutos La Pelicula']
// ]

// - Para agregar una propiedad al arreglo podemos definirla de la siguiente manera:
// personaje.casado = false
// console.log( personaje )

// - Metodo Object.freeze: "Congela" de manera "superficial" un objeto evitando que puedan modificarse sus propiedades, es decir lo hace "inmutable"
// Object.freeze( personaje )

// - Al intentar agregar una propiedad en un objeto declarado con "freeze" esta no podra ser agregada:
// personaje.dinero = 100000000
// console.log( personaje )

// - Cuando se habla de "congelacion superficial", significa que el objeto "padre" no podra ser modificado, pero si los objetos "hijos":

// - Al intentar modificar una propiedad en un objeto "hijo" de un objeto "padre" "congelado" con "freeze" esta podra ser modificada, ya que "freeze" no congela los elementos "hijos":
// personaje.direccion.ubicación = 'Costa Rica'
// console.log( personaje )

// - Metodo getOwnPropertyNames: permite obtener un arreglo con todos los nombres de propiedades de un objeto
// const propiedades = Object.getOwnPropertyNames( personaje )
// console.log( propiedades )
// Output:
// (8) ['nombre', 'codeName', 'vivo', 'coords', 'trajes', 'direccion', 'Ultima pelicula', 'casado']

// - Metodo values: permite obtener un arreglo con todos los valores de las propiedades de un objeto
// const valores = Object.values( personaje )
// console.log( valores )
// Output:
// (8) ['Tulio', 'Triviño', false, {…}, Array(3), {…}, '31 Minutos La Pelicula', false]

/* -----------------------------------------------------------------
               Funciones tradicionales y de flecha
----------------------------------------------------------------- */

// - Las funciones sirven para centralizar la logica de un procedimiento para que pueda ser reutilizado varias veces

// - Funcion tradicional:
// function saludar() {
//   console.log( 'Hola Mundo' )
// }

// - Para ejecutar la funcion la "llamamos" escribiendo su nombre mas los parentesis, esto permite usar ese procedimiento en distintas partes del codigo sin tener que escribirlo cada vez que sea necesario
// saludar()

// - La manera recomendable de declarar una funcion tradicional es asignandola a una variable:
// const saludar = function () {
//   console.log( 'Hola Mundo' )
// }

// saludar()

// - Las funciones trabajan con parametros y argumentos, es decir, datos que sirven para hacer operaciones dentro de la funcion:

// - Acá declaro una funcion "saludar()" la cual recibira como parametro un nombre que usara para crear un mensaje
// const saludar = function ( nombre ) {
//   console.log( 'Hola,', nombre )
// }

// - Al invocar la funcion le envio como argumento, en este caso la palabra que espera la funcion "saludar()" como parametro
// saludar('Tulio') // Hola, Tulio

// - Las funciones tradicionales poseen un objeto similar a Array llamado "arguments", el cual se encarga de capturar todos los argumentos declarados al invocar una funcion:
// const saludar = function ( nombre ) {
//   console.log( arguments ) // Arguments(4) ['Tulio', 40, true, 'Costa Rica', callee: ƒ, Symbol(Symbol.iterator): ƒ]
// }

// - Si al invocar la funcion "saludar()" le enviamos argumentos que no estan especificados en los parametros de su definicion, para poder acceder a ellos desde dentro de la funcion se utiliza el objeto "arguments"
// saludar('Tulio', 40, true, 'Costa Rica')

// - Las funciones de flecha o lamda functions fueron introducidas en Ecmascript 6 se declaran de la siguiente manera:
// const saludarFlecha = ( nombre ) => {
//   console.log( 'Hola,', nombre )
// }

// saludarFlecha( 'Tulio')  // Hola, Tulio

// - Cuando la funcion de flecha solo necesita que se declare un argumento se pueden omitir los parentesis, de la misma manera si el procedimiento es de una sola linea se pueden omitir las llaves, ejemplo refactorizando segun estas propiedades la funcion "saludarFlecha()"
// const saludarFlecha = nombre  =>  console.log( 'Hola,', nombre )

// saludarFlecha( 'Tulio')  // Hola, Tulio

/* -----------------------------------------------------------------
                    Retorno de las funciones
----------------------------------------------------------------- */

// - Todas las funciones en Javascript retornan algo, si no tiene implicita la sentencia "return" retornara siempre "undefined"

// function sinReturn() {
//   // Esta función no tiene un retorno explícito
// }

// let resultado = sinReturn()
// console.log( resultado ) // undefined

// // - La sentencia "return" detiene la ejecucion de un programa, por lo que si existen metodos despues de esta declaracion no seran ejecutados:

// function suma(a, b) {
//   let resultado = a + b;
//   return resultado // Esta sentencia "return" detiene la ejecución de la función
//   console.log("Este mensaje no se mostrará en la consola")
// }

// let resultadoSuma = suma(3, 4)
// console.log(resultadoSuma) // 7

// // - En las funciones de flecha podemos omitir la sentencia "return" siempre y cuando el procedimiento a retornar sea de una sola linea:

// const sumarEnUnaLinea = ( a,b ) => a + b
// console.log( sumarEnUnaLinea( 2, 2) ) // 4

// // - Tarea: convertir la siguiente funcion tradicional a una funcion de flecha

// function getAleatorioTradicional() {
//   return Math.random()
// }

// console.log( getAleatorioTradicional() ) // Numero random entre 0 y 1

// // - Solucion:
// const getAleatorioFlecha = () => Math.random()

// console.log( getAleatorioFlecha() ) // Numero random entre 0 y 1

/* -----------------------------------------------------------------
                Pro tip: Funciones, argumentos
                y desestructuración de objetos
----------------------------------------------------------------- */

// - Ventajas de las funciones de flecha sobre las funciones tradicionales

// function crearTitere( nombre, apellido ) {
//   return {
//     nombre: nombre,
//     apellido: apellido
//   }
// }

// - Una de las mayores ventajas de usar funciones de flecha es que podemos reducir la funcion tradicional anterior a una sola linea:

// - Omitiendo la sentencia "return"
// - Encerrando en parentesis la expresion para poder retornarla, esto le dice a Javascript que se quiere retornar el objeto y no el cuerpo de la funcion
// - En el objeto omitiendo el nombre de la variable del valor de la propiedad si se llama igual que el nombre de la propiedad

// const crearTitere = ( nombre, apellido ) => ({ nombre, apellido })

// const titere = crearTitere( 'Tulio', 'Triviño' )

// console.log( titere ) // {nombre: 'Tulio', apellido: 'Triviño'}

// - Mostrar los argumentos de una funcion tradicional en una funcion de flecha

// function imprimeArgumentos() {
//   console.log( arguments ) // Arguments(5) [10, true, false, 'Tulio', 'Hola', callee: ƒ, Symbol(Symbol.iterator): ƒ]
// }

// imprimeArgumentos( 10, true, false, 'Tulio', 'Hola' )

// - Si intentamos acceder al objeto "arguments" en una funcion de flecha esto no sera posible, ya que las funciones de flecha no soportan ese objeto

// const imprimeArgsFlecha = () => console.log( arguments ) // Uncaught ReferenceError: arguments is not defined

// imprimeArgsFlecha( 10, true, false, 'Tulio', 'Hola' )

// - Para poder acceder a los argumentos desde una funcion de flecha, debemos emular este comportamiento usando el operador rest de tres puntos seguidos ...
// - Este operador "esparcira" en un arreglo los argumentos como parametros
// - El nombre del arreglo es indiferente, en este caso use "args" pero puede llamarse de cualquier manera
// - Se debe considerar que al usar el operador rest como parametro siempre tiene que ser el ultimo parametro, es decir, pueden haber parametros declarados antes que el, pero no despues de el

// const imprimeArgsFlecha = ( ...args ) => console.log( args ) // (5) [10, true, false, 'Tulio', 'Hola']

// imprimeArgsFlecha( 10, true, false, 'Tulio', 'Hola' )

// - Guardar el arreglo de los argumentos en una variable y desestructurarlos para trabajar con ellos en variables individuales:

// const imprimeArgsFlecha = ( edad, ...args ) => ( args )

// const [ casado, vivo, nombre, saludo ] = imprimeArgsFlecha( 10, true, false, 'Tulio', 'Hola' )

// console.log({ casado, vivo, nombre, saludo }) // {casado: true, vivo: false, nombre: 'Tulio', saludo: 'Hola'}

// - Obtener solo una propiedad de un objeto y asignarle un alias:

// const { apellido:aliasDeApellido } = crearTitere( 'Tulio', 'Triviño' )

// console.log({ aliasDeApellido })
