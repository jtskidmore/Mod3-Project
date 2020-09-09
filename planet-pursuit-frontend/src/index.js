

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

const leaderboard = document.createElement('ol')
leaderboard.id = "leaderboard"

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
          // _players.push(data)
          _current_player = data
          renderPlayer(data)
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

  renderLeaderboard()

  home.append(leaderboard)
  home.append(formDiv)

}

function setPlayerAttributes() {
  if (_current_player.type_id === 1) {
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 1)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 100
    console.log(_currentWeapon)
  } else if (_current_player.type_id === 2) {
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 2)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 150
  } else if (_current_player.type_id === 3) {
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 3)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 125
  }

  let data = {
    weapon_id: _currentWeapon.id,
    attack: _playerAttack,
    health: _currentHealth
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }

  fetch(`${PLAYERS_URL}/${_current_player.id}`, configObj)
    .then(res => res.json())
    .then((data) => {
      _players.push(data)
      _current_player = data
    })

    console.log(_current_player)

}

function renderLeaderboard() {
  leaderboard.innerHTML = ""
  leaderboard.innerHTML = "<h3>Leaderboard</h3>"
  let sortedPlayers = _players.sort(function(a, b){return a.score-b.score})
  let top5Players = sortedPlayers.slice(Math.max(sortedPlayers.length - 5, 1))
  top5Players.reverse()
  console.log(top5Players)
  top5Players.forEach(player => {
    let li = document.createElement('li')
    li.textContent = `${player.name} Score: ${player.score}`
    leaderboard.append(li)
  })
}

function renderPlayer(player) {

  setPlayerAttributes()

  let home = document.getElementById('home')
  let playerName = document.createElement("h1")
  playerName.textContent = player.name

  let playerType = document.createElement("h4")
  playerType.textContent = player.type

  let playerHealth = document.createElement("h2")
  playerHealth.textContent = _currentHealth

  let playerScore = document.createElement("h2")
  playerScore.textContent = player.score
  _currentScore = player.score

  let playerDefense = document.createElement("h3")
  playerDefense.textContent = player.defense
  _playerDefense = player.defense

  let playerAttack = document.createElement("h4")
  playerAttack.textContent = _playerAttack

  let playerWeapon = document.createElement("h5")
  // let weapon = _weapons.filter((weapon) => weapon.id === player.weapon_id)[0]
  // _currentWeapon = weapon
  playerWeapon.textContent = _currentWeapon.name
  // playerWeapon.textContent =

  let playerPotion = document.createElement("h5")
  let potion = _potions.filter((potion) => potion.id === player.potion_id)[0]
  _currentPotion = potion
  playerPotion.textContent = potion.name

  home.append(playerName, playerScore, playerHealth, playerDefense, playerAttack, playerWeapon, playerPotion)
  home.append(visitBtn)
  visitBtn.addEventListener("click", () => renderPlanet(_current_player))
}
