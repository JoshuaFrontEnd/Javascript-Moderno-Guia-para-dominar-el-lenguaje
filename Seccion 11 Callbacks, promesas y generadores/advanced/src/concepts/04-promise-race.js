/**
 *
 * @param { HTMLDivElement } element
 */
export const promiseRaceComponent = ( element ) => {

  // Antes de que se resuelva el "Promise.race" podemos mostrar algo que sirva como "loading"
  element.innerHTML = 'Loading...'

  const renderValue = ( value ) => {
    element.innerHTML = value
  }

  // Con "Promise.Race" podemos retornar el valor de la promesa que se ejecute mas rapido, esto sirve por ejemplo para saber que endpoint podria retornar los valores mas rapidos, dependiendo de la ubicacion, etc
  Promise.race([
    slowPromise(),
    mediumPromise(),
    fastPromise(),
  ])
  .then( renderValue ) // Fast Promise

}

const slowPromise = () => new Promise( resolve => {

  setTimeout(() => {
    resolve('Slow Promise')
  }, 2000 )

})

const mediumPromise = () => new Promise( resolve => {

  setTimeout(() => {
    resolve('Medium Promise')
  }, 1500 )

})

const fastPromise = () => new Promise( resolve => {

  setTimeout(() => {
    resolve('Fast Promise')
  }, 1000 )

})