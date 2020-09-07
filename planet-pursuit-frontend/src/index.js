

const PLAYERS_URL = "http://localhost:3000/players"
const TYPES_URL = "http://localhost:3000/types"
const WEAPONS_URL = "http://localhost:3000/weapons"
const POTIONS_URL = "http://localhost:3000/potions"
const main = document.getElementById("test")

let _types
let _players
let _weapons
let _potions

document.addEventListener("DOMContentLoaded", function () {

  const typesPromise = fetch(TYPES_URL).then(res => res.json())
  const playersPromise = fetch(PLAYERS_URL).then(res => res.json())
  const weaponsPromise = fetch(WEAPONS_URL).then(res => res.json())
  const potionsPromise = fetch(POTIONS_URL).then(res => res.json())

  Promise.all([typesPromise, playersPromise, weaponsPromise, potionsPromise]).then(data => {
    [_types, _players, _weapons, _potions] = data;

    renderTypes(_types);
    renderPlayers(_players);
    createForm(_types);

    const form = document.getElementById("player-form")
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let playerName = e.target["name"].value
      let playerType = e.target["type"].value

      let data = {
        name: playerName,
        type_id: playerType
      }

      let configObj = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      }

      fetch(PLAYERS_URL, configObj)
        .then(res => res.json())
        .then((data) => {
          _players.push(data)
          renderPlayer(data)
        })
    })
  })




  //DONE//render new player form
  //DONE//dropdown for types
  //DONE//input for name
  //DONE//add event listener to form (prevent submit default)

  //DONE//create new player in backend
  //DONE//set default hp, attack, and defense

  //

})


function createForm(data) {

  console.log(data)
  let formDiv = document.createElement('div')

  let form = document.createElement('form')
  form.id = "player-form"

  let nameIn = document.createElement('input')
  nameIn.id = "name"
  nameIn.placeholder = "name player!"

  let typeSelect = document.createElement('select')
  typeSelect.id = "type"

  data.forEach((type) => {
    let option = document.createElement('option')
    option.textContent = type.name
    option.setAttribute('value', type.id)
    typeSelect.append(option)
  })

  let newButton = document.createElement('button')
  newButton.innerText = "Create Monster!"

  form.append(nameIn, typeSelect, newButton)

  formDiv.append(form)

  main.append(formDiv)

}


function renderPlayers(data) {

  data.forEach(player => renderPlayer(player))

}

function renderPlayer(player) {
  
  let test = document.getElementById('test')
  let playerName = document.createElement("h1")
  playerName.textContent = player.name

  let playerType = document.createElement("h4")
  playerType.textContent = player.type

  let playerHealth = document.createElement("h2")
  playerHealth.textContent = player.health

  let playerDefense = document.createElement("h3")
  playerDefense.textContent = player.defense

  let playerAttack = document.createElement("h4")
  playerAttack.textContent = player.attack

  let playerWeapon = document.createElement("h5")
  let weapon =  _weapons.filter((weapon) => weapon.id === player.weapon_id)[0]
  playerWeapon.textContent = weapon.name
  // playerWeapon.textContent =

  let playerPotion = document.createElement("h5")
  let potion =  _potions.filter((potion) => potion.id === player.potion_id)[0]
  playerPotion.textContent = potion.name

  test.append(playerName, playerHealth, playerDefense, playerAttack, playerWeapon, playerPotion)
}



function renderTypes(data) {
  console.log(data)
  console.log(_weapons)
}
