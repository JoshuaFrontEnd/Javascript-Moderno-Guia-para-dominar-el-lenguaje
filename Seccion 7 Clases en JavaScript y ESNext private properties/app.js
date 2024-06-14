/* =================================================================

  Sección 7: Clases en JavaScript y ESNext private properties

  En esta sección tocaremos los siguientes temas:

  - Problematica de prototipos
  - Clases
  - Sets
  - Gets
  - Métodos estáticos
  - Gets estáticos
  - ESNext: Propiedades privadas (aún no soportado completamente)
  - Singletons
  - Multiples constructores

  Esta sección es fundamental para la programación moderna de JavaScript, nos servirá mucho en el futuro y recuerden que al final de la sección tienen el código fuente.

================================================================= */

/* -----------------------------------------------------------------
                Problematica y necesidad de clases
----------------------------------------------------------------- */

// - Imagenimos que tenemos un objeto:

// const objeto = {
//   nombre: 'Goku',
//   edad: 30
// }

// - Si necesito crear un nuevo objeto con las mismas propiedades del objeto anterior, lo logico seria escribir un nuevo objeto con esas propiedades:

// const nuevoObjeto = {
//   nombre: 'Vegeta',
//   edad: 33
// }

// - A efectos practicos sirve, pero que pasa si ahora necesito crear un metodo que funcione igual en ambos objetos, lo logico seria crear el metodo en ambos objetos:

// const objeto = {
//   nombre: 'Goku',
//   edad: 30,
//   imprimir() {
//     console.log( `Nombre: ${ this.nombre } - Edad: ${ this.edad }` )
//   }
// }

// objeto.imprimir()

// const nuevoObjeto = {
//   nombre: 'Vegeta',
//   edad: 33,
//   imprimir() {
//     console.log( `Nombre: ${ this.nombre } - Edad: ${ this.edad }` )
//   }
// }

// nuevoObjeto.imprimir()

// - Podemos observar que esto sigue funcionando, pero que sucede si tenemos 1.000 o 1.000.000 de objetos que necesiten esa estructura de valores, ¿Copiaremos 1.000 o 1.000.000 de veces cada objeto?. Para resolver este problema se crearon las "pseudoclases" en Javascript, ya que hasta antes de ES6, Javascript no soportaba las clases

  // - Esto a continuacion es una funcion comun y corriente, pero por convencion la primera letra del nombre de la funcion va en mayusculas (PascalCase) para hacer saber que esta funcion servira para crear instancias, es decir, servira para crear objetos a partir de la estructura de esta funcion, osea, un constructor de objetos, lo que nos permitira crear objetos de manera infinita siempre y cuando llamemos la funcion con el operador "new", pasandole los argumentos solicitados, en este caso, nombre y edad:

  // function Saiyayin( nombre, edad ) {

  //   this.nombre = nombre
  //   this.edad = edad
  //   this.imprimir = function () {
  //     console.log( `Nombre: ${ this.nombre } - Edad: ${ this.edad }` )
  //   }

  // }

  // const goku = new Saiyayin('Goku', 30)
  // const vegeta = new Saiyayin('Vegeta', 33)

  // goku.imprimir()
  // vegeta.imprimir()

  // - El inconveniente principal de usar estas "pseudoclases" es que no podemos crear propiedades privadas y que el codigo es muy volatil, en el sentido de que dependemos de ciertas convenciones que si no son respetadas podrian generar confusion entre los programadores que necesiten usar esta funcion, por ejemplo, si por alguna razon definimos todo el nombre de la funcion en minusculas, aparte de que no nos daria error, se podria interpretar esta funcion como una funcion normal y no como una funcion constructora que necesita el operador "new" para poder generar instancias lo cual generaria problemas a la hora de crear objetos a partir de esta funcion, para esto en Ecmascript 6 se implementan las clases definitivas en Javascript

/* -----------------------------------------------------------------
                  Clases basicas en Javascript
----------------------------------------------------------------- */

