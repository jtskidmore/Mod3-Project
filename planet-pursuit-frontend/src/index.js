

const PLAYERS_URL = "http://localhost:3000/players"
const TYPES_URL = "http://localhost:3000/types"
const WEAPONS_URL = "http://localhost:3000/weapons"
const POTIONS_URL = "http://localhost:3000/potions"
const PLANETS_URL = "http://localhost:3000/planets"
const NPCS_URL = "http://localhost:3000/npcs"
const PLAYERPLANETS_URL = "http://localhost:3000/player_planets"

const home = document.getElementById("home")
const game = document.getElementById("game")

const lastGameStats = document.getElementById('previous-game-stats')
lastGameStatsTitle = document.createElement('div')
lastGameStatsTitle.classList = 'card-body'
lastGameStatsTitle.id = 'lastGameStats-title'
const lastGameStatsList = document.createElement('ul')
lastGameStatsList.classList = "list-group list-group-flush"

const newPlayerData = document.createElement('div')
newPlayerData.classList = "card"
newPlayerData.id = "new-player-data"

const newPlayerDataTitle = document.createElement('div')
newPlayerDataTitle.classList = "card-body"
newPlayerDataTitle.id = 'newPlayerData-title'

const newPlayerDataList = document.createElement('ul')
newPlayerDataList.classList = "list-group list-group-flush"

const form = document.createElement('form')
form.id = "player-form"

const visitBtnDiv = document.createElement('div')
visitBtnDiv.id = "visit-btn-div"
const visitBtn = document.createElement('button')
visitBtn.classList = "btn btn-primary"
visitBtn.textContent = "Visit Planet"
visitBtn.id = "visit-btn"
visitBtnDiv.append(visitBtn)

const leaderboard = document.getElementById("leaderboard")
const leaderboardTitle = document.createElement("div")
leaderboardTitle.classList = "card-body"
leaderboardTitle.id = "leaderboard-title"
const leaderboardList = document.createElement('ol')
leaderboardList.classList = "list-group list-group-flush"





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

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let playerName = e.target["form-name"].value
      let playerType = e.target["form-type"].value

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
      form.style.display = 'none'
      leaderboard.style.display = 'none'
      lastGameStats.style.display = 'none'
      console.log(_current_player)
    })
  })
}) //end dom content loaded



function createForm(data) {

  console.log(data)
  let formDiv = document.createElement('div')
  formDiv.classList = "form-group"
  formDiv.id = "form-div"

  let nameIn = document.createElement('input')
  nameIn.id = "form-name"
  nameIn.placeholder = "Name player!"
  nameIn.classList = "form-control"

  let typeSelect = document.createElement('select')
  typeSelect.id = "form-type"
  typeSelect.classList = "form-control"

  data.forEach((type) => {
    let option = document.createElement('option')
    option.textContent = type.name
    option.setAttribute('value', type.id)
    typeSelect.append(option)
  })

  let newButton = document.createElement('button')
  newButton.id = "form-button"
  newButton.innerText = "Create Player!"
  newButton.classList = "btn btn-primary"

  form.append(nameIn, typeSelect, newButton)

  formDiv.append(form)

  renderLeaderboard()

  home.append(formDiv)

}

//
////
////////
////////////////
////////////////////////////////

function renderPreviousGameStats (_players) {
  let lastPlayer = _players.slice(-1)[0]
  lastGameStatsTitle.innerHTML = "<h3>Previous Game Score</h3>"

  let name = document.createElement('li')
  name.textContent = `Player: ${lastPlayer.name}`

  let score = document.createElement('li')
  score.textContent = `Score: ${lastPlayer.score}`

  lastGameStatsList.append(name, score)

  lastGameStats.append(lastGameStatsTitle, lastGameStatsList)
}

//
////
////////
////////////////
////////////////////////////////

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
  leaderboard.append(leaderboardTitle)
  leaderboardTitle.innerHTML = "<h3>Leaderboard</h3>"
  let sortedPlayers = [..._players].sort(function(a, b){return a.score-b.score})
  let top5Players = sortedPlayers.slice(Math.max(sortedPlayers.length - 5, 1))
  top5Players.reverse()
  top5Players.forEach(player => {
    let li = document.createElement('li')
    li.textContent = `${player.name} Score: ${player.score}`
    leaderboardList.append(li)
  })
  leaderboard.append(leaderboardList)
}

function renderPlayer(player) {

  setPlayerAttributes()

  let home = document.getElementById('home')

  let container = document.createElement('div')
  container.classList = "container"

  newPlayerDataTitle.innerHTML = `<h3>${player.name}</h3>`

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

  newPlayerDataList.append(playerScore, playerHealth, playerAttack, playerWeapon, playerPotion)
  newPlayerData.append(newPlayerDataTitle, newPlayerDataList)
  home.append(newPlayerData)
}