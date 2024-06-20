import { heroes } from "../data/heroes"

/**
 *
 * @param { HTMLDivElement } element
 */
export const callbacksComponent = ( element ) => {

  const id1 = '5d86371f1efebc31def272e2'
  const id2 = '5d86371f233c9f2425f16916'

  findHero( id1, ( error, hero1 ) => {

    // Si el "hero" existe, busca la propiedad "name" si no existe se muestra el valor "No hay heroe"
    // element.innerHTML = hero?.name || 'No hay heroe'

    // Pero es mejor identificar de manera adecuada el error, revisar la definicion de la funcion "findHero"
    if ( error ) {
      element.innerHTML = error
      return
    }

    // Callback Hell
    findHero( id2, ( error, hero2 ) => {

      if ( error ) {
        element.innerHTML = error
        return
      }

      element.innerHTML = `${ hero1.name } / ${ hero2.name }`

    })


  })

}

/**
 *
 * @param { String } id
 * @param { ( error: String|Null, hero: Object ) => void } callback
 */
const findHero = ( id, callback ) => {

  const hero = heroes.find( hero => hero.id === id )

  if ( !hero ) {
    // Aca el mensaje se pasa como "error" y no se declara el segundo argumento "hero", el cual en este caso sera "undefined"
    callback(`Hero with id ${id} not found`)
    return // undefined
  }

  callback( null, hero )

}

/*
  - Un "callback" no es mas que una funcion que recibe un argumento, y ese argumento es una funcion que es invocado dentro de la funcion que recibe el argumento
  - "Callback hells" es un termino para denominar cuando se llama un "callback" y dentro de ese "callback" se llama a otro "callback" y asi indefinidamente, la idea es evitar esta practica ya que el codigo puede convertirse en algo muy complejo de mantener
*/