/**
 *
 * @param { HTMLDivElement } element
 */
export const asyncAwait2Component = async ( element ) => {

  // Al ejecutar todas estas promesas con await se demorara un poco mas de 4 segundo en obtener el resultado de todas las promesas, ya que cada promesa se tomara su tiempo especificado para resolverse antes de que se pueda ejecutar la siguiente, si las promesas no dependen unas de otras, esto es una perdida de tiempo por lo que habria que optimizar este codigo

  console.time('Start')

  // const value1 = await slowPromise()
  // const value2 = await mediumPromise()
  // const value3 = await fastPromise()

  // Usando "Promise.all" en promesas no secuenciales, es decir, que los resultados de las promesas no dependen unas de otras, podemos optimizar y ejecutar al mismo tiempo cada promesa
  const [ value1, value2, value3 ] = await Promise.all([
    slowPromise(),
    mediumPromise(),
    fastPromise()
  ])

  element.innerHTML = `
    value1: ${ value1 } <br />
    value2: ${ value2 } <br />
    value3: ${ value3 } <br />
  `

  console.timeEnd('Start')

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