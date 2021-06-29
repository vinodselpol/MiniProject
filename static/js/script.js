// challenge 1 : to calculate the days 
function Days(){
    var birthYear=prompt('What year were you born');
    let ageindays=(2021-birthYear);
    var h1= document.createElement('h1');
    var textAnswer= document.createTextNode(' you are '+ ageindays+' years old ');
    h1.setAttribute('id', 'ageindays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageindays').remove();
}

// Challenge 2: Cat generator 

function catgen(){
    var img=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    img.src="https://1.bp.blogspot.com/-3YvPT5Wo1d0/YHyYqkBxDJI/AAAAAAAAPUY/1HoRGCebDDYMlU8FkDOV5roaym207X4MgCLcBGAsYHQ/s16000/Funny%2BCat%2BGIF%2B%25E2%2580%25A2%2B%2527Minette%2527%2Bpurrfectly%2Bvibing%2Bto%2Bthe%2Bmusic.%2BMoving%2Bher%2Bhead%2Bup%2B%2526%2Bdown%252C%2Bshe%2Blooks%2Bso%2Bhappy.gif",
div.appendChild(img);
}

//challenge 3: rock,paper, scissors

function rpsgame(yourChoice){
    console.log(yourChoice);
    var  humanChoice, botChoice;
    humanChoice=yourChoice.id;
botChoice=numberTochoice(randtorps());
console.log('computer choice:',botChoice);
results=decideWinner(humanChoice,botChoice);
console.log(results);
message=finalMessage(results);
console.log(message);
rpsFrontEnd(yourChoice.id,botChoice,message)
}

function randtorps(){
    return Math.floor(Math.random()*3);

}
function numberTochoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase={
        'rock':{'scissors':1, 'rock':0.5,'paper':0},
        'paper':{'rock':1, 'paper':0.5,'scissors':0},
        'scissors':{'paper':1, 'scissors':0.5,'rock':0},
    };

    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]){
    if(yourScore=== 0 ){
        return {'message': 'you lost','color':'red'};
    }
    else if (yourScore==0.5){
        return {'message': 'you tied','color':'yellow'};
    }
        else {
            return {'message': 'you won','color':'green'};
        }

}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }

    //lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='" +imagesDatabase[humanImageChoice] + "'height =150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50,233,1);'>"
    messageDiv.innerHTML="<h1 style='color:" + finalMessage['color']+"; font-size:60px; padding:30px;'>" + finalMessage['message']+ "</h1>"
    botDiv.innerHTML="<img src='" +imagesDatabase[botImageChoice] + "'height =150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38,24,1);'>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    

}

// challenge 4

var all_buttons=document.getElementsByTagName('button');


var copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonthingy){
    if (buttonthingy.value ==='red'){
        buttonsRed();
    } else if (buttonthingy.value === 'green'){
        buttonsGreen();
    } else if (buttonthingy.value ==='reset'){
        buttonsReset();
    } else if (buttonthingy.value ==='random'){
        buttonsRandom();
    }
}

function buttonsRed(){
    for (let i=0;i< all_buttons.length;i++) {
     all_buttons[i].classList.remove(all_buttons[i].classList[1]);
     all_buttons[i].classList.add('btn-danger');
    }
} 

function buttonsGreen(){
    for (let i=0;i< all_buttons.length;i++) {
     all_buttons[i].classList.remove(all_buttons[i].classList[1]);
     all_buttons[i].classList.add('btn-success');
    }
} 

function buttonsReset(){
    for (let i=0;i< all_buttons.length;i++) {
     all_buttons[i].classList.remove(all_buttons[i].classList[1]);
     all_buttons[i].classList.add(copyAllButtons[i]);
    }
} 
function buttonsRandom(){
    let choices=['btn-primary','btn-warning','btn-success','btn-danger'];
    for (let i=0;i< all_buttons.length;i++) {
        let randomNumber= Math.floor(Math.random()*4);
     all_buttons[i].classList.remove(all_buttons[i].classList[1]);
     all_buttons[i].classList.add(choices[randomNumber]);
    }
} 


// challenge 5-blackjack
let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5, '6':6,'7':7,'8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};
const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']

const hitsound= new Audio('static/sounds/swish.m4a');
const winsound= new Audio('static/sounds/cash.mp3');
const lossound= new Audio('static/sounds/aww.mp3');

document.querySelector("#blackjack-hit-button").addEventListener('click', blackjackhit);
document.querySelector("#blackjack-stand-button").addEventListener('click', dealerLogic);
document.querySelector("#blackjack-deal-button").addEventListener('click', blackjackdeal);

function blackjackhit(){
    if(blackjackGame['isStand']=== false ) {
    let card=randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
   
    }
}

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21) {
        let cardImage=document.createElement('img');
        cardImage.src=`static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }
    
}

function blackjackdeal(){

    if (blackjackGame['turnsOver'] === true)
   {
       blackjackGame['isStand']= false;
    let yourImage= document.querySelector('#your-box').querySelectorAll('img');
    let dealerImage= document.querySelector('#dealer-box').querySelectorAll('img');

    for (let i=0;i<yourImage.length;i++) {
        yourImage[i].remove();
    }
    for (let i=0;i<dealerImage.length;i++) {
        dealerImage[i].remove();
    
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#your-blackjack-result').textContent =0;
    document.querySelector('#dealer-blackjack-result').textContent =0;
    document.querySelector('#your-blackjack-result').style.color= 'white'; 
    document.querySelector('#dealer-blackjack-result').style.color= 'white'; 
    document.querySelector('#blackjack-result').textContent= 'Lets play'; 
    document.querySelector('#blackjack-result').style.color= 'black'; 
    blackjackGame['turnsOver']= true;
 }
}

function updateScore(card, activePlayer){

    if (card ==='A') {
        if (activePlayer['score']+ blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score']+= blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score']+ blackjackGame['cardsMap'][card][0];
        }
    } else {
    activePlayer['score'] +=blackjackGame['cardsMap'][card];
}
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent= 'BUST!';   
        document.querySelector(activePlayer['scoreSpan']).style.color= 'red';   
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent= activePlayer['score'];
    }
    
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){

        blackjackGame['isStand']= true;

        while(DEALER['score']<16 && blackjackGame['isStand']=== true) {
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
        blackjackGame['turnsOver']= true;
        let winner= computerWinner();
        showResult(winner);
      
    
}
// function to compute winner 
function computerWinner(){
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] ||(DEALER['score']> 21)){
            blackjackGame['wins']++;
            winner= YOU;
        } else if (YOU['score']< DEALER['score']) {
            blackjackGame['losses']++;
             winner= DEALER;
        } else if (YOU['score']=== DEALER['score']){
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <=21) {
        blackjackGame['losses']++;
        winner= DEALER;
    } else if (YOU['score']> 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log(blackjackGame)
    return winner;
}
// function to show result
function showResult(winner){

    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){

        if (winner === YOU) {
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            message = 'you won';
            messageColor='green';
            winsound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent=blackjackGame['losses'];
            message='you lost';
            messageColor='red';
            lossound.play();
        } else {
            document.querySelector('#draws').textContent=blackjackGame['draws'];
        message='you drew';
        messageColor='black';
        }
    document.querySelector('#blackjack-result').textContent= message;
    document.querySelector('#blackjack-result').style.color= messageColor;
    }
}
