import modalHtml from './render-modal.html?raw';
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';

import './render-modal.css'

let modal, form, loadedUser = {}

/**
 * @param { String|Number } id
 */
export const showModal = async ( id ) => {
  modal?.classList.remove('hide-modal')
  loadedUser = {}

  // Cargar usuario por ID
  if ( !id ) return
  const user = await getUserById( id )
  setFormValues( user )

}

export const hideModal = () => {

  modal?.classList.add('hide-modal')

  // Reset ("limpiar") del formulario
  form?.reset()

}

// Establecer los valores del formulario
/**
 * @param { User } user
 */
const setFormValues = ( user ) => {

  form.querySelector( '[name="firstName"]' ).value = user.firstName
  form.querySelector( '[name="lastName"]' ).value = user.lastName
  form.querySelector( '[name="balance"]' ).value = user.balance
  form.querySelector( '[name="isActive"]' ).checked = user.isActive
  loadedUser = user

}

/**
 * @param { HTMLDivElement } element
 * @param { ( userLike ) => Promise<void> } callback
 */
export const renderModal = ( element, callback ) => {

 if ( modal ) return

 modal = document.createElement( 'div' )
 modal.innerHTML = modalHtml
 modal.className = 'modal-container hide-modal'
 form = modal.querySelector( 'form' )

 modal.addEventListener( 'click', ( event ) => {

  if ( event.target.className === 'modal-container' ) {
    hideModal()
  }

 })

 form.addEventListener( 'submit', async ( event ) => {
  event.preventDefault()

  const formData = new FormData( form )
  const userLike = { ...loadedUser }

  for ( const [key, value] of  formData ) {

    console.log( key, value );

    if ( key === 'balance' ) {
      // Al usar "+value" se esta conviertiendo cualquier tipo de valor a numero es como usar "Number(value)"
      userLike[ key ] = +value
      continue
    }

    if ( key === 'isActive' ) {
      userLike[ key ] = ( value === 'on' ) ? true : false
      continue
    }

    userLike[ key ] = value

  }

  // console.log( userLike );

  await callback( userLike )

  hideModal()

 })

 element.append( modal )

}