let _currentPlanet




function renderPlanet(player) {
    console.log(player)
    home.style.display = "none"
    game.innerHTML = ''
    let playerId = player.id
    let planetId = _planets[Math.floor(Math.random() * _planets.length)].id
    let npcId = _npcs[Math.floor(Math.random() * _npcs.length)].id

    let data = {
        player_id: playerId,
        planet_id: planetId,
        npc_id: npcId
    }

    let configObj = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(PLAYERPLANETS_URL, configObj)
        .then(res => res.json())
        .then((data) => {
            _player_planets.push(data)
            _currentPlanet = data
            renderPlayerPlanet(data)
            // console.log(data)
        })
}

function renderPlayerPlanet(playerplanet) {
    // console.log(playerplanet)
    let planetPlayer = document.createElement("h5")
    // let player = _players.filter((player) => player.id === playerplanet.player_id)[0]
    let player = _current_player
    planetPlayer.textContent = player.name

    let planetPlanet = document.createElement("h5")
    let planet = _planets.filter((planet) => planet.id === playerplanet.planet_id)[0]
    planetPlanet.textContent = `Welcome to ${planet.name}, ${player.name}!`


    let planetNpc = document.createElement("h5")
    _currentNpc = _npcs.filter((npc) => npc.id === playerplanet.npc_id)[0]
    let npc = _currentNpc
    _npcHealth = npc.health
    _npcAttack = npc.attack
    _npcDefense = npc.defense
    _npcWeapon = _weapons.filter(weapon => weapon.id === npc.weapon_id)[0]
    if (npc.is_friendly == true) {
        planetNpc.textContent = `${npc.name} is here to greet you! Would you like to trade for an item?`
        let tradeBtnYes = document.createElement('button')
        tradeBtnYes.id = 'trade-yes'
        tradeBtnYes.textContent = 'Yes'
        let tradeBtnNo = document.createElement('button')
        tradeBtnNo.id = 'trade-no'
        tradeBtnNo.textContent = 'No'
        game.append(planetPlanet, planetNpc, tradeBtnYes, tradeBtnNo)
        createTradeListeners()
    } else {
        planetNpc.textContent = `${npc.name} is here to fight you!`

        //player stats list
        let playerStats = document.createElement('div')
        playerStats.id = 'player-stats'
        let statList = document.createElement('ul')
        let playerHealth = document.createElement('li')
        playerHealth.textContent = `Health: ${player.health}`
        console.log(player)
        console.log(_current_player)
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
        statList.append(playerHealth, playerAttack, playerDefense, playerWeapon, playerPotion)
        playerStats.append(statList)

        //npc stat list
        let npcStats = document.createElement('div')
        npcStats.id = 'npc-stats'
        let npcStatList = document.createElement('ul')
        let npcHealth = document.createElement('li')
        npcHealth.textContent = `Health: ${npc.health}`
        npcHealth.id = 'npc-health'
        let npcWeapon = document.createElement('li')
        let npcWeaponEquipped = _weapons.filter((weapon) => weapon.id === npc.weapon_id)[0]
        npcWeapon.textContent = `Weapon: ${npcWeaponEquipped.name}`
        npcStatList.append(npcHealth, npcWeapon)
        npcStats.append(npcStatList)

        game.append(planetPlanet, planetNpc, playerStats, npcStats)

        //option buttons
        if (player.potion_id != 3) {
          let takePotion = document.createElement('button')
          takePotion.id = 'take-potion'
          takePotion.textContent = 'Take Potion'
          game.append(takePotion)
        }

        let attackBtn = document.createElement('button')
        attackBtn.id = 'attack-btn'
        attackBtn.textContent = 'Attack'

        game.append(attackBtn)

        createFightListeners()

    }

}

function createTradeListeners() {
    let tradeYesBtn = document.getElementById('trade-yes')
    tradeYesBtn.addEventListener('click', () => acceptTrade())
    let tradeNoBtn = document.getElementById('trade-no')
    tradeNoBtn.addEventListener('click', () => denyTrade())

}

function acceptTrade() {
    let npc = _npcs.filter((npc) => npc.id === _currentPlanet.npc_id)[0]
    let npcWeapon = npc.weapon_id
    let player = {
        // id: _current_player.id,
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
    alert(`Your weapon is now a ${_currentWeapon.name}!`)
    alert('Traveling to new planet...')
    renderPlanet(_current_player)
}

function denyTrade() {
    alert("Traveling to new planet...")
    renderPlanet(_current_player)
}

function createFightListeners() {
    let takeFightPotion = document.getElementById('take-potion')
    takeFightPotion.addEventListener('click', () => consumePotion())
    let attackFightBtn = document.getElementById('attack-btn')
    attackFightBtn.addEventListener('click', () => attack())

}

function consumePotion() {
    console.log("potion connected")
    console.log(_currentHealth)
    let newHealth = _currentHealth + _currentPotion.health_points
    console.log(newHealth)
    document.getElementById('take-potion').style.display = 'none'
    document.getElementById('player-potion').textContent = `Potion: none`
    alert("Your health has been increased!")
    document.getElementById('player-health').textContent = `Health: ${newHealth}`

    let player = {
        // id: _current_player.id,
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
    _npcHealth = _npcHealth - _playerAttack
    alert(`Your ${_currentWeapon.name} did ${_playerAttack} points worth of damage to ${_currentNpc.name}`)
    if (_npcHealth <= 0) {
        alert(`You have defeated ${_currentNpc.name}!!!`)
        let player = {
            // id: _current_player.id,
            health: _currentHealth
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
            alert('Traveling to new planet...')
            _current_player = data[0]
            renderPlanet(_current_player)
        })
        // renderPlanet(_current_player)

    } else {
        document.getElementById('npc-health').textContent = `Health: ${_npcHealth}`
        enemyAttack()
    }

}

function enemyAttack() {
    _currentHealth = _currentHealth - _npcAttack
    alert(`${_currentNpc.name} is preparing their attack...`)
    alert(`${_currentNpc.name}'s ${_npcWeapon.name} did ${_npcAttack} points worth of damage to you!!!`)
    if (_currentHealth <= 0) {
        alert(`${_currentNpc.name} has defeated you!`)
        alert(`Returning to base...`)
        game.style.display = 'none'
        home.style.display = 'block'
    } else {
        document.getElementById('player-health').textContent = `Health: ${_currentHealth}`
    }
}
