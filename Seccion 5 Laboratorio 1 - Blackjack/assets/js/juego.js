/* =================================================================

  Sección 6: Patrón módulo y optimizaciones

  En esta sección tocaremos los siguientes temas:

  - Patrón módulo
  - Minimizar el código de forma manual (luego lo haremos de forma automática)
  - Optimizaciones y protección de código

  Esta es una sección que enseña mucho sobre la protección de nuestro código y cómo manipular programas que no usen estos patrones.

================================================================= */

// - En Javascript el patrón modulo sirve para encasular el codigo dentro de una funcion anonima autoinvocada, de esta manera podemos controlar las propiedades y metodos que son publicos en el contexto global

const miModulo = (() => {

	'use strict'

  /*
    * 2C = Two of Clubs
    * 2D = Two of Diamons
    * 2H = Two of Hearts
    * 2S = Two of Spades
  */

  // - Creando el mazo (deck) de cartas basado en el nombre de las imagenes:

  let deck = []
  const tipos = ['C', 'D', 'H', 'S'],
				especiales = ['A', 'J', 'Q', 'K']

  let puntosJugadores = []

  // - Referencias del HTML

  const btnNuevo = document.querySelector('#btnNuevo'),
  			btnPedir = document.querySelector('#btnPedir'),
  			btnDetener = document.querySelector('#btnDetener')

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
				puntosHtml = document.querySelectorAll('small')

	// - Inicializar juego

	const inicializarJuego = ( numJugadores = 2 ) => {

		deck = crearDeck()

		puntosJugadores = []

		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0)
		}

    puntosHtml.forEach( elem => elem.innerText = 0 )
    divCartasJugadores.forEach( elem => elem.innerHTML = '')

    btnPedir.disabled = false
    btnDetener.disabled = false

	}

	// - Crear mazo

  const crearDeck = () => {

		deck = []

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

    return _.shuffle( deck )

  }

  // - Funcion para pedir carta

  const pedirCarta = () => {

    if ( deck.length === 0 ) {
      throw 'No hay cartas en el mazo'
    }

    return deck.pop()

  }

  // - Obtener el valor de la carta escogida

  const valorCarta = ( carta ) => {

    // - Obtengo el numero del nombre de la carta, el cual me servira como valor
    const valor = carta.substring( 0, carta.length - 1 )

    // - Todo el codigo anterior se puede resumir en esta linea usando el operador ternario:
    return isNaN( valor ) ? valor === 'A' ? 11 : 10 : valor * 1

  }

	// - Acumular puntos, Turno: 0 = primer jugador, y el ultimo será la computadora

	const acumularPuntos = ( carta, turno ) => {

		puntosJugadores[ turno ] = puntosJugadores[ turno ] + valorCarta( carta );

		puntosHtml[ turno ].innerText = puntosJugadores[ turno ];

		return puntosJugadores[ turno ];

	}

	// - Crear la imagen de la carta solicitada

	const crearCarta = ( carta, turno ) => {

		const imgCarta = document.createElement('img')
		imgCarta.className = 'carta'
		imgCarta.src = `assets/cartas/${ carta }.png`
		divCartasJugadores[turno].append( imgCarta )

	}

	// - Obtener el ganador

	const determinarGanador = () => {

		const [ puntosMinimos, puntosComputadora ] = puntosJugadores

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

  // - Turno de la computadora
  const turnoComputadora = ( puntosMinimos ) => {

		let puntosComputadora = 0

    do {

      const carta = pedirCarta()
			puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 )
			crearCarta( carta, puntosJugadores.length - 1 )

    } while (( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ))

		determinarGanador()

  }

  // - Eventos

  btnPedir.addEventListener( 'click', () => {

    // - Pedir una carta
    const carta = pedirCarta()
	  const puntosJugador = acumularPuntos( carta, 0 )

		crearCarta( carta, 0 )

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
    turnoComputadora( puntosJugadores[0] )

  })

  btnNuevo.addEventListener( 'click', () => {

		inicializarJuego()

  })

	return {
		nuevoJuego: inicializarJuego
	}

})()
