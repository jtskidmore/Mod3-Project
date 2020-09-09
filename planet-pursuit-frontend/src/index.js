

const PLAYERS_URL = "http://localhost:3000/players"
const TYPES_URL = "http://localhost:3000/types"
const WEAPONS_URL = "http://localhost:3000/weapons"
const POTIONS_URL = "http://localhost:3000/potions"
const PLANETS_URL = "http://localhost:3000/planets"
const NPCS_URL = "http://localhost:3000/npcs"
const PLAYERPLANETS_URL = "http://localhost:3000/player_planets"

const home = document.getElementById("home")
const game = document.getElementById("game")

const form = document.createElement('form')
form.id = "player-form"

const visitBtn = document.createElement('button')
visitBtn.textContent = "Visit Planet"
visitBtn.id = "visit-btn"

let _types
let _players
let _weapons
let _potions
let _planets
let _npcs
let _player_planets = []
let _currentPlanet
let _current_player
let _currentWeapon
let _currentPotion
let _currentHealth
let _currentScore
let _playerAttack
let _playerDefense
let _currentNpc
let _npcHealth
let _npcAttack
let _npcDefense
let _npcWeapon


document.addEventListener("DOMContentLoaded", function () {

  const typesPromise = fetch(TYPES_URL).then(res => res.json())
  const playersPromise = fetch(PLAYERS_URL).then(res => res.json())
  const weaponsPromise = fetch(WEAPONS_URL).then(res => res.json())
  const potionsPromise = fetch(POTIONS_URL).then(res => res.json())
  const planetsPromise = fetch(PLANETS_URL).then(res => res.json())
  const npcsPromise = fetch(NPCS_URL).then(res => res.json())

  Promise.all([typesPromise, playersPromise, weaponsPromise, potionsPromise, planetsPromise, npcsPromise]).then(data => {
    [_types, _players, _weapons, _potions, _planets, _npcs] = data;

    createForm(_types);

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
          console.log(data)
          _current_player = data
        })

      form.reset()
    })
  })
}) //end dom content loaded



function createForm(data) {

  console.log(data)
  let formDiv = document.createElement('div')

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
  newButton.innerText = "Create Player!"

  form.append(nameIn, typeSelect, newButton)

  formDiv.append(form)

  home.append(formDiv)

}

function renderPlayer(player) {

  let home = document.getElementById('home')
  let playerName = document.createElement("h1")
  playerName.textContent = player.name

  let playerType = document.createElement("h4")
  playerType.textContent = player.type

  let playerHealth = document.createElement("h2")
  playerHealth.textContent = player.health
  _currentHealth = player.health

  let playerScore = document.createElement("h2")
  playerScore.textContent = player.score
  _currentScore = player.score

  let playerDefense = document.createElement("h3")
  playerDefense.textContent = player.defense
  _playerDefense = player.defense

  let playerAttack = document.createElement("h4")
  playerAttack.textContent = player.attack
  _playerAttack = player.attack

  let playerWeapon = document.createElement("h5")
  let weapon = _weapons.filter((weapon) => weapon.id === player.weapon_id)[0]
  _currentWeapon = weapon
  playerWeapon.textContent = weapon.name
  // playerWeapon.textContent =

  let playerPotion = document.createElement("h5")
  let potion = _potions.filter((potion) => potion.id === player.potion_id)[0]
  _currentPotion = potion
  playerPotion.textContent = potion.name

  home.append(playerName, playerScore, playerHealth, playerDefense, playerAttack, playerWeapon, playerPotion)
  home.append(visitBtn)
  visitBtn.addEventListener("click", () => renderPlanet(_current_player))
}
