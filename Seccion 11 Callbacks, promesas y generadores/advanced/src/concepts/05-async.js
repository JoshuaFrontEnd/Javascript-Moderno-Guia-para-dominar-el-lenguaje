import { heroes } from "../data/heroes"

/**
 *
 * @param { HTMLDivElement } element
 */
export const asyncComponent = ( element ) => {

  const id1 = '5d86371fd55e2e2a30fe1ccb'

  console.log('Inicio de componente')

  findHero( id1 )
    .then( name => element.innerHTML = name )
    .catch( error => element.innerHTML = error )

  console.log('Fin de componente')

}


/**
 *
 * @param { String } id
 * @returns { Promise<String> }}
 */
const findHero = async ( id ) => {

  const hero = heroes.find( hero => hero.id === id )

  if ( !hero ) throw new Error(`Hero with id ${ id } not found`)

  return hero.name

}

/*
  - En una funcion Async el "return" significa que todo se hizo bien, por lo tanto caera siempre en el "resolve/then" de la "promesa", por eso es importante manejar los error usando "throw" para que el resultado caiga en el "catch" de la "promesa"
*/