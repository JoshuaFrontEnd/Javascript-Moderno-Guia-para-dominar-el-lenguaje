/**
 *
 * @param { HTMLDivElement } element
 */
export const generatorFunctionsComponent = ( element ) => {

  // const myGenerator = myFirstGeneratorFunction()

  // console.log( myGenerator.next() ) // { value: 'Primer valor', done: false }
  // console.log( myGenerator.next() ) // { value: 'Segundo valor', done: false }
  // console.log( myGenerator.next() ) // { value: 'Tercer valor', done: false }
  // console.log( myGenerator.next() ) // { value: 'Cuarto valor', done: false }
  // console.log( myGenerator.next() ) // { value: 'Ya no hay valores', done: true }
  // console.log( myGenerator.next() ) // { value: undefined, done: true }

  const genId = idGenerator()
  const button = document.createElement('button')
  button.innerText = 'Click me'
  element.append( button )

  const renderButton = () => {
    const { value } = genId.next()
    button.innerText = `Click ${ value }`
  }

  // button.addEventListener('click', ( event ) => renderButton() )

  // El codigo anterior es igual a este:
  button.addEventListener('click', renderButton )

}

function* idGenerator() {
  let currentId = 0

  while (true) {
    yield ++currentId
  }
}

// function* myFirstGeneratorFunction() {

//   yield 'Primer valor'
//   yield 'Segundo valor'
//   yield 'Tercer valor'
//   yield 'Cuarto valor'

//   return 'Ya no hay valores'

// }

/*
  - Las funciones "generadoras" nos generan una secuencia de valores los cuales pueden ser usados en diferentes casos
  - No pueden declararse como "arrow function"
  - Se diferencian de las funciones normales al usar un * al final de la declaracion "function"
  - Utilizan la palabra reservada "yield" que funciona para pausar y reanudar la funcion
*/