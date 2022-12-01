let playerFirstCard = getRandomCard()
let playerSecondCard = getRandomCard()
let dealerFirstCard = getRandomCard()
let dealerHiddenCard = getRandomCard()

let hasBlackJack = false
let isAlive = true
let hasStarted = false
let hasBet = false


let player = {
    name: "Sean",
    chips: 500  
}

let betNum = 0

let pCards = [playerFirstCard, playerSecondCard]

let dCards = [dealerFirstCard, dealerHiddenCard]

let message = ""

let pSum = playerFirstCard + playerSecondCard
let dSum = dealerFirstCard + dealerHiddenCard

let playerEl = document.getElementById("player-el")
let betMessageEl = document.getElementById("betMessage-el")

// let dCard1 = document.getElementById("dcard1")
// let dCard2 = document.getElementById("dcard2")
// let dCard3 = document.getElementById("dcard3")
// let dCard4 = document.getElementById("dcard4")
// let dCard5 = document.getElementById("dcard5")

// let pCard1 = document.getElementById("pcard1")
// let pCard2 = document.getElementById("pcard2")
// let pCard3 = document.getElementById("pcard3")
// let pCard4 = document.getElementById("pcard4")
// let pCard5 = document.getElementById("pcard5")


// let sumEl = document.querySelector("#sum-el")

let messageEl = document.getElementById("message-el")

function startGame() { //starts the game and sets up the interface
   if (hasBet) {
       if (!hasStarted) {
            resetCards()
            console.log(pCards.length)
            console.log(dCards.length)
            hasBlackJack = false
            isAlive = true 
            hasStarted = true
            let betNum = 0
            let pSum = 0
            let dSum = 0
            startPlayer()
            startDealer()
            renderGame()
            console.log(isAlive)
       }
   } else {
       messageEl.textContent = "You must make bet in order to play..."
   }
    
}

function renderGame() {  //creates card values
    updateScore()
    
    if (pSum < 21) {
        message = "Click on HIT or STAND"
        messageEl.innerText = message
        
    } else if (pSum === 21) {
        message = "The Player got Blackjack, Player Wins"
        messageEl.innerText = message
        hasBlackJack = true
        updateDealer()
        playerWins()
        hasBet = false
        hasStarted = false
    } else {
        message = "The Player Busts, the Dealer Wins"
        messageEl.textContent = message
        isAlive = false
        playerLoses()
        updateDealer()
        hasBet = false
        hasStarted = false
    }
    console.log(message)
}

function getCardImg(card) {
    if (card == 2) {
        return "redspade2.png"
    } else if (card == 3) {
        return "redspade3.png"
    } else if (card == 4) {
        return "redspade4.png"
    } else if (card == 5) {
        return "redspade5.png"
    } else if (card == 6) {
        return "redspade6.png"
    } else if (card == 7) {
        return "redspade7.png"
    } else if (card == 8) {
        return "redspade8.png"
    } else if (card == 9) {
        return "redspade9.png"
    } else if (card == 10) {
        return "redspade10.png"
    }  else if (card == 11) {
        let n = Math.floor(Math.random() * 3) + 1
        if (n == 1) {
            return "redspadeJack.png"
        } else if (n == 2) {
            return "redspadeQueen.png"
        } else {
            return "redspadeKing.png"
        }
    }
}

function playerNewCard() {
    console.log(isAlive)
    console.log(hasBlackJack)
    if (hasBet) {
        if (hasStarted) {
            if (isAlive && !hasBlackJack) {
                let pNewCard = getRandomCard()
                pCards.push(pNewCard)
                
                pSum += pNewCard
                renderGame()
                updatePlayer()
            } 
        } else {
            messageEl.textContent = "Please select START GAME..."
        }
        
    } else {
        messageEl.textContent = "You must make bet in order to play..."
    }
    
    
}

function dealerNewCard() {
    if (isAlive && !hasBlackJack && dSum < 17 && hasBet) {
        let dNewCard = getRandomCard()
        dCards.push(dNewCard)
        
        dSum += dNewCard
    } 
}


function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 10) + 2
    return randomNumber
    
}

function resetCards() {
    for (let i = 1; i <= pCards.length; i++) {
         let txt = "pcard0"
         pCard = document.getElementById(txt.replace(/0/g, i))
         pCard.src = "trans.png"
     }
     
     for (let i = 1; i <= dCards.length; i++) {
         let txt = "dcard0"
         dCard = document.getElementById(txt.replace(/0/g, i))
         dCard.src = "trans.png"
     }
}


