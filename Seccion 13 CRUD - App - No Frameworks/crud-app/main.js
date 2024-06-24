import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { TheOfficeApp } from './src/theoffice/theoffice-app'
import { UsersApp } from './src/users/users-app'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">CRUD con Javascript vanilla</h1>
    <div class="card">

    </div>
  </div>
`

const element = document.querySelector( '.card' )

// TheOfficeApp( element )
UsersApp( element )