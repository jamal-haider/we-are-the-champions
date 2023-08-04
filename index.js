import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { appSettings } from "./firebaseDB.js"

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListDB = ref(database, "endorsementList")






let endorsementListEl = document.getElementById('endorsements__list')
function appendItemToendorsementListEl(){

  let itemEl = document.createElement('div')
  itemEl.className = "item"

  const toEl = document.createElement('h4')
  toEl.className = 'to'
  toEl.textContent = 'Leanne'
  itemEl.appendChild(toEl)

  const paraEl = document.createElement('p')
  paraEl.textContent = 'Leanne! Thank you so much for helping me with the March accounting. Saved so much time because of you! 💜 Frode'
  itemEl.appendChild(paraEl)

  const fromHeartEl = document.createElement('div')
  fromHeartEl.className = 'from-heart'

  const fromEl = document.createElement('h4')
  fromEl.className = 'from'
  fromEl.textContent = 'Frode'
  fromHeartEl.appendChild(fromEl)

  const heartSpan = document.createElement('span')
  heartSpan.textContent = `🖤`
  fromHeartEl.appendChild(heartSpan)

  const bEl = document.createElement('b')
  bEl.textContent = '5'
  fromHeartEl.appendChild(bEl)

  itemEl.appendChild(fromHeartEl)

  endorsementListEl.appendChild(itemEl)

}

appendItemToendorsementListEl()