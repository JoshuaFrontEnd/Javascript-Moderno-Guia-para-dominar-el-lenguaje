import { User } from '../models/user'
import { loadNextId } from '../use-cases/load-next-id'
import { loadUsersByPage } from '../use-cases/load-users-by-page'

const state = {
  currentPage: 0,
  users: []
}

const loadNextPage = async () => {
  const users = await loadUsersByPage( state.currentPage + 1 )

  if ( users.length === 0 )  return

  state.currentPage += 1
  state.users = users

}

const loadPreviousPage = async () => {

  if ( state.currentPage === 1 )  return

  const users = await loadUsersByPage( state.currentPage - 1 )

  state.currentPage -= 1
  state.users = users
}

const getNextId = async () => {
  return await loadNextId()
}

/**
 * @param { User } user
 */
const onUserChanged = async ( updatedUser ) => {

  let wasFound = false

  state.users = state.users.map( user => {
    if ( user.id === updatedUser.id ) {
      wasFound = true
      return updatedUser
    }
    return user
  })

  if ( state.users.length < 10 && ! wasFound ) {
    state.users.push( updatedUser )
  }

}

const reloadPage = async () => {
  const users = await loadUsersByPage( state.currentPage )
  if ( users.length === 0 )  return
  state.users = users
}

export default {
  getNextId,
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,
  // Pasamos los datos del arreglo "users" del objeto "state" por valor (copia) para no modificar el estado inicial

  /**
   *
   * @returns { User[] }
   */
  getUsers: () => [ ...state.users ],

  /**
   *
   * @returns { Number }
   */
  getCurrentPage: () => state.currentPage
}