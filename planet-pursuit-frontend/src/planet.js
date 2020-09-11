let timeoutID;
let playerDamagePointDifference
let npcDamagePointDifference;
let tradePotionAlert = document.createElement('p')
let tradeWeaponAlert = document.createElement('p')
let denyTradeAlert = `It's good to be happy with what you have! Traveling to new planet...`
let consumePotionAlert = document.createElement('p')
let playerAttackAlert //= document.createElement('p')
let playerAttackAlert2 = document.createElement('p')
let playerAttackAlert3 = document.createElement('p')
let npcPrepAlert
let npcAttackAlert
let travelAlert = 'Traveling to new planet...'
let fleeAlert = document.createElement('p')
let npcDefeatedAlert
let playerDefeatedAlert = document.createElement('p')
let quitAlert = `Quitting and returning to base...`
let returnAlert = 'Returning to base...'

function reload() {
    document.location.reload(true)
}

// function makeNewPlanet(_currentPlanet, planetId) {
//     if (_currentPlanet.planet_id == planetId) {
//         planetId = _planets[Math.floor(Math.random() * _planets.length)].id
//     } 
// }

function renderPlanet(player) {
    home.style.display = "none"
    leaderboard.style.display = "none"
    $('.modal').modal('hide');
    game.innerHTML = ''

    let playerId = player.id
    let planetId = _planets[Math.floor(Math.random() * _planets.length)].id
    // if (_currentPlanet != undefined) {
    //     makeNewPlanet(_currentPlanet, planetId)
    // }
    
    let npcId = _npcs[Math.floor(Math.random() * _npcs.length)].id

    let data = {
        player_id: playerId,
        planet_id: planetId,
        npc_id: npcId
    }

    let promise = fetch(PLAYERPLANETS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

    Promise.all([promise]).then(data => {
        _player_planets.push(data[0])
        _currentPlanet = data[0]
        renderPlayerPlanet(data[0])
    })
}

function exitGame() {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`${PLAYERS_URL}/${_current_player.id}`, options)
        .then(res => {
            if (res.ok) {
                return Promise.resolve('Player deleted.');
            } else {
                return Promise.reject('An error occurred.');
            }
        })
        .then(res => console.log(res));
        quitModal()
        $("#quit-modal").modal('show');
        timeoutID = setTimeout(function () { reload() }, 2000)
}

