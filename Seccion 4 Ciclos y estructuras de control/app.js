/* =================================================================

   Sección 4: Ciclos y estructuras de control

   En esta sección tocaremos los siguientes temas:

   - Estructuras de control de flujo
   - Paso de variables por valor y por referencia
   - Romper referencia de objetos
   - If y Else
   - Un poco sobre lógica booleana
   - Operadores y operadores de asignación
   - Operador condicional ternario
   - Diferentes usos del operador condicional ternario
   - Switch
   - While
   - Do While
   - For
   - For in
   - For of

================================================================= */

/* -----------------------------------------------------------------
              Valor, referencia y romper la referencia
----------------------------------------------------------------- */

// - En Javascript todos los datos de tipo primitivo se pasan por valor, esto quiere decir que si yo asigno un valor de tipo primitivo a una variable, luego podre asignar el valor de esa variable a otra variable sin que sea afectado el valor de la primera variable:

// - Asigno un valor de tipo primitivo a una variable llamada "a"
// let a = 10

// - Luego asigno el valor de la variable "a" a una variable "b", esto quiere decir que el valor de "a" se pasa por valor a la variable "b"
// let b = a

// - Como he pasado el valor de "a" que es 10 a "b", ahora ambas variables poseen el valor de 10
// console.log({ a, b }) // {a: 10, b: 10}

// - Puedo sobreescribir el valor de estas variables asignando nuevos valores de tipo primitivo
// a = 30

// - Ahora "a" vale 30 y "b" vale 10
// console.log({ a, b }) // {a: 30, b: 10}

// - En Javascript todos los datos de tipo objeto son pasados por referencia, esto quiere decir que a diferencia de los tipos primitivos los valores no pueden ser mutados:

// - Creo una variable de nombre "juan" la cual contendra un objeto con la propiedad "nombre" de valor "juan" y le asigno esta variable a otra llamada "ana"

// let juan = { nombre: 'Juan' }
// let ana = juan

// - Como es de esperarse el valor del objeto en la variable juan se ha "pasado" al de la variable "ana"
// console.log({ juan, ana });

// {
//    "juan": {
//        "nombre": "Juan"
//    },
//    "ana": {
//        "nombre": "Juan"
//    }
// }

// - Pero al intentar cambiar el valor de la propiedad "nombre" en la variable "ana" tambien se cambia el valor de la propiedad "nombre" en la variable "juan" y este es un comportamiento que no se esperaria, ya que uno asumiria que al pasar el valor de la variable "juan" a "ana" se crearia una copia, pero como el valor de la variable "juan" es un objeto, su valor es pasado por referencia, es decir, que al pasar un objeto como valor, desde una variable a otra, solo se esta pasando la referencia en memoria a la posicion de ese objeto y no se esta creando una copia del objeto:

// ana.nombre = 'Ana'
// console.log({ juan, ana });

// {
//    "juan": {
//        "nombre": "Ana"
//    },
//    "ana": {
//        "nombre": "Ana"
//    }
// }

// - Este comportamiento tambien se puede ver al querer pasar un objeto como argumento de una funcion, uno en este caso esperaria que tanto la variable "peter", como la variable "tony" tuviesen valores distintos en su propiedad "nombre", pero como los objetos son pasados por referencia, al querer cambiar el valor de una propiedad de un objeto se termina cambiando el valor de la propiedad del objeto que fue pasado como argumento

// const cambiarNombre = ( persona ) => {
//    persona.nombre = 'Tony'
//    return persona
// }

// let peter = { nombre: 'Peter' }
// let tony = cambiarNombre( peter )

// console.log({ peter, tony })

// {
//    "peter": {
//        "nombre": "Tony"
//    },
//    "tony": {
//        "nombre": "Tony"
//    }
// }

// - Para poder crear una copia de un objeto sin que afecte la referencia existen muchas maneras, pero la mas optima es usar el operador SPREAD (...), al usar este operador se "rompe" la referencia del objeto del cual se requiere crear una copia, pudiendo eventualmente modificar los valores de sus propiedades sin afectar el objeto original:

// - Creo el objeto original
// let juan = { nombre: 'Juan' }

// - Le paso el valor del objeto de la variable "juan" a la variable "ana" usando el operador SPREAD rompiendo asi la referencia al objeto original
// let ana = { ...juan }