// - Para definir una clase en Javascript usamos la palabra reservada "class", de esta manera sabemos implicitamente que al inicializar una instancia de alguna clase debemos de hacerlo con la palabra reservada "new", luego usamos el metodo por defecto llamado "constructor" el cual se encarga de inicializar las propiedades que tendran en comun los objetos al momento de su creacion:

// class Saiyayin {

//   constructor( nombre, edad ) {

//     this.nombre = nombre
//     this.edad = edad

//   }

// }

// const goku = new Saiyayin('Goku', 30)
// const vegeta = new Saiyayin('Vegeta', 33)

// console.log( goku )
// console.log( vegeta )

/* -----------------------------------------------------------------
                       Metodos en las clases
----------------------------------------------------------------- */

// - Si definimos un metodo dentro del "constructor" sin la palabra reservada "this" dara un error

// class Saiyayin {

//   constructor( nombre, edad ) {

//     this.nombre = nombre
//     this.edad = edad

//     function imprimir() {
//       console.log( `Nombre: ${ this.nombre } - Edad: ${ this.edad }` )
//     }

//   }

// }

// const goku = new Saiyayin('Goku', 30)

// goku.imprimir() // Uncaught TypeError: goku.imprimir is not a function

// - Si definimos un metodo en el "constructor" con la palabra reservada "this" no dara un error pero se desaconseja completamente debido a que la idea del metodo "constructor" es de crear un "scope" especifico para la inicializacion de propiedades de los objetos, ademas hay que considerar que declarando metodos en el "constructor", cada vez que se inicialice un objeto se estaran ejecutando esos metodos, por lo que afectara en el rendimiento de la aplicacion

// class Saiyayin {

//   constructor( nombre, edad ) {

//     this.nombre = nombre
//     this.edad = edad

//     // - Esto no dara error, pero se ejecutara esta funcion cada vez que se inicialice un objeto, afectando el rendimiento de la aplicacion
//     this.imprimir = function () {
//       console.log( `Nombre: ${ this.nombre } - Edad: ${ this.edad }` )
//     }

//   }

// }

// const goku = new Saiyayin('Goku', 30)

// goku.imprimir() // Nombre: Goku - Edad: 30

// - La manera correcta de definir un metodo en una clase de Javascript es afuera del "constructor", de esta manera el codigo queda mas ordenado donde el "constructor" solo tendra las inicializaciones de las propiedades de los objetos a construir y los metodos solo seran ejecutados cada vez que se requiera acceder a ellos:

// class Saiyayin {

//   constructor( nombre, edad ) {

//     this.nombre = nombre
//     this.edad = edad

//   }

//   imprimir() {
//     console.log( `Nombre: ${ this.nombre } - Edad: ${ this.edad }` )
//   }

// }

// const goku = new Saiyayin('Goku', 30)
// const vegeta = new Saiyayin('Vegeta', 33)

// goku.imprimir() // Nombre: Goku - Edad: 30
// vegeta.imprimir() // Nombre: Vegeta - Edad: 33

// - Tambien podemos invocar metodos desde otros metodos usando "this"

// class Saiyayin {

//   constructor( nombre, edad ) {

//     this.nombre = nombre
//     this.edad = edad

//   }

//   imprimir() {
//     console.log( `Nombre: ${ this.nombre } - Edad: ${ this.edad }` )
//   }

//   invocarImprimir() {
//     this.imprimir()
//   }

// }

// const goku = new Saiyayin('Goku', 30)
// const vegeta = new Saiyayin('Vegeta', 33)

// goku.invocarImprimir() // Nombre: Goku - Edad: 30
// vegeta.invocarImprimir() // Nombre: Vegeta - Edad: 33

/* -----------------------------------------------------------------
                             Sets y Gets
----------------------------------------------------------------- */

// - En la programacion orientada a objetos existen los conceptos de "Set" ( Setear ) y "Get" ( Obtener ), de manera muy resumida, "Set" sirve para modificar los valores preestablecidos en las propiedades de un objeto, y "Get" sirve para obtener los valores modificados del objeto

