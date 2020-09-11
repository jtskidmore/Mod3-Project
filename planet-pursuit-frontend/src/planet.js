let timeoutID;
let playerDamagePointDifference
let npcDamagePointDifference;

function reload() {
    document.location.reload(true)
}

function renderPlanet(player) {
    home.style.display = "none"
    leaderboard.style.display = "none"
    $('.modal').modal('hide');
    game.innerHTML = ''
    let playerId = player.id
    let planetId = _planets[Math.floor(Math.random() * _planets.length)].id
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
    exitBtn.textContent = "Quit Game"
    exitBtn.setAttribute('data-toggle', 'modal')
    exitBtn.setAttribute('data-target', '#quit-modal')
    exit.append(exitBtn)

    exitBtn.addEventListener('click', () => exitGame())

    let planetPlayer = document.createElement("h5")

    let player = _current_player
    planetPlayer.textContent = player.name

    let planetPlanet = document.createElement("h5")
    let planet = _planets.filter((planet) => planet.id === playerplanet.planet_id)[0]
    planetPlanet.textContent = `Welcome to ${planet.name}, ${player.name}!`

    let body = document.getElementsByTagName("BODY")[0]
    body.style.backgroundImage = `url(images/planets/${planet.name}.jpg)`

    let planetNpc = document.createElement("h5")
    _currentNpc = _npcs.filter((npc) => npc.id === playerplanet.npc_id)[0]
    let npc = _currentNpc
    _npcHealth = npc.health
    _npcAttack = npc.attack
    _npcDefense = npc.defense
    _npcWeapon = _weapons.filter(weapon => weapon.id === npc.weapon_id)[0]
    if (npc.is_friendly == true) {

        planetNpc.textContent = `${npc.name} is here to greet you! Would you like to trade for a weapon or potion?`
        let playerStats = document.createElement('div')
        playerStats.id = 'player-stats'
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

        npcStatList.append(npcPotion, npcWeapon)
        npcStats.append(npcStatList)

        game.append(planetPlanet, planetNpc, playerStats, npcStats)

        let tradeWeaponBtnYes = document.createElement('button')
        tradeWeaponBtnYes.id = 'trade-weapon-yes'
        tradeWeaponBtnYes.setAttribute('data-toggle', 'modal')
        tradeWeaponBtnYes.setAttribute('data-target', '#trade-weapon-modal')
        tradeWeaponBtnYes.textContent = 'Trade Weapon'

        let tradePotionBtnYes = document.createElement('button')
        tradePotionBtnYes.id = 'trade-potion-yes'
        tradePotionBtnYes.setAttribute('data-toggle', 'modal')
        tradePotionBtnYes.setAttribute('data-target', '#trade-potion-modal')
        tradePotionBtnYes.textContent = 'Trade/Accept Potion'

        let tradeBtnNo = document.createElement('button')
        tradeBtnNo.id = 'trade-no'
        tradeBtnNo.textContent = 'No'
        tradeBtnNo.setAttribute('data-toggle', 'modal')
        tradeBtnNo.setAttribute('data-target', '#deny-trade-modal')
        game.append(tradeWeaponBtnYes, tradePotionBtnYes, tradeBtnNo)
        createTradeListeners()
    } else {
        planetNpc.textContent = `${npc.name} is here to fight you!`

        let playerStats = document.createElement('div')
        playerStats.id = 'player-stats'
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

        let npcStats = document.createElement('div')
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

        game.append(planetPlanet, planetNpc, playerStats, npcStats)

        if (player.potion_id != 3) {
            let takePotion = document.createElement('button')
            takePotion.id = 'take-potion'
            takePotion.setAttribute('data-toggle', 'modal')
            takePotion.setAttribute('data-target', '#consume-potion-modal')
            takePotion.textContent = 'Take Potion'
            game.append(takePotion)
        }
        if (player.score >= 100) {
            let runBtn = document.createElement('button')
            runBtn.id = 'run-btn'
            runBtn.setAttribute('data-toggle', 'modal')
            runBtn.setAttribute('data-target', '#flee-modal')
            runBtn.textContent = 'Run (-100 pts)'
            game.append(runBtn)
        }

        let attackBtn = document.createElement('button')
        attackBtn.id = 'attack-btn'
        attackBtn.setAttribute('data-toggle', 'modal')
        attackBtn.setAttribute('data-target', '#player-attack-modal')
        attackBtn.textContent = 'Attack'

        game.append(attackBtn)

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

    let damagePoints = [-10, -5, 0, 0, 0, 0, 5, 10]
    playerDamagePointDifference = damagePoints[Math.floor(Math.random() * damagePoints.length)]
    _playerAttack = _playerAttack + playerDamagePointDifference

    _npcHealth = _npcHealth - _playerAttack

    playerAttackSequence(playerDamagePointDifference)
}

function enemyAttack() {
    npcPrepAlert = `${_currentNpc.name} is preparing their attack...`
    console.log('enemy attack connected')
    _npcAttack = _currentNpc.attack
    let damagePoints = [-10, -5, 0, 0, 0, 0, 5, 10]
    npcDamagePointDifference = damagePoints[Math.floor(Math.random() * damagePoints.length)]
    // console.log(npcDamagePointDifference)
    _npcAttack = _npcAttack + npcDamagePointDifference
    // console.log(_npcAttack)
    _currentHealth = _currentHealth - _npcAttack
    // console.log(_currentHealth)
    npcPrepAlert = `${_currentNpc.name} is preparing their attack...`
    console.log(npcPrepAlert)
    npcPrepModal()
    $("#npc-prep-modal").modal('show');

    npcAttackSequence(npcDamagePointDifference)
    
    if (_currentHealth <= 0) {
        _players.push(_current_player)
        playerDefeatedAlert = `${_currentNpc.name} has defeated you!`
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

function playerAttackSequence(playerDamagePointDifference) {
    if (playerDamagePointDifference > 0) {
        playerAttackAlert = `Your ${_currentWeapon.name} was very effective and did ${_playerAttack} points worth of damage to ${_currentNpc.name}!`
        playerAttackModal()
        console.log(playerAttackAlert)
    } else if (playerDamagePointDifference == 0) {
        playerAttackAlert = `Your ${_currentWeapon.name} did ${_playerAttack} points worth of damage to ${_currentNpc.name}.`
        playerAttackModal()
    } else if (playerDamagePointDifference < 0) {
        playerAttackAlert = `Your ${_currentWeapon.name} was not very effective and only did ${_playerAttack} points worth of damage to ${_currentNpc.name}.`
        playerAttackModal()
    }
    if (_npcHealth <= 0) {
        _currentPlanet.point_value = _currentNpc.defense
        _currentScore = _currentScore + _currentPlanet.point_value
        
        npcDefeatedAlert = `You have defeated ${_currentNpc.name}!!!` 
        npcDefeatedModal()
        timeoutID = setTimeout(function () {
            $("#npc-defeated-modal").modal('show')
        }, 2000)

        timeoutID = setTimeout(function () {document.getElementById('npc-defeated-btn').addEventListener('click', showTravelModal())}, 4000)

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
        
        timeoutID = setTimeout(function () { enemyAttack() }, 1500)
    }
}

function npcAttackSequence(npcDamagePointDifference) {
    if (npcDamagePointDifference > 0) {
        npcAttackAlert = `${_currentNpc.name}'s ${_npcWeapon.name} was very effective and did ${_npcAttack} points worth of damage to you!`
        npcAttackModal()
        console.log(npcAttackAlert)
        timeoutID = setTimeout(function() {$("#npc-attack-modal").modal('show');}, 2500) 
    } else if (npcDamagePointDifference == 0) {
        npcAttackAlert = `${_currentNpc.name}'s ${_npcWeapon.name} did ${_npcAttack} points worth of damage to you!`
        npcAttackModal()
        console.log(npcAttackAlert)
        timeoutID = setTimeout(function() {$("#npc-attack-modal").modal('show');}, 2500)
    } else if (npcDamagePointDifference < 0) {
        npcAttackAlert = `${_currentNpc.name}'s ${_npcWeapon.name} was not very effective and only did ${_npcAttack} points worth of damage to you.`
        npcAttackModal()
        console.log(npcAttackAlert)
        timeoutID = setTimeout(function() {$("#npc-attack-modal").modal('show');}, 2500)
    }
}