function renderPlayerPlanet(playerplanet) {

    let gameHeader = document.createElement('div')
    gameHeader.id = "game-header"

    let gameStatsContainer = document.createElement('div')
    gameStatsContainer.id = "game-stats-container"


    let exit = document.getElementById('footer')
    exit.style.display = "block"
    exit.innerHTML = ''

    let exitBtn = document.createElement('button')
    exitBtn.id = "exit-btn"
    exitBtn.classList = "btn btn-primary"
    exitBtn.textContent = "Quit Game"
    exitBtn.setAttribute('data-toggle', 'modal')
    exitBtn.setAttribute('data-target', '#quit-modal')
    exit.append(exitBtn)

    exitBtn.addEventListener('click', () => exitGame())

    let planetPlayer = document.createElement("h5")

    let player = _current_player
    planetPlayer.textContent = player.name

    let planetPlanet = document.createElement("h5")
    planetPlanet.id = 'planet-planet'

    let planet = _planets.filter((planet) => planet.id === playerplanet.planet_id)[0]
    planetPlanet.textContent = `Welcome to ${planet.name}, ${player.name}!`



    let body = document.getElementsByTagName("BODY")[0]
    body.style.backgroundImage = `url(images/planets/${planet.name}.jpg)`

    let planetNpc = document.createElement("h4")
    planetNpc.id = "planet-npc"
    _currentNpc = _npcs.filter((npc) => npc.id === playerplanet.npc_id)[0]
    gameHeader.append(planetPlanet, planetNpc)

    let npc = _currentNpc
    console.log(_currentNpc)
    _npcHealth = npc.health
    _npcAttack = npc.attack
    _npcDefense = npc.defense
    _npcWeapon = _weapons.filter(weapon => weapon.id === npc.weapon_id)[0]
    if (npc.is_friendly == true) {

        planetNpc.textContent = `${npc.name} is here to greet you! Would you like to trade for a weapon or potion?`
        let playerStats = document.createElement('div')
        playerStats.id = 'player-stats'



        if (planet.name === "Kashyyyk" ||
            planet.name === "Mustafar" ||
            planet.name === "Coruscant" ||
            planet.name === "Dagobah"
        ) {
            planetNpc.style.color =  'white'
            planetPlanet.style.color = "white"
        }

        let statList = document.createElement('ul')
        statList.innerHTML = `<h3>${player.name}</h3>`

        let playerWeapon = document.createElement('li')
        playerWeapon.textContent = `Weapon: ${_currentWeapon.name}`

        let playerPotion = document.createElement('li')
        playerPotion.textContent = `Potion: ${_currentPotion.name}`
        playerPotion.id = 'player-potion'

        statList.append(playerWeapon, playerPotion)
        playerStats.append(statList)

        let npcStats = document.createElement('div')
        npcStats.id = 'npc-stats'

        let npcStatList = document.createElement('ul')
        if (npc.name == "A trader") {
            let newName = npc.name.split(" ")[1]
            let newNewName = newName.charAt(0).toUpperCase() + newName.slice(1)
            npcStatList.innerHTML = `<h3>${newNewName}</h3>`
        } else {
            npcStatList.innerHTML = `<h3>${npc.name}</h3>`
        }


        let npcPotion = document.createElement('li')
        let npcPotionEquipped = _potions.filter((potion) => potion.id === npc.potion_id)[0]
        npcPotion.textContent = `Potion: ${npcPotionEquipped.name}`
        npcPotion.id = 'npc-potion'

        let npcWeapon = document.createElement('li')
        let npcWeaponEquipped = _weapons.filter((weapon) => weapon.id === npc.weapon_id)[0]
        npcWeapon.textContent = `Weapon: ${npcWeaponEquipped.name}`

        npcStatList.append(npcWeapon, npcPotion)
        npcStats.append(npcStatList)

        game.append(planetPlanet, planetNpc)

        let tradeWeaponBtnYes = document.createElement('button')
        tradeWeaponBtnYes.id = 'trade-weapon-yes'
        tradeWeaponBtnYes.classList = "btn btn-primary"
        tradeWeaponBtnYes.setAttribute('data-toggle', 'modal')
        tradeWeaponBtnYes.setAttribute('data-target', '#trade-weapon-modal')
        tradeWeaponBtnYes.textContent = 'Trade Weapon'

        let tradePotionBtnYes = document.createElement('button')
        tradePotionBtnYes.id = 'trade-potion-yes'
        tradePotionBtnYes.classList = "btn btn-primary"
        tradePotionBtnYes.setAttribute('data-toggle', 'modal')
        tradePotionBtnYes.setAttribute('data-target', '#trade-potion-modal')
        tradePotionBtnYes.textContent = 'Trade/Accept Potion'

        let tradeBtnNo = document.createElement('button')
        tradeBtnNo.id = 'trade-no'
        tradeBtnNo.classList = "btn btn-primary"
        tradeBtnNo.textContent = 'No'
        tradeBtnNo.setAttribute('data-toggle', 'modal')
        tradeBtnNo.setAttribute('data-target', '#deny-trade-modal')

        gameStatsContainer.append(playerStats, npcStats)

        //////
        let buttonsContainer = document.createElement("div")
        buttonsContainer.id = "buttons-container"
        /////

        let avatarContainer = document.createElement('div')
        avatarContainer.id = "avatar-container"

        let playerAvatar = document.createElement('div')
        playerAvatar.id = "player-avatar"

        let playerAvatarType = _types.filter((type) => type.id === _current_player.type_id)[0]
    

        let npcAvatar = document.createElement('div')
        npcAvatar.id = "npc-avatar"

        let npcFirstName 

        if (_currentNpc.name.includes(" ")) {
            npcFirstName = _currentNpc.name.split(' ')[0]
            console.log(npcFirstName)
        } else {
            npcFirstName = _currentNpc.name
            console.log(npcFirstName)
        }

        npcAvatar.innerHTML = `<img src='images/traders/${npcFirstName}.png'>`

        playerAvatar.innerHTML = `<img src='images/types/${playerAvatarType.name}.png'>`


        avatarContainer.append(playerAvatar, npcAvatar)

        game.append(avatarContainer)

        buttonsContainer.append(tradeWeaponBtnYes, tradePotionBtnYes, tradeBtnNo)

        game.append(gameStatsContainer, buttonsContainer)


        createTradeListeners()
    } else {

        if (planet.name === "Kashyyyk" ||
            planet.name === "Mustafar" ||
            planet.name === "Coruscant" ||
            planet.name === "Dagobah"
        ) {
            planetNpc.style.color =  'white'
            planetPlanet.style.color = "white"
        }

        planetNpc.textContent = `${npc.name} is here to fight you!`

        //player stats list
        let playerStatsDiv = document.createElement("div")
        playerStatsDiv.classList = "card"
        playerStatsDiv.id = "player-stats-div"




        let playerStats = document.createElement('div')
        playerStats.id = 'player-stats'
        playerStats.classList = "card"
        let statList = document.createElement('ul')
        statList.innerHTML = `<h3>${player.name}</h3>`

        let playerScore = document.createElement('li')
        playerScore.textContent = `Score: ${player.score}`
        playerScore.id = 'player-score'

        let playerHealth = document.createElement('li')
        playerHealth.textContent = `Health: ${player.health}`
        playerHealth.id = 'player-health'

        let playerAttack = document.createElement('li')
        playerAttack.textContent = `Attack: ${player.attack}`

        let playerDefense = document.createElement('li')
        playerDefense.textContent = `Defense: ${player.defense}`

        let playerWeapon = document.createElement('li')
        playerWeapon.textContent = `Weapon: ${_currentWeapon.name}`

        let playerPotion = document.createElement('li')
        playerPotion.textContent = `Potion: ${_currentPotion.name}`
        playerPotion.id = 'player-potion'

        statList.append(playerScore, playerHealth, playerAttack, playerDefense, playerWeapon, playerPotion)
        playerStats.append(statList)

        //npc stat list
        let npcStats = document.createElement('div')
        npcStats.classList = "card"
        npcStats.id = 'npc-stats'

        let npcStatList = document.createElement('ul')
        npcStatList.innerHTML = `<h3>${npc.name}</h3>`

        let npcHealth = document.createElement('li')
        npcHealth.textContent = `Health: ${npc.health}`
        npcHealth.id = 'npc-health'

        let npcWeapon = document.createElement('li')
        let npcWeaponEquipped = _weapons.filter((weapon) => weapon.id === npc.weapon_id)[0]
        npcWeapon.textContent = `Weapon: ${npcWeaponEquipped.name}`

        npcStatList.append(npcHealth, npcWeapon)
        npcStats.append(npcStatList)

        gameStatsContainer.append(playerStats, npcStats)

        let buttonsContainer = document.createElement("div")
        buttonsContainer.id = "buttons-container"

        if (player.potion_id != 3) {
            let takePotion = document.createElement('button')
            takePotion.id = 'take-potion'
            takePotion.setAttribute('data-toggle', 'modal')
            takePotion.setAttribute('data-target', '#consume-potion-modal')
            takePotion.classList = "btn btn-primary" //possible conflict//
            takePotion.textContent = 'Take Potion'
            buttonsContainer.append(takePotion)
        }
        if (player.score >= 100) {
            let runBtn = document.createElement('button')
            runBtn.id = 'run-btn'
            runBtn.classList = "btn btn-primary" //possible conflict//
            runBtn.setAttribute('data-toggle', 'modal')
            runBtn.setAttribute('data-target', '#flee-modal')
            runBtn.textContent = 'Run (-100 pts)'
            buttonsContainer.append(runBtn)
        }

        let attackBtn = document.createElement('button')
        attackBtn.id = 'attack-btn'
        attackBtn.classList = "btn btn-primary" //possible conflict//
        attackBtn.setAttribute('data-toggle', 'modal')
        attackBtn.setAttribute('data-target', '#player-attack-modal')
        attackBtn.textContent = 'Attack'

        buttonsContainer.append(attackBtn)

        /////avatar stuff////
        let avatarContainer = document.createElement('div')
        avatarContainer.id = "avatar-container"

        let playerAvatar = document.createElement('div')
        playerAvatar.id = "player-avatar"

        let playerAvatarType = _types.filter((type) => type.id === _current_player.type_id)[0]
    

        let npcAvatar = document.createElement('div')
        npcAvatar.id = "npc-avatar"

        let npcFirstName 

        if (_currentNpc.name.includes(" ")) {
            npcFirstName = _currentNpc.name.split(' ')
            let npcImageName = npcFirstName.join('')
            npcFirstName = npcImageName
            console.log(npcImageName)
        } else {
            npcFirstName = _currentNpc.name
            console.log(npcFirstName)
        }

        npcAvatar.innerHTML = `<img src='images/villians/${npcFirstName}.png'>`

        playerAvatar.innerHTML = `<img src='images/types/${playerAvatarType.name}.png'>`


        avatarContainer.append(playerAvatar, npcAvatar)

        game.append(planetPlanet, planetNpc, avatarContainer, gameStatsContainer, buttonsContainer)


        createFightListeners()
    }
}