// class Persona {

//   // - Inicializando propiedades de clase ( No son variables )
//   nombre = ''
//   codigo = ''
//   frase = ''
//   comida = ''

//   constructor( nombre = 'Sin nombre', codigo = 'Sin codigo' , frase = 'Sin frase' ) {

//     this.nombre = nombre
//     this.codigo = codigo
//     this.frase = frase

//   }

//   // - Por ejemplo si deseo "setear" comida del usuario y que esta siempre se visualice en mayuscula lo puedo hacer con "Set"
//   // - Puedo enviar multiples argumentos pero se recomienda usar solo uno, que es la propiedad a setear o modificar, hacer esto equivale a hacer un metodo, pero con la sintaxis nueva de Javascript
//   // - Existe una convencion de que al nombrar el metodo "Set" se utilice la palabra "set" mas el nombre del metodo, aunque esto no es obligatorio, se puede nombrar el metodo de cualquier manera salvo con el mismo nombre de la propiedad a modificar ya que si se hace esto se va a generar un error, de igual manera esto aplica para "Get"

//   set setComidaFavorita ( comida ) {
//     this.comida = comida.toUpperCase()
//   }

//   get getComidaFavorita() {
//     return `La comida favorita de ${ this.nombre } es ${ this.comida }`
//   }

//   quienSoy() {
//     console.log(`Soy ${ this.nombre } y mi identidad es ${ this.codigo }`)
//   }

//   miFrase() {
//     this.quienSoy()
//     console.log(`${ this.codigo } dice: ${ this.frase }`)
//   }

// }

// const spiderman = new Persona( 'Peter Parker', 'Spiderman', 'Soy tu amigable vecino' )

// - Para usar el "Set"

// spiderman.setComidaFavorita = 'El pie de cereza de la tía May'

// - Hay que considerar que lo anterior equivale a setear una propiedad como si se tratase de un objeto, por lo que hacer este tipo de asignacion es perfectamente valida y sobre escribe el valor del "Set", para evitar esto se utilizan las propiedades privadas
// spiderman.comida = 'DUENDE VERDE'

// console.log( spiderman.getComidaFavorita )
// console.log( spiderman )

// - Por que usar "Set" por sobre la notacion de punto o corchetes?
// - Porque es mas facil procesar los valores de las propiedades antes de setearlas como valores definitivos

// - Para complementar la informacion de esta clase:
// - https://www.arsys.es/blog/propiedades-get-set-javascript

/* -----------------------------------------------------------------
                Propiedades, Gets y Metodos Estaticos
----------------------------------------------------------------- */

// - Tanto las propiedades como los metodos estaticos basicamente nos permiten utilizar dichos metodos y propiedades sin necesidad de instanciar la clase, otra definicion podria ser que tanto los metodos y las propiedades estaticas son inherentes a la clase en si misma, como propiedades "directas" del objeto "Persona"

// class Persona {

//   // - Defino una propiedad estatica con un valor de 0:
//   static conteo = 0

//   // - Definicion de "get" estatico:
//   static get getConteo() {
//     return Persona.conteo + ' instancias'
//   }

//   // - Definicion de metodo estatico:
//   static mensaje() {

//     // - Cuando definimos un metodo estatico no podemos hacer referencia a ninguna propiedad con "this", ya que "this" sirve para acceder a la referencia de una instancia ya creada y al usar "static" estamos usando los valores de propiedades de la estructura de la clase y no a las instancias de la clase

//     console.log( this.nombre ) // Esto dara undefined

//     console.log('Hola a todos, soy un metodo estatico')
//   }

//   nombre = ''
//   codigo = ''
//   frase = ''
//   comida = ''

//   constructor( nombre = 'Sin nombre', codigo = 'Sin codigo' , frase = 'Sin frase' ) {

//     this.nombre = nombre
//     this.codigo = codigo
//     this.frase = frase