function updateScore() {
    playerEl.textContent = "Balance: $" + player.chips
}

function startPlayer() {
    console.log("hi")
    playerFirstCard = getRandomCard()
    playerSecondCard = getRandomCard()
    pCards = [playerFirstCard, playerSecondCard]
    console.log(pCards)
    pSum = playerFirstCard + playerSecondCard
    // pCardsEl.textContent = ""
     for (let i = 1; i <= pCards.length; i++) {
         let txt = "pcard0"
         pCard = document.getElementById(txt.replace(/0/g, i))
         pCard.src = getCardImg(pCards[i-1])
     }
}

function updatePlayer() {
    for (let i = 1; i <= pCards.length; i++) {
         let txt = "pcard0"
         pCard = document.getElementById(txt.replace(/0/g, i))
         pCard.src = getCardImg(pCards[i-1])
     }
}

function startDealer () {
    dealerFirstCard = getRandomCard()
    dealerHiddenCard = getRandomCard()
    dCards = [dealerFirstCard, dealerHiddenCard]
    dSum = dealerFirstCard + dealerHiddenCard
    for (let i = 1; i <= dCards.length; i++) {
        let txt = "dcard0"
        if (i == 2) {
            dCard = document.getElementById(txt.replace(/0/g, i))
            dCard.src = "backcard.png"
        } else {
            dCard = document.getElementById(txt.replace(/0/g, i))
            dCard.src = getCardImg(dCards[i])
        }
    }
    
}

function updateDealer() {
    for (let i = 1; i <= dCards.length; i++) {
         let txt = "dcard0"
         dCard = document.getElementById(txt.replace(/0/g, i))
         dCard.src = getCardImg(dCards[i-1])
     }
}

function stand() {
    if (hasBet) {
        if (hasStarted) {
            dealerNewCard()
            updateDealer()
            if (isAlive && !hasBlackJack) {
                if (dSum > 21) {
                    message = "The Dealer Busts, Player Wins"
                    isAlive = false
                    playerWins()
                    hasStarted = false
                } else if (dSum == 21) {
                    message = "The Dealer got Blackjack, Dealer wins"
                    hasBlackJack = true
                    playerLoses()
                    hasStarted = false
                } else if (dSum >= 17){
                    if (dSum > pSum) {
                        message = "The Dealer Wins"
                        playerLoses()
                        hasStarted = false
                    } else if (dSum == pSum) {
                        message = "It's a Tie, the Bets are Returned..."
                        hasStarted = false
                    } else {
                        message = "The Player Wins"
                        playerWins()
                        hasStarted = false
                        
                    }
                    isAlive = false
                } else {
                    dealerNewCard()
                    stand()
                    
                }
                messageEl.innerText = message
                hasBet = false
            }
        } else {
            messageEl.textContent = "Please select START GAME..."
        }
    } else {
        messageEl.textContent = "You must make bet in order to play..."
    }
    
}

function bet25() {
    if (!hasBet) {
        betNum = Math.trunc(.25 * player.chips)
        message = "Click the START GAME button"
        messageEl.textContent = message
        betMessageEl.textContent = "Bet: $" + betNum
        hasBet = true
    } else {
        messageEl.textContent = "You must finish your game!"
    }
}

function bet50() {
    if (!hasBet) {
        betNum = Math.trunc(.50 * player.chips)
        message = "Click the START GAME button"
        messageEl.textContent = message
        betMessageEl.textContent = "Bet: $" + betNum
        hasBet = true
    } else {
        messageEl.textContent = "You must finish your game!"
    }
}

function bet75() {
     if (!hasBet) {
        betNum = Math.trunc(.75 * player.chips)
        message = "Click the START GAME button"
        messageEl.textContent = message
        betMessageEl.textContent = "Bet: $" + betNum
        hasBet = true
    } else {
        messageEl.textContent = "You must finish your game!"
    }
}

function bet100() {
    if (!hasBet) {
        betNum = player.chips
        message = "Click the START GAME button"
        messageEl.textContent = message
        betMessageEl.textContent = "Bet: $" + betNum
        hasBet = true
    } else {
        messageEl.textContent = "You must finish your game!"
    }
}

function playerLoses() {
    player.chips -= betNum
    playerEl.textContent = "Balance: $" + player.chips
    betMessageEl.textContent = "Bet:"
    hasBet = true
}

function playerWins() {
    player.chips += betNum
    playerEl.textContent = "Balance: $" + player.chips
    betMessageEl.textContent = "Bet:"
    hasBet = true

}


