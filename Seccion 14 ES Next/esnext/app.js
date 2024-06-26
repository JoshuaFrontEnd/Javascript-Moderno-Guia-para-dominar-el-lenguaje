/* =================================================================

   Sección 14: ES Next

================================================================= */

/* -----------------------------------------------------------------
                             structureClone
----------------------------------------------------------------- */
// const superHeroes = [
//   {
//     id: 1,
//     name: 'Batman'
//   },
//   {
//     id: 2,
//     name: 'Superman'
//   },
//   {
//     id: 3,
//     name: 'Flash'
//   },
//   {
//     id: 4,
//     name: 'Aquaman'
//   },

// ]

// console.table( superHeroes )

// Usando el operador "spread" podemos crear una "shadow copy" de un arreglo/objeto rompiendo la referencia, siempre y cuando los valores del arreglo/objeto sean de tipo primitivos

// const superHeroesCopy = [...superHeroes]


// superHeroesCopy[0].name = 'Green Lantern'

// console.table( superHeroesCopy )

// El metodo "structureClone" sirve para hacer copias profundas "deep copy" de un arreglo u objeto, rompiendo las referencias independiente de los valores que contenta el arreglo/objeto

// const superHeroesCopy = structuredClone( superHeroes )

// superHeroesCopy[0].name = 'Green Lantern'

// console.table( superHeroesCopy )

/* -----------------------------------------------------------------
                             Array With
----------------------------------------------------------------- */

// const state= [
//   {
//     id: 1,
//     name: 'Batman'
//   },
//   {
//     id: 2,
//     name: 'Superman'
//   },
//   {
//     id: 3,
//     name: 'Flash'
//   },
//   {
//     id: 4,
//     name: 'Aquaman'
//   }
// ]

// const index = 1
// const newName = 'Green Lantern'

// const newState = state.map( ( hero, i ) => {

//   if ( i === index ) {
//     hero.name = newName
//   }

//   return hero

// })

// state[0].name = 'Volcan Negro'

// const newState = state.with( index, {
//   id: 1000,
//   name: newName
// })

// const newState = state.with( index, {
//   ...state.at( index ),
//   name: newName
// })

// console.table( newState )

// console.log('El ultimo elemento: ', state.at( 0 ))

/* -----------------------------------------------------------------
                             Metodos To
----------------------------------------------------------------- */

// Los metodos "to" permiten modificar arreglos sin modificar los arreglos base

const heroes = ['Batman', 'Superman', 'Flash', 'Aquaman']
// const heroesCopy = heroes

// Esto cambia todas las referencias del arreglo
// heroesCopy.sort()
// console.table( heroesCopy )

// Esto crea un orden en un nuevo objeto a partir de otro,sin modificar el objeto base
const sortedHeroes = heroes.toSorted()
console.table( sortedHeroes )


console.table( heroes )