//     // Aca cada vez que se ejecute el constructor puedo "contar" las instancias de creacion
//     Persona.conteo++

//   }

//   set setComidaFavorita ( comida ) {
//     this.comida = comida.toUpperCase()
//   }

//   get getComidaFavorita() {
//     return `La comida favorita de ${ this.nombre } es ${ this.comida }`
//   }

//   quienSoy() {
//     console.log(`Soy ${ this.nombre } y mi identidad es ${ this.codigo }`)
//   }

//   miFrase() {
//     this.quienSoy()
//     console.log(`${ this.codigo } dice: ${ this.frase }`)
//   }

// }

// const spiderman = new Persona( 'Peter Parker', 'Spiderman', 'Soy tu amigable vecino' )

// spiderman.setComidaFavorita = 'El pie de cereza de la tía May'

// console.log( spiderman.getComidaFavorita )
// console.log( spiderman )

// console.log('Conteo estatico', Persona.conteo ) // Conteo estatico 1

// - Lo anterior podria entenderse como:

// Persona {
//   conteo: 1
// }

// console.log( Persona.getConteo ) // 1 instancias

// - Lo anterior podria entenderse como:

// Persona {
//   conteo: 1,
//   getConteo: () => { Persona.conteo + ' instancias' }
// }

// Persona.mensaje()

// Undefined
// Hola a todos, soy un metodo estatico

// - Una de las particularidades de Javascript, es que al ser tan flexible, podemos crear propiedades y metodos estaticos, trabajando una clase como si fuese un objeto literal:

// Persona.propiedadStaticExterna = 'Hola Mundo'

// console.log( Persona.propiedadStaticExterna )

// - Para poder visualizar esa propiedad estatica habria que hacer una impresion en consola del propotipo de la clase Persona y en esa impresion buscar la propiedad en el metodo "Constructor"

// console.log( Persona.prototype )

/* -----------------------------------------------------------------
                Extends - Clases con SubClases
----------------------------------------------------------------- */

// - En javascript la palabra reservada "extends" permite heredar toda la definicion de una clase, es decir, metodos y propiedades, a otra clase permitiendo complementar una clase nueva con metodos y propiedades nuevos

// - Defino una clase "padre" llamada "Persona"
// class Persona {

//     static conteo = 0


//     static get getConteo() {
//       return Persona.conteo + ' instancias'
//     }


//     static mensaje() {
//       console.log('Hola a todos, soy un metodo estatico')
//     }

//     nombre = ''
//     codigo = ''
//     frase = ''
//     comida = ''

//     constructor( nombre = 'Sin nombre', codigo = 'Sin codigo' , frase = 'Sin frase' ) {

//       this.nombre = nombre
//       this.codigo = codigo
//       this.frase = frase

//       Persona.conteo++

//     }

//     set setComidaFavorita ( comida ) {
//       this.comida = comida.toUpperCase()
//     }

//     get getComidaFavorita() {
//       return `La comida favorita de ${ this.nombre } es ${ this.comida }`
//     }

//     quienSoy() {
//       console.log(`Soy ${ this.nombre } y mi identidad es ${ this.codigo }`)
//     }

//     miFrase() {
//       this.quienSoy()
//       console.log(`${ this.codigo } dice: ${ this.frase }`)
//     }

//   }

// - Defino una clase "hija" llamada "Heroe" que al usar la palabra reservada "extends" permite heredar todos los metodos y propiedades de la clase padre "Persona", complementando estas propiedas con propiedades nuevas definidas en "Heroe":

// class Heroe extends Persona {
//   clan = 'sin clan'
// }

// - Al crear una clase "hija" para poder usar el "constructor" de la clase "padre" es necesario usar el metodo "super" dentro del constructor
// - "super" permite acceder a las propiedades y metodos de la clase "padre"
// - "super" debe llamarse siempre antes de la palabra "this" o generara un error

// class Heroe extends Persona {

//   clan = 'sin clan'

//   constructor( nombre, codigo, frase ){

