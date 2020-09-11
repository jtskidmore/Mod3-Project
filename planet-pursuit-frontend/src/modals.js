let tradePotionAlert = document.createElement('p')
let tradeWeaponAlert = document.createElement('p')
let denyTradeAlert = `It's good to be happy with what you have! Traveling to new planet...`
let consumePotionAlert = document.createElement('p')
let playerAttackAlert //= document.createElement('p')
let playerAttackAlert2 = document.createElement('p')
let playerAttackAlert3 = document.createElement('p')
let npcPrepAlert = document.createElement('p')
let npcAttackAlert = document.createElement('p')
let travelAlert = 'Traveling to new planet...'
let fleeAlert = document.createElement('p')
let npcDefeatedAlert
let playerDefeatedAlert = document.createElement('p')
let quitAlert = `Quitting and returning to base...`
let returnAlert = 'Returning to base...'

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
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="deny-trade-btn" data-dismiss="modal">X</button>
      </div>
    </div>
  </div>`

    let alertWin = document.getElementById('alert-window')
    alertWin.append(modal)
}

function consumePotionModal() {
    let closeBtn = document.createElement('button')
    closeBtn.className = 'btn btn-primary'
    closeBtn.setAttribute('data-dismiss', 'modal')
    closeBtn.textContent = 'X'

    let modalFooter = document.createElement('div')
    modalFooter.className = 'modal-footer'
    modalFooter.id = 'takepotionfooter'
    modalFooter.append(closeBtn)

    let modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.append(consumePotionAlert)

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.append(modalBody, modalFooter)

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

function playerAttackModal() {

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
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">X</button>
      </div>
    </div>
  </div>`

    let alertWin = document.getElementById('alert-window')
    alertWin.append(modal)
}

function npcPrepModal() {
    let closeBtn = document.createElement('button')
    closeBtn.className = 'btn btn-primary'
    closeBtn.setAttribute('data-dismiss', 'modal')
    closeBtn.textContent = 'X'
    // closeBtn.addEventListener('click', () => npcAttackSequence(npcDamagePointDifference))

    let modalFooter = document.createElement('div')
    modalFooter.id = 'npcprepfooter'
    modalFooter.className = 'modal-footer'
    modalFooter.append(closeBtn)

    let modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.append(npcPrepAlert)

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.append(modalBody, modalFooter)

    let modalDialog = document.createElement('div')
    modalDialog.className = 'modal-dialog'
    modalDialog.append(modalContent)

    let modal = document.createElement('div')
    modal.className = 'modal custom fade'
    modal.id = 'npc-prep-modal'
    modal.setAttribute('tabindex', '-1')
    modal.append(modalDialog)

    let alertWin = document.getElementById('alert-window')
    alertWin.append(modal)
}

function npcAttackModal() {
    let closeBtn = document.createElement('button')
    closeBtn.className = 'btn btn-primary'
    closeBtn.setAttribute('data-dismiss', 'modal')
    closeBtn.textContent = 'X'

    let modalFooter = document.createElement('div')
    modalFooter.id = 'npc-attack-footer'
    modalFooter.className = 'modal-footer'
    modalFooter.append(closeBtn)

    let modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.append(npcAttackAlert)

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.append(modalBody, modalFooter)

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
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="travelmodalbtn" data-dismiss="modal"></button>
      </div>
    </div>
  </div>`

    let alertWin = document.getElementById('alert-window')
    alertWin.append(modal)

}
function fleeModal() {
    let closeBtn = document.createElement('button')
    closeBtn.className = 'btn btn-primary'
    closeBtn.setAttribute('data-dismiss', 'modal')
    closeBtn.textContent = ''

    let modalFooter = document.createElement('div')
    modalFooter.id = 'fleemodalfoot'
    modalFooter.className = 'modal-footer'
    modalFooter.append(closeBtn)

    let modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.append(fleeAlert)

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.append(modalBody, modalFooter)

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
    let modal = document.createElement('div')
    modal.className = 'modal custom fade'
    modal.id = 'npc-defeated-modal'
    modal.setAttribute('tabindex', '-1')
    modal.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>${npcDefeatedAlert}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="npc-defeated-btn" data-toggle="modal" data-target="travel-modal" data-dismiss="modal">X</button>
      </div>
    </div>
  </div>`
    let alertWin = document.getElementById('alert-window')
    alertWin.append(modal)
}

function playerDefeatedModal() {
    let closeBtn = document.createElement('button')
    closeBtn.className = 'btn btn-primary'
    closeBtn.setAttribute('data-dismiss', 'modal')
    closeBtn.textContent = 'X'
    closeBtn.setAttribute('data-toggle', 'modal')
    closeBtn.setAttribute('data-target', 'return-modal')
    timeoutID = setTimeout(function() {closeBtn.addEventListener('click', () => showReturnModal())}, 5000) 

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
    let closeBtn = document.createElement('button')
    closeBtn.className = 'btn btn-primary'
    closeBtn.setAttribute('data-dismiss', 'modal')
    closeBtn.textContent = ''

    let modalFooter = document.createElement('div')
    modalFooter.id = 'quitmodalfoot'
    modalFooter.className = 'modal-footer'
    modalFooter.append(closeBtn)

    let modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.append(quitAlert)

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.append(modalBody, modalFooter)

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
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">X</button>
      </div>
    </div>
  </div>`


    let alertWin = document.getElementById('alert-window')
    alertWin.append(modal)
}