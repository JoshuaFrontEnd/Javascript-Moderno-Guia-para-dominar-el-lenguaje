import { heroes } from "../data/heroes"

/**
 *
 * @param { HTMLDivElement } element
 */
export const asyncAwaitComponent = async ( element ) => {

  const id1 = '5d86371f2343e37870b91ef13'
  const id2 = '5d86371f25a058e5b1c8a65e'

  // Para manejar los errores con async/await se utiliza la sentencia try/catch
  try {

    // Sin desestructuracion
    const hero1 = await findHero( id1 )

    // Con desestructuracion
    const { name: name2 } = await findHero( id2 )

    element.innerHTML = `${ hero1.name } / ${ name2 }`

  } catch (error) {

    element.innerHTML = error
  }



}

const findHero = async ( id ) => {

  const hero = heroes.find( hero => hero.id === id )

  if ( !hero ) throw `Hero not found`

  return hero

}

/*
  - La palabra reservada "await" siempre estara adentro de una funcion "async", nos sirve para retornar el valor de una "promesa", una vez que esta se haya ejecutado, con esto evitamos el "Promise Hell", cuando las promesas dependen de los valores unas de otras
  - El unico inconveniente de usar "await", es que cada promesa se toma su tiempo para resolverse, si la primera promesa se demora un minuto, la segunda no comenzara a ejecutarse hasta que se ejecute la primera, entonces si la segunda se demora dos minutos en ejecutarse, tendremos como resultado 3 minutos de espera de ejecucion. Esto en la practica no demora tanto tiempo y existen algunas tecnicas para minimizar los tiempos de espera
*/