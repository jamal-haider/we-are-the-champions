import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, set, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { appSettings } from "./firebaseDB.js"

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListDB = ref(database, "endorsementList")

const publishBtn = document.getElementById('publish-btn')
let endorsementListEl = document.getElementById('endorsements__list')
const descInputEl = document.getElementById('desc-field')
const fromInputEl = document.getElementById('from-field')
const toInputEl = document.getElementById('to-field')

let clientIP = ''
fetch('https://api.ipify.org/?format=json')
  .then(res => res.json())
  .then(data => {
    clientIP = data.ip
  })


// fetch data from endorsementList
onValue(endorsementListDB, (snapshot) => {
  if(snapshot.exists()){
    let items = Object.entries(snapshot.val())
    clearEndorsementListEl()
    items.map(item => appendItemToendorsementListEl(item))
  }
})

// insert data into endorsementList
publishBtn.addEventListener('click', () => {

  if(descInputEl.value === ''){
    alert('Please type some description')
    return false
  }

  const newEndorsement = {
    desc: descInputEl.value,
    from: fromInputEl.value,
    to: toInputEl.value,
    likes: 0
  }
  push(endorsementListDB, newEndorsement)
  clearInputFields()
})

function clearInputFields(){
  descInputEl.value  = ""
  fromInputEl.value = ""
  toInputEl.value = ""
}

function clearEndorsementListEl(){
  endorsementListEl.innerHTML = ""
}

function appendItemToendorsementListEl(item){
  const [id, value] = item
  let itemEl = document.createElement('div')
  itemEl.className = "item"

  const toEl = document.createElement('h4')
  toEl.className = 'to'
  toEl.textContent = value.to
  itemEl.appendChild(toEl)

  const paraEl = document.createElement('p')
  paraEl.textContent = value.desc
  itemEl.appendChild(paraEl)

  const fromHeartEl = document.createElement('div')
  fromHeartEl.className = 'from-heart'

  const fromEl = document.createElement('h4')
  fromEl.className = 'from'
  fromEl.textContent = value.from
  fromHeartEl.appendChild(fromEl)

  const heartSpan = document.createElement('span')
  heartSpan.textContent = `🖤`
  heartSpan.addEventListener('click', () => {

    if('likedIpAddresses' in value && value.likedIpAddresses.includes(clientIP)){
      
      const newlikedIpAddresses = value.likedIpAddresses
      delete newlikedIpAddresses[clientIP]

      set(ref(database, `endorsementList/${id}`), {
        ...value,
        likes: value.likes - 1,
        likedIpAddresses: {
          clientIP
        }
      })

    }else{
      
      set(ref(database, `endorsementList/${id}`), {
        ...value,
        likes: value.likes + 1,
        likedIpAddresses: {
          ...likedIpAddresses,
        }
      })

    }
  })

  fromHeartEl.appendChild(heartSpan)

  const bEl = document.createElement('b')
  bEl.textContent = (value.likes > 0) ? value.likes : ""
  fromHeartEl.appendChild(bEl)

  itemEl.appendChild(fromHeartEl)

  endorsementListEl.appendChild(itemEl)

}