function createTradeListeners() {
    let tradeWeaponYesBtn = document.getElementById('trade-weapon-yes')
    tradeWeaponYesBtn.addEventListener('click', () => acceptTradeWeapon())

    let tradePotionYesBtn = document.getElementById('trade-potion-yes')
    tradePotionYesBtn.addEventListener('click', () => acceptTradePotion())

    let tradeNoBtn = document.getElementById('trade-no')
    tradeNoBtn.addEventListener('click', () => denyTrade())

}

function acceptTradePotion() {
    let npc = _npcs.filter((npc) => npc.id === _currentPlanet.npc_id)[0]
    let npcPotion = npc.potion_id
    let player = {
        potion_id: npcPotion
    }
    fetch(`${PLAYERS_URL}/${_current_player.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(player)
    }).then(res => res.json())
        .then((player) => {
            _currentPotion = _potions.filter((potion) => potion.id === player.potion_id)[0]
        })
    tradePotionAlert.textContent = `Your potion is now a ${_potions.filter((potion) => potion.id === npc.potion_id)[0].name} potion!`
    tradePotionModal()
}
function showTravelModal() {
    travelModal()
    $("#travel-modal").modal('show');
    timeoutID = setTimeout(function () { renderPlanet(_current_player) }, 2000)
}

function acceptTradeWeapon() {
    let npc = _npcs.filter((npc) => npc.id === _currentPlanet.npc_id)[0]
    let npcWeapon = npc.weapon_id
    let player = {
        weapon_id: npcWeapon
    }
    fetch(`${PLAYERS_URL}/${_current_player.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(player)
    }).then(res => res.json())
        .then((player) => {
            _currentWeapon = _weapons.filter((weapon) => weapon.id === player.weapon_id)[0]
        })
    tradeWeaponAlert.textContent = `Your weapon is now a ${_weapons.filter((weapon) => weapon.id === npc.weapon_id)[0].name}!`
    tradeWeaponModal()
}

