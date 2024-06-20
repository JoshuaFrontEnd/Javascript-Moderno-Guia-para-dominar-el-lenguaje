import { heroes } from "../data/heroes"

/**
 *
 * @param { HTMLDivElement } element
 */
export const promiseComponent = ( element ) => {

  const renderHero = ( hero ) => {
    element.innerHTML = hero.name
  }

  const renderTwoHeroes = ( hero1, hero2 ) => {

    element.innerHTML = `
      <h3>${ hero1.name }</h3>
      <h3>${ hero2.name }</h3>
    `

  }

  const renderError = ( error ) => {
    element.innerHTML = `<h3>Error: ${ error }</h3>`
  }

  const id1 = '5d86371f25a058e5b1c8a65e'
  const id2 = '5d86371f233c9f2425f16916'

  // Promesa sencilla
  // findHero( id1 )
  // // Para acceder al resultado de la promesa usamos "then", si existe un error se debe usar "catch", adicionalmente existe "finally" que se ejecuta despues de haber ejecutado "then" o "catch" o ambas
  // // .then( superHero =>  renderHero( superHero) )
  // // El codigo anterior puede interpretarse tambien como:
  // .then( renderHero )
  // .catch( renderError )

  // Promise Hell
  // findHero( id1 )
  //   .then( hero1 => {

  //     findHero( id2 )
  //       .then( hero2 => {

  //         renderTwoHeroes( hero1, hero2 )

  //       })
  //       .catch( renderError )

  //   })
  //   .catch( renderError )

  // Refactorizando el "Promise Hell" con encademaniento de "then", esto sirve cuando el resultado de las promesas dependen una de la otra
  // let hero1

  // findHero( id1 )
  //   .then( hero => {

  //     hero1 = hero
  //     return findHero( id2 )

  //   })
  //   .then( hero2 => {

  //     renderTwoHeroes( hero1, hero2 )

  //   })
  //   .catch( renderError )

  // Refactorizando el "Promise Hell" con con "Promise.All", esto sirve cuando el resultado de las promesas son independientes y no dependen de otra promesa
  Promise.all([
    findHero( id1 ),
    findHero( id2 )
  ])
  .then( ([ hero1, hero2 ]) => renderTwoHeroes( hero1, hero2 ))
  .catch( renderError )


}

/**
 *
 * @param { String } id
 * @returns { Promise }
 */
const findHero = ( id ) => {

  return new Promise(( resolve, reject ) => {

    const hero = heroes.find( hero => hero.id === id )

    if ( hero ){
      resolve( hero )
      return
    }

    reject(`Hero with id ${id} not found`)

  })

}