// - Al cambiar el valor de la propiedad "nombre" del objeto de la variable "ana" no afectamos el valor de la propiedad "nombre" del objeto original, en este caso "juan"
// ana.nombre = 'Ana'

// - Por lo tanto al hacer un console log de ambas variables obtenemos objetos en distintos espacios de memoria
// console.log({ juan, ana })

// {
//    "juan": {
//        "nombre": "Juan"
//    },
//    "ana": {
//        "nombre": "Ana"
//    }
// }

// - Entonces si queremos usar un objeto base como argumento de una funcion para crear una copia modificable de ese objeto usamos el operador SPREAD:

// const cambiarNombre = ({ ...persona }) => {
//    persona.nombre = 'Tony'
//    return persona
// }

// let peter = { nombre: 'Peter' }
// let tony = cambiarNombre( peter )

// console.log({ peter, tony })

// {
//    "peter": {
//        "nombre": "Peter"
//    },
//    "tony": {
//        "nombre": "Tony"
//    }
// }

// - Como los arrays en el fondo son un tipo de objeto similiar a una lista, el comportamiento que poseen al ser pasados desde una variable a otra tambien es que se pasa la referencia en memoria y no su valor:

// - Creo un arreglo de frutas:
// const frutas = ['Manzana', 'Pera', 'Piña']

// - Asigno el contenido de la variable "frutas" que posee un arreglo a otra variable llamada "otrasFrutas", pero como el contenido de la variable "frutas" es un arreglo, osea un objeto, no se asigna su valor, si no su referencia
// const otrasFrutas = frutas

// - Entonces al agregar un elemento al final del array "otrasFrutas", osea modificar el arreglo, se modificara tambien el valor del arreglo "frutas"
// otrasFrutas.push('Mango')

// console.log({ frutas, otrasFrutas })

// {
//    "frutas": [ "Manzana", "Pera", "Piña", "Mango"],
//    "otrasFrutas": [ "Manzana", "Pera", "Piña", "Mango"]
// }

// - Y nuevamente para poder romper la referencia al querer asignar un objeto desde una variable a otra, creando un nuevo objeto, usaremos el operador SPREAD (...) para realizar la asignacion:

// const frutas = ['Manzana', 'Pera', 'Piña']

// const otrasFrutas = [ ...frutas ]

// otrasFrutas.push('Mango')

// console.log({ frutas, otrasFrutas })

// {
//    "frutas": ["Manzana","Pera","Piña"],
//    "otrasFrutas": ["Manzana","Pera","Piña","Mango"]
// }

// - Otra forma de asignar/copiar un arreglo desde una variable a otra rompiendo su referencia es utilizar el metodo "slice" sin argumentos, al usarlo sin argumentos se copia todo el contenido de un arreglo, usando argumentos se copia solo una parte del arreglo determinada por los argumentos:

// const frutas = ['Manzana', 'Pera', 'Piña']

// const otrasFrutas = frutas.slice()

// otrasFrutas.push('Mango')

// console.log({ frutas, otrasFrutas })

// {
//    "frutas": ["Manzana","Pera","Piña"],
//    "otrasFrutas": ["Manzana","Pera","Piña","Mango"]
// }

/* -----------------------------------------------------------------
               Laboratorio: Alternativa al if - else
----------------------------------------------------------------- */

// - Con la estructura de control "If - Else" podemos crear distintos casos para que el codigo se ejecute de distintas maneras dependiendo de las condiciones definidas, el problema de esto, es que si tenemos demasiados casos el codigo podria crecer demasiado de manera innecesaria, para resolver este problema existen algunos casos donde podemos optimizar el codigo usando objetos y/o arreglos

// Definir un procedemiento que imprima los dias de la semana con "If - Else":

// const dia = 100;

// if ( dia === 0 ) {
//    console.log('Domingo')
// } else if ( dia === 1 ) {
//    console.log('Lunes')
// } else if ( dia === 3 ) {
//    console.log('Martes')
// } else if ( dia === 4 ) {
//    console.log('Miércoles')
// } else if ( dia === 5 ) {
//    console.log('Jueves')
// } else if ( dia === 6 ) {
//    console.log('Viernes')
// } else {
//    console.log('Día no definido')
// }

