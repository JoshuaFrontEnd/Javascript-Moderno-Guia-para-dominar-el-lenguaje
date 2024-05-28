/* =================================================================

  Sección 5: Laboratorio 1 - Blackjack

  En esta sección tocaremos los siguientes temas:

  - Trabajar con arreglos
  - Mezclar los valores de los arreglos
  - Introducción a la manipulación del DOM
  - Eventos
  - Crear imágenes en la página
  - Realizar la lógica para implementar un competidor de cartas.

  Esta sección es bien divertida (al menos eso espero), haremos un juego que nos enseñará muchas cosas de JavaScript.

  Tengan presente que el código que haremos en esta sección es potencialmente inseguro, (lo explico en la siguiente sección), por lo que puede ser modificado por usuarios y hacer trampa... pero eso es algo que cubriremos en la siguiente sección

================================================================= */

/*
  * 2C = Two of Clubs
  * 2D = Two of Diamons
  * 2H = Two of Hearts
  * 2S = Two of Spades
*/

// - Creando el mazo (deck) de cartas basado en el nombre de las imagenes:

let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0,
    puntosComputadora = 0

// - Referencias del HTML

const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')

const puntajeJugador = document.querySelector('.jugador small')
const puntajeComputadora = document.querySelector('.computadora small')

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

const crearDeck = () => {

  for ( let i = 2; i <= 10; i++ ) {
    for ( let tipo of tipos ) {
      deck.push( i + tipo )
    }
  }

  for ( let tipo of tipos ) {
    for ( let esp of especiales ) {
      deck.push( esp + tipo )
    }
  }

  // console.log( deck )

  // - Creando una baraja desordenada usando "shuffle" de "underscore.js"
  deck = _.shuffle( deck )

  // console.warn('Mazo desordenado inicial');
  // console.log( deck )

  return deck

}

crearDeck()

// - Funcion para pedir carta

const pedirCarta = () => {

  if ( deck.length === 0 ) {
    throw 'No hay cartas en el mazo'
  }

  let carta = deck.pop()

  // console.warn('Pidiendo carta');
  console.log('Mazo sin la carta:', deck )
  console.log('Carta solicitada:', carta)

  return carta

}

// - Obtener el valor de la carta escogida

const valorCarta = ( carta ) => {

  // - Obtengo el numero del nombre de la carta, el cual me servira como valor
  const valor = carta.substring( 0, carta.length - 1 )
  // let puntos = 0
  // - Validar que el valor de la carta sea un numero
  // if ( isNaN( valor ) ) {
    // console.log('No es un numero');
    // - Si el valor de la carta es'A' le asigno 11 puntos, si es 'J', 'Q', 'K' le asigno 10 puntos

  //   puntos = valor === 'A' ? 11 : 10

  // } else {
    // console.log('Es un numero');
    // - Asigno el valor de la carta a un puntaje, pero como el valor viene en "string" lo multiplico por 1 para convertilo a "number"
    // puntos = valor * 1
  // }

  // - Todo el codigo anterior se puede resumir en esta linea usando el operador ternario:
  return isNaN( valor ) ? valor === 'A' ? 11 : 10 : valor * 1

}

// - Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

  // - Necesito ejecutar esta funcion al menos una vez por eso uso "Do - While"

  do {

    // - Pedir una carta
    const carta = pedirCarta()

    // - Sumar las cartas solicitadas
    puntosComputadora = puntosComputadora + valorCarta( carta )

    // - Mostra la suma de los valores de las cartas solicitadas
    puntajeComputadora.innerText = puntosComputadora

    // - Crear la imagen de la carta solicitada
    const imgCarta = document.createElement('img')
    imgCarta.className = 'carta'
    imgCarta.src = `assets/cartas/${ carta }.png`
    divCartasComputadora.append( imgCarta )

    if ( puntosMinimos > 21 ) {
      break
    }

  } while (( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ))

  setTimeout(() => {

    if ( puntosComputadora === puntosMinimos ) {
      alert( 'Nadie gana' )
    } else if ( puntosMinimos > 21 ) {
      alert( 'Computadora gana' )
    } else if ( puntosComputadora > 21 ) {
      alert( 'Jugador gana' )
    } else {
      alert( 'Computadora gana' )
    }

  }, 100 )

}



// - Eventos

btnPedir.addEventListener( 'click', () => {

  // - Pedir una carta
  const carta = pedirCarta()

  // - Sumar las cartas solicitadas
  puntosJugador = puntosJugador + valorCarta( carta )

  // - Mostra la suma de los valores de las cartas solicitadas
  puntajeJugador.innerText = puntosJugador

  // - Crear la imagen de la carta solicitada
  const imgCarta = document.createElement('img')
  imgCarta.className = 'carta'
  imgCarta.src = `assets/cartas/${ carta }.png`
  divCartasJugador.append( imgCarta )

  // - Validar que el valor del puntaje sea menor a 21

  if ( puntosJugador > 21 ) {
    console.warn('Lo siento mucho, perdiste')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora( puntosJugador )
  } else if ( puntosJugador === 21 ) {
    console.warn('21, genial!!')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora( puntosJugador )
  }

})

btnDetener.addEventListener( 'click', () => {

  btnPedir.disabled = true
  btnDetener.disabled = true
  turnoComputadora( puntosJugador )

})

btnNuevo.addEventListener( 'click', () => {

  console.clear()

  deck = []
  deck = crearDeck()

  puntosJugador = 0
  puntosComputadora = 0

  puntajeJugador.innerText = 0
  puntajeComputadora.innerText = 0

  divCartasJugador.innerHTML = ''
  divCartasComputadora.innerHTML = ''

  btnPedir.disabled = false
  btnDetener.disabled = false



})