function denyTrade() {
    // denyTradeAlert.textContent = `You have chosen not to trade`
    denyTradeModal()
    timeoutID = setTimeout(function () { renderPlanet(_current_player) }, 2000)
}

function createFightListeners() {
    if (_current_player.potion_id != 3) {
        let takeFightPotion = document.getElementById('take-potion')
        takeFightPotion.addEventListener('click', () => consumePotion())
    }

    if (_currentScore >= 100) {
        let runAway = document.getElementById('run-btn')
        runAway.addEventListener('click', () => runFarAway())
    }

    let attackFightBtn = document.getElementById('attack-btn')
    attackFightBtn.addEventListener('click', () => attack())
}

function runFarAway() {
    _currentScore = _currentScore - 100
    let player = {
        health: _currentHealth,
        score: _currentScore
    }

    let healthPromise = fetch(`${PLAYERS_URL}/${_current_player.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(player)
    }).then(res => res.json())

    Promise.all([healthPromise]).then(data => {
        _current_player = data[0]
        fleeAlert.textContent = `Fleeing to new planet...`
        fleeModal()
        $("#flee-modal").modal('show');
        timeoutID = setTimeout(function() {renderPlanet(_current_player)}, 2000) 
    })
}

function consumePotion() {
    let newHealth = _currentHealth + _currentPotion.health_points
    document.getElementById('take-potion').style.display = 'none'
    document.getElementById('player-potion').textContent = `Potion: none`

    consumePotionAlert = "Your health has been increased!"
    consumePotionModal()
    timeoutID = setTimeout(function () { $("#consume-potion-modal").modal('hide'); }, 1500)


    document.getElementById('player-health').textContent = `Health: ${newHealth}`

    let player = {
        health: newHealth,
        potion_id: 3
    }

    fetch(`${PLAYERS_URL}/${_current_player.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(player)
    }).then(res => res.json())
        .then((player) => {
            _currentPotion = _potions.filter((potion) => potion.id === player.potion_id)[0]
        })
}