// Definir un procedemiento que imprima los dias de la semana usando un objeto:

// let semana = {
//    0: 'Domingo',
//    1: 'Lunes',
//    2: 'Martes',
//    3: 'Miércoles',
//    4: 'Jueves',
//    5: 'Viernes',
//    6: 'Sábado',
// }

// console.log( semana[5] || 'Día no definido' );

// Definir un procedemiento que imprima los dias de la semana usando un arreglo:

// let semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// console.log( semana[0] || 'Día no definido' );

/* -----------------------------------------------------------------
                          Logica booleana
----------------------------------------------------------------- */

// - En Javascript existen los valores de tipo booleano, es decir 'true' o 'false', 'true' significa en numeros 1 y 'false' significa en numeros 0. Ademas existen operadores que sirven para invertir su valor (negacion) o realizar comparaciones

// - Funciones que regresan un valor 'true' o 'false'

// const regresaTrue = () => {
//    console.log('Regresa true')
//    return true
// }

// const regresaFalse = () => {
//    console.log('Regresa false')
//    return false
// }

// - Valores booleanos
// console.warn( 'Valores booleanos' )
// console.log( 'Valor booleano TRUE:', true ) // true
// console.log( 'Valor booleano FALSE:', false ) // false

// - Operador de negacion NOT
// console.warn( 'Operador de negacion NOT, invierte el valor' )
// console.log( 'Valor booleano TRUE usando el operador NOT !true:', !true ) // false
// console.log( 'Valor booleano FALSE usando el operador NOT !false:', !false ) // true
// console.log( 'Usando el operador NOT en una funcion que deberia retornar TRUE, !regresaTrue():', !regresaTrue() ) //false

// - Operador de comparacion AND
// console.warn( 'Operador de comparacion AND (&&), devuelve TRUE si todos los valores son verdaderos' )
// console.log( 'true && true:', true && true ) // true
// console.log( 'true && false:', true && false ) // false
// console.log( 'true && !false:', true && !false ) // true

// console.log('==============================')

// - Podemos usar el operador AND para hacer una evaluacion sobre el resultado de una funcion y si el primer resultado es 'false' no ejecutara lo demas, ademas aclarar que si la funcion no tiene implicitamente un return booleano, osea "return false o return true" se considerara como return false el retorno de esa funcion

// console.log( regresaFalse() && regresaTrue() )

// Regresa false
// false // Aqui retorna false por que: 'regresaTrue() && regresaFalse()' true && false === false

// - Si lo hacemos al reves, osea que el primer resultado de 'true' si ejecutara lo demas:
// console.log( regresaTrue() && regresaFalse() )

// Regresa true
// Regresa false
// false // Aqui retorna false por que: 'regresaTrue() && regresaFalse()' true && false === false

// console.log('==============================')

// - Operador de comparacion OR
// console.warn( 'Operador de comparacion OR (||), devuelve TRUE si al menos un valor de la comparacion es verdadero' )
// console.log( 'true || false:', true || false ) // true
// console.log( 'false || false:', false || false ) // false

// console.log('==============================')

// - Al utilizar el operador OR en una evaluacion de resultado de funciones, solo ejecutara la funcion que retorna "true"

// console.log( regresaTrue() || regresaFalse() )
// Regresa true
// true

/* -----------------------------------------------------------------
               Pro tip: Asignaciones con operadores
----------------------------------------------------------------- */

// const soyUndefined = undefined
// const soyNull = null
// const soyFalso = false

// - Cuando comparamos distintos valores con el operador AND "&&" y de esa comparacion queremos hacer una asignacion a una variable, siempre se asignara el ultimo valor "true" antes de un valor "false", si no existe valor "false" se asignara el ultimo valor "true"

// - Acá por ejemplo las cadenas de caracteres retornan "true", entonces al hacer esa asignacion con esta comparacion el valor de "a1" sera de "Hola Mundo", al ser "Hola Mundo" el ultimo valor "true":

// const a1 = true && 'Hola Mundo'
// console.log({ a1 }) // { a1: 'Hola Mundo' }

// - Siguiendo la logica anterior en este ejemplo "a2" valdra "150", porque los numeros retornar "true" y el ultimo elemento con valor "true" es "150":

