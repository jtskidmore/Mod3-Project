
const PLAYERS_URL = "http://localhost:3000/players"
const TYPES_URL = "http://localhost:3000/types"
const WEAPONS_URL = "http://localhost:3000/weapons"
const POTIONS_URL = "http://localhost:3000/potions"
const PLANETS_URL = "http://localhost:3000/planets"
const NPCS_URL = "http://localhost:3000/npcs"
const PLAYERPLANETS_URL = "http://localhost:3000/player_planets"

const home = document.getElementById("home")
const game = document.getElementById("game")
const div = document.getElementById('previous-game-stats')

const form = document.createElement('form')
form.id = "player-form"

const visitBtn = document.createElement('button')
visitBtn.textContent = "Visit Planet"
visitBtn.id = "visit-btn"
visitBtn.className = 'button-clear'

const leaderboard = document.getElementById("leaderboard")


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
    renderPreviousGameStats(_players);
    // x0p('Message', 'Hello world!', 'info');

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
          console.log(data)
          _current_player = data
          renderPlayer(data)
        })

      form.reset()
      console.log(_current_player)
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
  newButton.className= "button-clear"
  newButton.innerText = "Create Player!"

  form.append(nameIn, typeSelect, newButton)

  formDiv.append(form)

  renderLeaderboard()

  home.append(formDiv)

}

function renderPreviousGameStats (_players) {
  let lastPlayer = _players.slice(-1)[0]
  div.innerHTML = "<h3>Previous Game Score</h3>"
  let name = document.createElement('h4')
  name.textContent = `Player: ${lastPlayer.name}`

  let score = document.createElement('h4')
  score.textContent = `Score: ${lastPlayer.score}`

  div.append(name, score)
}

function setPlayerAttributes() {
  if (_current_player.type_id === 1) { //human, lightsaber
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 1)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 100
    console.log(_currentWeapon)
  } else if (_current_player.type_id === 2) { //wookie, blaster
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 3)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 150
  } else if (_current_player.type_id === 3) { //gungan, spear
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 6)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 100
  } else if (_current_player.type_id === 4) { //jawa, grafitti stick
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 7)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 110
  } else if (_current_player.type_id === 5) { //mandalorian, blaster rifle
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 4)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 135
  } else if (_current_player.type_id === 6) { //droid, slugthrower
    _currentWeapon = _weapons.filter((weapon) => weapon.id === 5)[0]
    _playerAttack = _currentWeapon.damage
    _currentHealth = 125
  }

  let data = {
    weapon_id: _currentWeapon.id,
    attack: _playerAttack,
    health: _currentHealth
  }

  /////////////////OLD FETCH////////////////////

  // let configObj = {
  //   method: "PATCH",
  //   headers: {
  //     "Accept": "application/json",
  //     "content-type": "application/json"
  //   },
  //   body: JSON.stringify(data)
  // }
  //
  // fetch(`${PLAYERS_URL}/${_current_player.id}`, configObj)
  //   .then(res => res.json())
  //   .then((data) => {
  //     console.log(data)
  //     _players.push(data)
  //     _current_player = data
  //   })
/////////////////////////////////////////////////

//////////////NEW FETCH///////////////////////////
let promise = fetch(`${PLAYERS_URL}/${_current_player.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(data)
}).then(res => res.json())

Promise.all([promise]).then(data => {
    console.log(data[0])
    _players.push(data[0])
    _current_player = data[0]
    home.append(visitBtn)
    visitBtn.addEventListener("click", () => renderPlanet(_current_player))
})
//////////////////////////////////////////////////


}

function renderLeaderboard() {
  leaderboard.innerHTML = ""
  leaderboard.innerHTML = "<h3>Leaderboard</h3>"
  let sortedPlayers = [..._players].sort(function(a, b){return a.score-b.score})
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

  let homePlayerStats = document.createElement('ul')
  homePlayerStats.innerHTML = `<h3>${player.name}</h3>`

  let playerType = document.createElement("li")
  playerType.textContent = `Type: ${player.type}`

  let playerHealth = document.createElement("li")
  playerHealth.textContent = `Health: ${_currentHealth}`

  let playerScore = document.createElement("li")
  playerScore.textContent = `Score: ${player.score}`
  _currentScore = player.score

  let playerAttack = document.createElement("li")
  playerAttack.textContent = `Attack: ${_playerAttack}`

  let playerWeapon = document.createElement("li")
  playerWeapon.textContent = `Weapon: ${_currentWeapon.name}`

  let playerPotion = document.createElement("li")
  let potion = _potions.filter((potion) => potion.id === player.potion_id)[0]
  _currentPotion = potion
  playerPotion.textContent = `Potion: ${potion.name}`

  homePlayerStats.append(playerScore, playerHealth, playerAttack, playerWeapon, playerPotion)
  home.append(homePlayerStats)
}
