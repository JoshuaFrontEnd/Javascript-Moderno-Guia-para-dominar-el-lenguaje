import todoStore, { Filters } from '../store/todo.store'
import html from './app.html?raw'
import { renderTodos, renderPending } from './use-cases'

const ElementIDs = {
  ClearCompletedButton: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  TodoFilters: '.filtro',
  PendingCountLabel: '#pending-count'
}



/**
 *
 * @param { String } elementId
 */
export const App = ( elementId ) => {


  const displayTodos = () => {

    const todos = todoStore.getTodos( todoStore.getCurrentFilter() )
    renderTodos( ElementIDs.TodoList, todos )
    updatePendingCount()

  }

  const updatePendingCount = () => {
    renderPending( ElementIDs.PendingCountLabel )
  }

  // Montar la funcion App
  (() => {
    const app = document.createElement( 'div' )
    app.innerHTML = html
    document.querySelector( elementId ).append( app )
    displayTodos()
  })()

  // Referencias HTML, se agregan despues de que se monte la App
  const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput )
  const todoListUl = document.querySelector( ElementIDs.TodoList )
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton )
  const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters )

  // Listeners
  newDescriptionInput.addEventListener('keyup', ( event ) => {

    // Validar que si se aprieta la tecla Enter "13" capture el valor del input
    if ( event.keyCode !== 13 ) return

    // Validar que no se agreguen valores sin informacion
    if ( event.target.value.trim().length === 0 ) return

    // Agregar el valor del input al "store" como un nuevo "todo"
    todoStore.addTodo( event.target.value )

    // Mostrar toda la informacion del "store" incluyendo las nuevas entradas
    displayTodos()

    // "Limpiar" el input para que se muestre vacio
    event.target.value = ''

  })

  // Toggle "todo"
  todoListUl.addEventListener( 'click', ( event ) => {

    // Capturar los <li> con [data-id]
    const element = event.target.closest( '[data-id]' )

    // Enviar todos los [data-id] a "toggleTodo"
    todoStore.toggleTodo( element.getAttribute( 'data-id' ) )

    // Mostrar todos los "todo"
    displayTodos()

  })

  // Eliminar "todo"
  todoListUl.addEventListener( 'click', ( event ) => {

    const isDestroyElement = event.target.className === 'destroy'

    const element = event.target.closest( '[data-id' )

    if ( !element || !isDestroyElement ) return

    todoStore.deleteTodo( element.getAttribute( 'data-id' ) )

    displayTodos()

  })

  // Borrar todos los "todo" completados
  clearCompletedButton.addEventListener( 'click', () => {

    todoStore.deleteCompleted()

    displayTodos()

  })

  // Filtros
  filtersLIs.forEach( element => {

    element.addEventListener( 'click', ( element ) => {

      filtersLIs.forEach( el => el.classList.remove( 'selected' ) )

      element.target.classList.add( 'selected' )

      switch ( element.target.text ) {
        case 'Todos':
          todoStore.setFilter( Filters.All )
          break;
        case 'Pendientes':
          todoStore.setFilter( Filters.Pending )
          break;
        case 'Completados':
          todoStore.setFilter( Filters.Completed )
          break;
      }

      displayTodos()

    })

  })


}