function attack() {
    _playerAttack = _current_player.attack

    playerAttackAlert = ''

    let damagePoints = [-10, -5, 0, 0, 0, 0, 5, 10]
    playerDamagePointDifference = damagePoints[Math.floor(Math.random() * damagePoints.length)]
    _playerAttack = _playerAttack + playerDamagePointDifference

    _npcHealth = _npcHealth - _playerAttack

    playerAttackSequence(playerDamagePointDifference)
}

function enemyAttack() {
    console.log('enemy attack connected')
    _npcAttack = _currentNpc.attack
    let damagePoints = [-10, -5, 0, 0, 0, 0, 5, 10]
    npcDamagePointDifference = damagePoints[Math.floor(Math.random() * damagePoints.length)]
    // console.log(npcDamagePointDifference)
    _npcAttack = _npcAttack + npcDamagePointDifference
    // console.log(_npcAttack)
    _currentHealth = _currentHealth - _npcAttack
    // console.log(_currentHealth)
    npcPrepAlert = `The enemy is preparing their attack...`
    console.log(npcPrepAlert)
    npcPrepModal()
    // timeoutID = setTimeout(function () { $("#npc-prep-modal").modal('show'); }, 3000)
    $("#npc-prep-modal").modal('show');
    timeoutID = setTimeout(function () { $("#npc-prep-modal").modal('hide') }, 1500)

    npcAttackSequence(_currentNpc, npcDamagePointDifference)
    
    if (_currentHealth <= 0) {
        _players.push(_current_player)
        playerDefeatedAlert = `You have been defeated.`
        playerDefeatedModal()
        console.log(playerDefeatedAlert)//////////////////////////////////////////////////????////////////////////////////////////
        timeoutID = setTimeout(function () { $("#player-defeated-modal").modal('show') }, 4000)

    } else {
        document.getElementById('player-health').textContent = `Health: ${_currentHealth}`
    }
}

function showReturnModal() {
    returnModal()
    $("#return-modal").modal('show');
    timeoutID = setTimeout(function () { document.location.reload() }, 2000)
}

function removePlayerAttackModal() {
    setTimeout(function () {document.getElementById('player-attack-modal').remove()}, 4500)
}