// const a2 = true && 'Hola Mundo' && 150
// console.log({ a2 }) // { a2: 150 }

// - En este ejemplo pasa algo distinto, cuando hacemos la comparacion con "&&" si existe en la comparacion un valor "false" se retornara siempre "false" independiente de si existe un valor "true":

// const a3 = false && 'Hola Mundo' && 150
// const a4 = 'Hola' && 'Mundo' && soyFalso
// console.log({ a3, a4 }) // { a3: false, a4: false }

// - Cuando usamos el comparador OR "||" se asignara el primer valor que de "true", en este caso la cadena de texto dara "true" por lo que sera asignada como valor de "a5"
// a5 = soyFalso || 'Ya no soy falso'
// console.log({ a5 });

// - Aca por ejemplo, usando el comparador OR "||" se asignara la cadena de texto al valor de "a6" al ser el primer valor "true", ignorando por completo el siguiente "true"
// a6 = soyFalso || soyUndefined || soyNull || 'Ya no soy falso de nuevo' || true
// console.log({ a6 });

/* -----------------------------------------------------------------
                  Operador condicional ternario
----------------------------------------------------------------- */

// - El operador condicional ternario "condicion ? resultado1 : resultado2", sirve para evaluar una expresion con dos posibles resultados, viene a ser algo asi como un "If - Else" resumido

// - Suponiendo que tenemos el siguiente ejercicio Javascript:

// - En el sitio web de una tienda nos piden generar una funcion que permita al usuario consultar la hora de apertura, considerando que en los dias de la semana la tienda abre a las 11, pero el fin de semana la tienda abre a las 9

// - Resultado con "If - Else"

   // - Defino el dia y la hora a consultar (estos valores deben ir modificandose para hacer las consultas del ejercicio)
   // const dia = 1 // 0: Domingo, 1: Lunes...
   // const horaActual = 11

   // let horaApertura
   // let mensaje

   // - Creo una condicion que evalua si es fin de semana o dia de semana, considerando 0 como Domingo y 6 como dia Sabado, y dependiendo de eso muestro al usuario la hora de apertura de ese dia:

   // - Evaluar la hora de apertura dependiendo del dia:

   // if ( dia === 0 || dia === 6 ) {
   //    console.log('Fin de semana')
   //    horaApertura = 9
   // } else {
   //    console.log('Dia de semana')
   //    horaApertura = 11
   // }

   // - Tambien podemos pasar de esto: "( dia === 0 || dia === 6 )" a esto: "[0,6].includes(dia)", lo que esto hace es evaluar si el numero de la variable "dia" existe en el arreglo "[0,6]"

   // if ( [0,6].includes(dia) ) {
   //    console.log('Fin de semana')
   //    horaApertura = 9
   // } else {
   //    console.log('Dia de semana')
   //    horaApertura = 11
   // }

   // - Evaluar si esta abierto:

   // if ( horaActual >= horaApertura  ) {
   //    mensaje = 'Está abierto'
   // } else {
   //    mensaje = `Está cerrado, hoy abrimos a las: ${ horaApertura }`
   // }

   // - Consulto la hora de apertura, si defino la variable "dia" en 0, en el "If" la variable "horaApertura" tomara el valor de 9 y el mensaje sera 'Está abierto'
   // console.log({ horaApertura, mensaje }) // { "horaApertura": 9, "mensaje": "Está abierto" }

// - Resultado con operador ternario

   // const dia = 4 // 0: Domingo, 1: Lunes...
   // const horaActual = 12

   // let horaApertura = [0,6].includes( dia ) ? 9 : 11
   // let mensaje = horaActual >= horaApertura ? 'Está abierto' : `Está cerrado, hoy abrimos a las: ${ horaApertura }`

   // console.log({ horaApertura, mensaje })

// - Mas informacion: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_operator

/* -----------------------------------------------------------------
             Pro Tip: Otros usos del operador ternario
----------------------------------------------------------------- */

// - Determinar el numero mayor:

// const elMayor = ( a,b ) => a > b ? a : b
// console.log( elMayor( 20, 15 ) ) // 20

// - Descuento de precio si existe membresia

// const tieneMembresia = miembro => miembro ? '2 dolares' : '10 dolares'
// console.log( tieneMembresia( false )) // 10 dolares