//     super( nombre, codigo, frase )

//     this.clan = 'Los Avengers'

//   }

//   // - Aca estoy ejecutando el metodo "quienSoy" de la clase hija "Heroe"
//   quienSoy() {

//     console.log('hola')

//     // - Aca estoy ejecutando el metodo "quienSoy" de la clase padre "Persona"
//     super.quienSoy()

//   }

// }

// const spiderman = new Heroe( 'Peter Parker', 'Spiderman', 'Soy tu amigable vecino' )

// console.log( spiderman )

// spiderman.quienSoy()

/* -----------------------------------------------------------------
                       Propiedades Privadas
----------------------------------------------------------------- */

// - Las propiedades privadas sirven para evitar modificar el valor de una propiedad de una clase
// - Se declaran privadas usando un hash antes del nombre, ejemplo: #area

// class Rectangulo {

//   #area = 0

//   constructor ( base = 0, altura = 0 ) {

//     this.base = base
//     this.altura = altura
//     this.#area = base * altura

//   }

// }

// const rectangulo = new Rectangulo( 10, 15 )

// - Como defini "#area" como propiedad privada, no puedo modificar su valor, por lo que la siguiente linea de codigo generara un error:
// rectangulo.#area = 100

// console.log( rectangulo )

/* -----------------------------------------------------------------
                       Singleton en Javascript
----------------------------------------------------------------- */

// - En programacion un "singleton" es un patron de diseño que consiste en limitar a una unica instancia una clase

// - Creo una clase llamada "Singleton", (puede llamarse de cualquier manera) y la inicializo con la propiedad estatica "instancia" y un "nombre" de valor ''

// class Singleton {

//   static instancia // undefined
//   nombre = ''

//   constructor ( nombre = '' ) {

//     if ( !!Singleton.instancia ) {
//       return Singleton.instancia
//     }

//     Singleton.instancia = this

//     this.nombre = nombre

//   }

// }

// const instancia1 = new Singleton('Ironman')
// const instancia2 = new Singleton('Spiderman')

// console.log(`Nombre en la instancia 1 es: ${ instancia1.nombre }`)
// console.log(`Nombre en la instancia 2 es: ${ instancia2.nombre }`)

// - Informacion para complementar esta clase:
// - https://refactoring.guru/es/design-patterns
// - https://refactoring.guru/es/design-patterns/singleton
// - https://www.patterns.dev/vanilla/singleton-pattern

/* -----------------------------------------------------------------
                 Pro tip: Multiples constructores
----------------------------------------------------------------- */

// - A diferencia de otros lenguajes, Javascript no soporta multiples constructores, pero podemos crear multiples metodos estaticos que actuen como multiples constructores

class Persona {

  // - Creo una nueva instancia de la clase "Persona" usando un metodo estatico, enviandole una estructura de objeto que actua como un nuevo constructor
  static porObjeto({ nombre, apellido, pais }) {
    return new Persona( nombre, apellido, pais )
  }

  constructor ( nombre, apellido, pais ) {
    this.nombre = nombre
    this.apellido = apellido
    this.pais = pais
  }

  getInfo() {
    console.log(`Info: ${ this.nombre }, ${ this.apellido }, ${ this.pais }`)
  }

}

// - Al crear una instancia de la clase "Persona" usamos la estructura definida en el constructor

const nombre1 = 'Tulio',
      apellido1 = 'Triviño',
      pais1 = 'Chile'

const persona1 = new Persona(nombre1, apellido1, pais1 )

console.log( persona1 ) // Persona {nombre: 'Tulio', apellido: 'Triviño', pais: 'Chile'}

// - Para poder usar otra estructura hay que definir un metodo estatico

const titere = {
  nombre: 'Policarpio',
  apellido: 'Avendaño',
  pais: 'Chile'
}

const persona2 = Persona.porObjeto( titere )

console.log( persona2 ) // Persona {nombre: 'Policarpio', apellido: 'Avendaño', pais: 'Chile'}

