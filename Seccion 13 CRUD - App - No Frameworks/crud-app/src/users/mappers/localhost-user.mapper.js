import { User } from "../models/user"

/**
 *
 * @param { Like<User>} localhostUser
 * @returns { User }
 */
export const localhostUserToModel = ( localhostUser ) => {

  // Esto sirve para mapear los campos de la base de datos y poder editarlos desde aca si es que los nombres de los campos llegan a cambiar

  // Obtengo todos los nombres de la base de datos como vienen
  const {
    avatar,
    balance,
    first_name,
    gender,
    id,
    isActive,
    last_name,
  } = localhostUser

  // Los renombro para usarlos en mi app como mas me acomode
  return new User({
    avatar,
    balance,
    firstName: first_name,
    gender,
    id,
    isActive,
    lastName: last_name,
  })
}