// - Definir el valor de un elemento de un array

// const amigo = false
// const amigosArr = ['Peter', 'Tony', 'Dr. Strange', amigo ? 'Thor' : 'Loki' ]
// console.log( amigosArr )

// - Determinar la categoria de una nota usando el sistema norteamericano

// const nota = 82.5
// const grado = nota >= 95 ? 'A+' :
//               nota >= 90 ? 'A' :
//               nota >= 85 ? 'B+' :
//               nota >= 80 ? 'B+' :
//               nota >= 75 ? 'C+' :
//               nota >= 70 ? 'C' : 'F'

// console.log({ nota, grado }) // { "nota": 82.5, "grado": "B+" }

/* -----------------------------------------------------------------
                             Switch
----------------------------------------------------------------- */

// const dia = 0

// switch ( dia ) {
//    case 0:
//       console.log('Domingo')
//       break
//    case 1:
//       console.log('Lunes')
//       break
//    case 2:
//       console.log('Martes')
//       break
//    default:
//       console.log('No es lunes, martes o domingo')
// }

/* -----------------------------------------------------------------
                         While - Do While
----------------------------------------------------------------- */

// - Los ciclos "While" y "Do While" sirven para iterar codigo

// const carros = [ 'Ford', 'Mazda', 'Honda', 'Toyota' ]

// let i = 0

// - While ejecutara el codigo siempre y cuando la condicion asignada como parametro sea "true", si se asigna directamente un "true" como condicion, while se ejecutara infinitamente, por lo que no se recomienda hacer eso nunca ya que podria dejar pegado el navegador o incluso la aplicacion

// while( i < carros.length ) {
//    console.log( carros[i] )
//    i++
// }

// Ford
// Mazda
// Honda
// Toyota

// - Al igual que "If" y "Switch" podemos usar la palabra reservada "break" para romper el ciclo

// while( i < carros.length ) {

//    if ( i === 1 ) {
//       break
//    }

//    console.log( carros[i] )
//    i++
// }

// Ford // Solo imprime Ford ya que este se encuentra en la posicion 0 y al llegar a Mazda que se encuentra en la posicion 1 el ciclo se termina

// Tambien podemos usar la palabra reservada "continue" para saltar un valor de la condicion del ciclo:

// while( i < carros.length ) {

//    if ( i === 1 ) {
//       i++
//       continue
//    }

//    console.log( carros[i] )
//    i++
// }

// - Este ciclo omitira el valor "Mazda" debido al "continue" dentro del "If"

// Ford
// Honda
// Toyota

// - El ciclo "Do While" a diferencia de "While" va a ejecutar el ciclo al menos una vez:

// let j = 0

// do {
//    console.log( carros[j] )
//    j++
// } while ( carros[j] );

// - Acá Ford se imprime primero antes de la condicion, y luego de la condicion se muestran los demas valores

// Ford
// Mazda
// Honda
// Toyota

/* -----------------------------------------------------------------
                       For - For In - For Of
----------------------------------------------------------------- */

const heroes = [ 'Batman', 'Superman', 'Mujer Maravilla', 'Aquaman' ]

// - Ciclo "For" tradicional

// for( let i = 0; i < heroes.length; i++ )  {
//    console.log( heroes[ i ] )
// }

// - Ciclo "For in"

// for ( let i in heroes ) {
//    console.log( heroes[ i ] )
// }

// - Ciclo "For of"

// for (const heroe of heroes ) {
//    console.log( heroe )
// }

// Diferencias entre "For In" y "For Of":

   // For In: Recorre las propiedades enumerables de un objeto

   // const persona = {
   //    nombre: "Juan",
   //    apellido: "Perez",
   //    edad: 30
   // }

   // for (const propiedad in persona) {
   //    console.log(`${propiedad}: ${persona[propiedad]}`)
   // }

   // nombre: Juan
   // apellido: Perez
   // edad: 30

   // For Of: Recorre los valores de un objeto iterable (como un array, string, Set o Map)

   // const numeros = [1, 2, 3, 4, 5]

   // for (const numero of numeros) {
   //    console.log(numero)
   // }

   // 1
   // 2
   // 3
   // 4
   // 5
