




function renderPlanet(player) {
    console.log(player)
    home.style.display = "none"
    leaderboard.style.display = "none"
    div.style.display = "none"
    game.innerHTML = ''
    let playerId = player.id
    let planetId = _planets[Math.floor(Math.random() * _planets.length)].id
    let npcId = _npcs[Math.floor(Math.random() * _npcs.length)].id

    let data = {
        player_id: playerId,
        planet_id: planetId,
        npc_id: npcId
    }

    //////////////////////////////////////////


    //
    //
    // let configObj = {
    //     method: "POST",
    //     headers: {
    //         "Accept": "application/json",
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    // }
    //
    // fetch(PLAYERPLANETS_URL, configObj)
    //     .then(res => res.json())
    //     .then((data) => {
    //         _player_planets.push(data)
    //         _currentPlanet = data
    //         renderPlayerPlanet(data)
    //         console.log(data)
    //     })


    ////////////////////////////////////////////


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



    ////////////////////////////////////////////
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
        planetNpc.textContent = `${npc.name} is here to greet you! Would you like to trade for a weapon or potion?`
        ///////////////////////////
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
        /////////////////////

        let tradeWeaponBtnYes = document.createElement('button')
        tradeWeaponBtnYes.id = 'trade-weapon-yes'
        tradeWeaponBtnYes.className = 'button-clear'
        tradeWeaponBtnYes.textContent = 'Trade Weapon'

        let tradePotionBtnYes = document.createElement('button')
        tradePotionBtnYes.id = 'trade-potion-yes'
        tradePotionBtnYes.className = 'button-clear'
        tradePotionBtnYes.textContent = 'Trade/Accept Potion'

        let tradeBtnNo = document.createElement('button')
        tradeBtnNo.id = 'trade-no'
        tradeBtnNo.className = 'button-clear'
        tradeBtnNo.textContent = 'No'
        game.append(tradeWeaponBtnYes, tradePotionBtnYes, tradeBtnNo)
        createTradeListeners()
    } else {
        planetNpc.textContent = `${npc.name} is here to fight you!`

        //player stats list

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

        //npc stat list
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

        //option buttons
        if (player.potion_id != 3) {
            let takePotion = document.createElement('button')
            takePotion.id = 'take-potion'
            takePotion.className = 'button-clear'
            takePotion.textContent = 'Take Potion'
            game.append(takePotion)
        }
        if (player.score >= 100) {
            let runBtn = document.createElement('button')
            runBtn.id = 'run-btn'
            runBtn.className = 'button-clear'
            runBtn.textContent = 'Run (-100 pts)'
            game.append(runBtn)
        }

        let attackBtn = document.createElement('button')
        attackBtn.id = 'attack-btn'
        attackBtn.className = 'button-clear'
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
        // id: _current_player.id,
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
    alert(`Your potion is now a ${_potions.filter((potion) => potion.id === npc.potion_id)[0].name} potion!`)
    alert('Traveling to new planet...')
    renderPlanet(_current_player)
}

function acceptTradeWeapon() {
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
    alert(`Your weapon is now a ${_weapons.filter((weapon) => weapon.id === npc.weapon_id)[0].name}!`)
    alert('Traveling to new planet...')
    renderPlanet(_current_player)
}

function denyTrade() {
    alert("Traveling to new planet...")
    renderPlanet(_current_player)
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
        // score: //var
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
        alert("Fleeing to new planet...")
        _current_player = data[0]
        renderPlanet(_current_player)
    })
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
    _playerAttack = _current_player.attack
    let damagePoints = [-10, -5, 0, 0, 0, 0, 5, 10]
    let damagePointDifference = damagePoints[Math.floor(Math.random() * damagePoints.length)]
    _playerAttack = _playerAttack + damagePointDifference
    _npcHealth = _npcHealth - _playerAttack

    if (damagePointDifference > 0) {
        alert(`Your ${_currentWeapon.name} was very effective and did ${_playerAttack} points worth of damage to ${_currentNpc.name}!`)
    } else if (damagePointDifference == 0) {
        alert(`Your ${_currentWeapon.name} did ${_playerAttack} points worth of damage to ${_currentNpc.name}.`)
    } else if (damagePointDifference < 0) {
        alert(`Your ${_currentWeapon.name} was not very effective and only did ${_playerAttack} points worth of damage to ${_currentNpc.name}.`)
    }

    if (_npcHealth <= 0) {
        //var = player score plus planet score
        _currentPlanet.point_value = _currentNpc.defense
        _currentScore = _currentScore + _currentPlanet.point_value 

        alert(`You have defeated ${_currentNpc.name}!!!`)
        let player = {
            health: _currentHealth,
            score: _currentScore
            // score: //var
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
    _npcAttack = _currentNpc.attack
    let damagePoints = [-10, -5, 0, 0, 0, 0, 5, 10]
    let damagePointDifference = damagePoints[Math.floor(Math.random() * damagePoints.length)]
    console.log(damagePointDifference)
    _npcAttack = _npcAttack + damagePointDifference
    console.log(_npcAttack)
    _currentHealth = _currentHealth - _npcAttack
    console.log(_currentHealth)
    alert(`${_currentNpc.name} is preparing their attack...`)
    if (damagePointDifference > 0) {
        alert(`${_currentNpc.name}'s ${_npcWeapon.name} was very effective and did ${_npcAttack} points worth of damage to you!`)
    } else if (damagePointDifference == 0) {
        alert(`${_currentNpc.name}'s ${_npcWeapon.name} did ${_npcAttack} points worth of damage to you!`)
    } else if (damagePointDifference < 0) {
        alert(`${_currentNpc.name}'s ${_npcWeapon.name} was not very effective and only did ${_npcAttack} points worth of damage to you.`)
    }
    if (_currentHealth <= 0) {
        _players.push(_current_player)
        alert(`${_currentNpc.name} has defeated you!`)
        alert(`Returning to base...`)
        document.location.reload(true)
        // renderLeaderboard()
        //grab player score and add it to leaderboard

        // game.style.display = 'none'
        // home.innerHTML = ""
        // home.append(form)
        // home.style.display = 'block'
        // leaderboard.style.display = "block"
    } else {
        document.getElementById('player-health').textContent = `Health: ${_currentHealth}`
    }
}
