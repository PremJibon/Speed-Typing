const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input',()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true;
    arrayQuote.forEach((characterspan,index)=>{
        const character = arrayValue[index]
        if (character ==null){
            characterspan.classList.remove('correct')
            characterspan.classList.remove('incorrect')
            correct =false;
        }
        else if(character == characterspan.innerText){
            characterspan.classList.add("correct")
            characterspan.classList.remove("incorrect")
        }else{
            characterspan.classList.remove("correct")
            characterspan.classList.add("incorrect")
            correct = false
        }
    })
    if(correct) renderNewQuote();
})

function getRandomQuote(){

   return fetch(RANDOM_QUOTE_API_URL)
     .then(response => response.json())
     .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = '';
    quote.split("").forEach(character =>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText= character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}
let startTime

function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(()=>{
        timer.innerText = getTimerTime()
    },1000)
}
function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000)
}
renderNewQuote()
