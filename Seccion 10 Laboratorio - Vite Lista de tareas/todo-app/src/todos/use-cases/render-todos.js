import { createTodoHTML } from "."

// Creo la variable que servira como caché
let element;

/**
 *
 * @param { String } elementId
 * @param { Todo } todos
 */
export const renderTodos = ( elementId, todos = [] ) => {

  // Cuando ejecuto esta linea siempre estoy renderizando, para evitar eso puedo guardar una referencia y usarla como caché
  // const element = document.querySelector( elementId )

  // Si el elemento no existe en caché, lo guardo en una variable
  if ( !element ) element = document.querySelector( elementId )

  // Si el elemento no existe porque no se pudo guardar en una variable lanzo un error
  if ( !element ) throw new Error(`Element ${ elementId } not found`)

  // Vaciar el contenido de la lista antes de insertar los elementos
  element.innerHTML = ''

  todos.forEach( todo => {
    element.append( createTodoHTML( todo ) )
  })

}