function playerAttackSequence(playerDamagePointDifference) {
    if (playerDamagePointDifference > 0) {
        playerAttackAlert = `Your ${_currentWeapon.name} was very effective and did ${_playerAttack} points worth of damage!`
        playerAttackModal(playerAttackAlert)
        timeoutID = setTimeout(function () { $("#player-attack-modal").modal('hide') }, 2000)
        console.log(playerAttackAlert)
        console.log(playerDamagePointDifference)
        removePlayerAttackModal()
    } else if (playerDamagePointDifference == 0) {
        playerAttackAlert = `Your ${_currentWeapon.name} did ${_playerAttack} points worth of damage.`
        playerAttackModal(playerAttackAlert)
        timeoutID = setTimeout(function () { $("#player-attack-modal").modal('hide') }, 2000)
        console.log(playerAttackAlert)
        console.log(playerDamagePointDifference)
        removePlayerAttackModal()
    } else if (playerDamagePointDifference < 0) {
        playerAttackAlert = `Your ${_currentWeapon.name} was not very effective and only did ${_playerAttack} points worth of damage.`
        playerAttackModal(playerAttackAlert)
        timeoutID = setTimeout(function () { $("#player-attack-modal").modal('hide') }, 2000)
        console.log(playerAttackAlert)
        console.log(playerDamagePointDifference)
        removePlayerAttackModal()
    }
    if (_npcHealth <= 0) {
        _currentPlanet.point_value = _currentNpc.defense
        _currentScore = _currentScore + _currentPlanet.point_value
        
        npcDefeatedAlert = `You have defeated the enemy!!!` 
        npcDefeatedModal()
        timeoutID = setTimeout(function () {
            $("#npc-defeated-modal").modal('show')
        }, 4000)
        // timeoutID = setTimeout(function () { $("#npc-attack-modal").modal('hide'); }, 2500)

        // timeoutID = setTimeout(function () {document.getElementById('npc-defeated-btn').addEventListener('click', showTravelModal())}, 5000)

        let player = {
            health: _currentHealth,
            score: _currentScore
        }
        
        let healthPromise = fetch(`${PLAYERS_URL}/${_current_player.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(player)
        }).then(res => res.json())

        Promise.all([healthPromise]).then(data => {
            _current_player = data[0]
        })
    } else {
        document.getElementById('npc-health').textContent = `Health: ${_npcHealth}`
        
        timeoutID = setTimeout(function () { enemyAttack() }, 2500)
    }
}

function removeNpcAttackModal() {
    setTimeout(function () {document.getElementById('npc-attack-modal').remove()}, 4500)
}

function npcAttackSequence(_currentNpc, npcDamagePointDifference) {
    if (npcDamagePointDifference > 0) {
        npcAttackAlert = `${_currentNpc.name}'s attack was very effective!!!`
        npcAttackModal(npcAttackAlert)
        console.log(npcAttackAlert)
        console.log(npcDamagePointDifference)
        timeoutID = setTimeout(function() {$("#npc-attack-modal").modal('show');}, 2500) 
        timeoutID = setTimeout(function () { $("#npc-attack-modal").modal('hide'); }, 4500)
        
    } else if (npcDamagePointDifference == 0) {
        npcAttackAlert = `${_currentNpc.name}'s attack was moderately effective!`
        npcAttackModal(npcAttackAlert) 
        console.log(npcAttackAlert)
        console.log(npcDamagePointDifference)
        timeoutID = setTimeout(function() {$("#npc-attack-modal").modal('show');}, 2500)
        timeoutID = setTimeout(function () { $("#npc-attack-modal").modal('hide');}, 4500)
        
    } else if (npcDamagePointDifference < 0) {
        npcAttackAlert = `${_currentNpc.name}'s attack was not very effective.`
        npcAttackModal(npcAttackAlert)
        console.log(npcAttackAlert)
        console.log(npcDamagePointDifference) 
        timeoutID = setTimeout(function() {$("#npc-attack-modal").modal('show');}, 2500)
        timeoutID = setTimeout(function () { $("#npc-attack-modal").modal('hide'); }, 4500)
    }
    removeNpcAttackModal()
}



function tradePotionModal() {
  let closeBtn = document.createElement('button')
  closeBtn.className = 'btn btn-primary'
  closeBtn.setAttribute('data-dismiss', 'modal')
  closeBtn.textContent = 'X'
  closeBtn.setAttribute('data-toggle', 'modal')
  closeBtn.setAttribute('data-target', 'travel-modal')
  closeBtn.addEventListener('click', () => showTravelModal())

  let modalFooter = document.createElement('div')
  modalFooter.id = 'tradepotionfooter'
  modalFooter.className = 'modal-footer'
  modalFooter.append(closeBtn)

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(tradePotionAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody, modalFooter)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'trade-potion-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

function tradeWeaponModal() {
  let closeBtn = document.createElement('button')
  closeBtn.className = 'btn btn-primary'
  closeBtn.setAttribute('data-dismiss', 'modal')
  closeBtn.textContent = 'X'
  closeBtn.setAttribute('data-toggle', 'modal')
  closeBtn.setAttribute('data-target', 'travel-modal')
  closeBtn.addEventListener('click', () => showTravelModal())

  let modalFooter = document.createElement('div')
  modalFooter.id = 'tradeweaponfooter'
  modalFooter.className = 'modal-footer'
  modalFooter.append(closeBtn)

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(tradeWeaponAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody, modalFooter)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'trade-weapon-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

function denyTradeModal() {
  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'deny-trade-modal'
  modal.setAttribute('tabindex', '-1')
  modal.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>${denyTradeAlert}</p>
      </div>
    </div>
  </div>`

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

function consumePotionModal() {

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(consumePotionAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'consume-potion-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

////////////////////////// attack sequence modals
function playerAttackModal(playerAttackAlert) {  
    console.log(playerAttackAlert)
let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'player-attack-modal'
  modal.setAttribute('tabindex', '-1')
  modal.innerHTML = `
    <div class="modal-dialog" id="player-attack-modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>${playerAttackAlert}</p>
      </div> 
      
    </div>
  </div>`

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

function npcPrepModal() {

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'npc-prep-modal'
  modal.setAttribute('tabindex', '-1')
  modal.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>${npcPrepAlert}</p>
      </div>
      
    </div>
  </div>`

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

function npcAttackModal(npcAttackAlert) {
  console.log(npcAttackAlert)

  // let closeBtn = document.createElement('button')
  // closeBtn.className = 'btn btn-primary'
  // closeBtn.setAttribute('data-dismiss', 'modal')
  // closeBtn.textContent = 'X'

  // let modalFooter = document.createElement('div')
  // modalFooter.id = 'npc-attack-footer'
  // modalFooter.className = 'modal-footer'
  // modalFooter.append(closeBtn)

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(npcAttackAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  
  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'npc-attack-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}


//////////////////////end attack sequence modals //////////////////////////

function travelModal() {
  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'travel-modal'
  modal.setAttribute('tabindex', '-1')
  modal.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>${travelAlert}</p>
      </div>
    </div>
  </div>`

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)

}
function fleeModal() {

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(fleeAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'flee-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}
function npcDefeatedModal() {
  let closeBtn = document.createElement('button')
  closeBtn.className = 'btn btn-primary'
  closeBtn.setAttribute('data-dismiss', 'modal')
  closeBtn.textContent = 'X'
  closeBtn.setAttribute('data-toggle', 'modal')
  closeBtn.setAttribute('data-target', 'travel-modal')
  closeBtn.addEventListener('click', () => showTravelModal())

  let modalFooter = document.createElement('div')
  modalFooter.className = 'modal-footer'
  modalFooter.append(closeBtn)

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(npcDefeatedAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody, modalFooter)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'npc-defeated-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
  // let modal = document.createElement('div')
  // modal.className = 'modal custom fade'
  // modal.id = 'npc-defeated-modal'
  // modal.setAttribute('tabindex', '-1')
  // modal.innerHTML = `<div class="modal-dialog">
  //   <div class="modal-content">
  //     <div class="modal-body">
  //       <p>${npcDefeatedAlert}</p>
  //     </div>
  //     <div class="modal-footer">
  //       <button type="button" class="btn btn-primary" id="npc-defeated-btn" data-toggle="modal" data-target="travel-modal" data-dismiss="modal">X</button>
  //     </div>
  //   </div>
  // </div>`
  // let alertWin = document.getElementById('alert-window')
  // alertWin.append(modal)
}


function playerDefeatedModal() {
  let closeBtn = document.createElement('button')
  closeBtn.className = 'btn btn-primary'
  closeBtn.setAttribute('data-dismiss', 'modal')
  closeBtn.textContent = 'X'
  closeBtn.setAttribute('data-toggle', 'modal')
  closeBtn.setAttribute('data-target', 'return-modal')
  timeoutID = setTimeout(function () { closeBtn.addEventListener('click', () => showReturnModal()) }, 5000)

  let modalFooter = document.createElement('div')
  modalFooter.id = 'player-defeated-footer'
  modalFooter.className = 'modal-footer'
  modalFooter.append(closeBtn)

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(playerDefeatedAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody, modalFooter)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'player-defeated-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

function quitModal() {

  let modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalBody.append(quitAlert)

  let modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modalBody)

  let modalDialog = document.createElement('div')
  modalDialog.className = 'modal-dialog'
  modalDialog.append(modalContent)

  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'quit-modal'
  modal.setAttribute('tabindex', '-1')
  modal.append(modalDialog)

  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}

function returnModal() {
  let modal = document.createElement('div')
  modal.className = 'modal custom fade'
  modal.id = 'return-modal'
  modal.setAttribute('tabindex', '-1')
  modal.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>${returnAlert}</p>
      </div>
    </div>
  </div>`


  let alertWin = document.getElementById('alert-window')
  alertWin.append(modal)
}