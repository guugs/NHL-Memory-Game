const cardArray=[
    {
        name:'leafs',
        img: 'images/leafs.png'
    },
    {
        name:'oilers',
        img: 'images/oilers.png'
    },
    {
        name:'sens',
        img: 'images/sens.png'
    },
    {
        name:'habs',
        img: 'images/habs.png'
    },
    {
        name:'flames',
        img: 'images/flames.png'
    },
    {
        name:'canucks',
        img: 'images/canucks.png'
    },
    {
        name:'leafs',
        img: 'images/leafs.png'
    },
    {
        name:'oilers',
        img: 'images/oilers.png'
    },
    {
        name:'sens',
        img: 'images/sens.png'
    },
    {
        name:'habs',
        img: 'images/habs.png'
    },
    {
        name:'flames',
        img: 'images/flames.png'
    },
    {
        name:'canucks',
        img: 'images/canucks.png'
    },
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds= []
const cardsWon = []

const startingMinutes = 1;
let time = startingMinutes * 60;
const countdownEl = document.getElementById('countdown');

function createBoard (){
    for(let i =0; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/puck.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}
clock = setInterval(startTimer, 1000)
function startTimer (){
    const cards = document.querySelectorAll('#grid img')
    const minutes = Math.floor(time/60)
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds: seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`
    time--;
    if (time < 0) {
        resultDisplay.textContent = 'You Lost! Refresh to play again!'
        clearInterval(clock)
        for(let i =0; i < cardArray.length; i++){
            cards[i].removeEventListener('click',flipCard)
        }
    }

}
createBoard()


function checkMatch(){
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId){
        alert('Click a different card!')
        cards[optionOneId].setAttribute('src', 'images/puck.png')
        cards[optionTwoId].setAttribute('src', 'images/puck.png')
    }

    else if (cardsChosen[0] == cardsChosen[1]){
        // alert('You found a match!')
        cards[optionOneId].setAttribute('src','images/blank.png')
        cards[optionTwoId].setAttribute('src','images/blank.png')
        cards[optionOneId].removeEventListener('click',flipCard)
        cards[optionTwoId].removeEventListener('click',flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/puck.png')
        cards[optionTwoId].setAttribute('src', 'images/puck.png')

    }
    resultDisplay.textContent = cardsWon.length

    cardsChosen = []
    cardsChosenIds = []
    if(cardsWon.length == (cardArray.length/2)){
        resultDisplay.textContent = 'You Won! Refresh to play again'
        clearInterval(clock)

    }

}

function flipCard (){
    const cards = document.querySelectorAll('#grid img')
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length > 2){
        alert('Woah! Slow down!')
        for(let i =0; i < cardsChosen.length; i++){
            cards[cardsChosenIds[i]].setAttribute('src', 'images/puck.png')
        }
        cardsChosen = []
        cardsChosenIds = []
    }
   else  if (cardsChosen.length === 2){
        setTimeout(checkMatch, 500)
    }
}   