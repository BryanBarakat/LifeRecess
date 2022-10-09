// each page load for each logo image

const end_game_ = document.getElementById('remove-endgame');

const home = document.getElementById('homepage');
const rockPaperScissors = document.getElementById('scissorspage');
const ticTacToe = document.getElementById('ticpage');
const settings = document.getElementById('settingsP');

const num_rounds = document.getElementById('num-rounds');

const win_res = document.getElementById('winRes');

// logo-images

const cont1 = document.getElementById('container1');
const cont2 = document.getElementById('container2');
const cont3 = document.getElementById('container3');
const cont4 = document.getElementById('container4');

const fight_box = document.getElementById('fights');

const switched_up = document.getElementById('switching');

document.body.onload = function(){
    cont1.style.display = 'block';
}

let colorHome = 'beige';
let colorRPS =  '#ff563a';
let colorTTT = '#3064ab';
let colorSettings = '#252525';

let setColor = '#f4f4f4';

home.onclick = function(){
    document.body.style.backgroundColor = colorHome;
    cont1.style.display = 'block';
    cont2.style.display = 'none';
    cont3.style.display = 'none';
    cont4.style.display = 'none';
    end_game_.style.display = 'none';
    switched_up.style.display = 'none';
    home.style.filter = 'invert(32%) sepia(35%) saturate(4254%) hue-rotate(349deg) brightness(91%) contrast(90%)';
    rockPaperScissors.style.filter = 'brightness(0) invert(1)';
    ticTacToe.style.filter = 'brightness(0) invert(1)';
    settings.style.filter = 'brightness(0) invert(1)';
    roundsDone();
    startGame();
}

rockPaperScissors.onclick = function(){
    document.body.style.backgroundColor = colorRPS;
    cont1.style.display = 'none';
    cont2.style.display = 'block';
    cont3.style.display = 'none';
    cont4.style.display = 'none';
    end_game_.style.display = 'none';
    switched_up.style.display = 'none';
    rockPaperScissors.style.filter = 'invert(32%) sepia(35%) saturate(4254%) hue-rotate(349deg) brightness(91%) contrast(90%)';
    home.style.filter = 'brightness(0) invert(1)';
    ticTacToe.style.filter = 'brightness(0) invert(1)';
    settings.style.filter = 'brightness(0) invert(1)';
    startGame();
    roundsDone();
}

ticTacToe.onclick = function(){
    document.body.style.backgroundColor = colorTTT;
    cont1.style.display = 'none';
    cont2.style.display = 'none';
    cont3.style.display = 'grid';
    cont4.style.display = 'none';
    switched_up.style.display = 'block';
    ticTacToe.style.filter = 'invert(32%) sepia(35%) saturate(4254%) hue-rotate(349deg) brightness(91%) contrast(90%)';
    rockPaperScissors.style.filter = 'brightness(0) invert(1)';
    home.style.filter = 'brightness(0) invert(1)';
    settings.style.filter = 'brightness(0) invert(1)';
    roundsDone();
}

settings.onclick = function(){
    cont1.style.display = 'none';
    cont2.style.display = 'none';
    cont3.style.display = 'none';
    cont4.style.display = 'block';
    end_game_.style.display = 'none';
    switched_up.style.display = 'none';
    document.body.style.backgroundColor = colorSettings;
    cont4.style.color = setColor;
    settings.style.filter = 'invert(32%) sepia(35%) saturate(4254%) hue-rotate(349deg) brightness(91%) contrast(90%)';
    rockPaperScissors.style.filter = 'brightness(0) invert(1)';
    ticTacToe.style.filter = 'brightness(0) invert(1)';
    home.style.filter = 'brightness(0) invert(1)';
    startGame();
    roundsDone();
}

const err = document.getElementById('errors');

const option1 = document.getElementById('rock-container');
const option2 = document.getElementById('paper-container');
const option3 = document.getElementById('scissors-container');

const counter = document.getElementById('count');

const user = document.getElementById('user-hand');
const bot = document.getElementById('bot-hand');

const nextR = document.getElementById('next-round');

const opacityChange = document.getElementById('op');

// game functions for rock paper scissors

var timeLeft = 3;
var once = 1;

var downloadTimer = 0;
var texting = 0;

function reset1(){
    timeLeft = 3;
    once = 1;
    finalGameWinner = '';
    bot.src = 'bot-hand.png';
    user.src = 'user-hand.png';
    counter.style.visibility = 'hidden';
    rockClicked = false;
    paperClicked = false;
    scissorsClicked = false;
    counter.style.fontSize = '80px';
    ClickedNum = 0;
    textWinner = '';
    counter.style.padding ='0px 0px';
    counter.style.fontFamily = 'Poppins,sans-serif';
    counter.style.backgroundColor= 'transparent';
    counter.style.color = '#cffbfa';
    counter.style.width = '100%';
    counter.style.boxShadow= '0 0px 0px transparent';
    counter.style.border = '0px solid transparent';
    counter.style.borderRadius = '0px';
    opacityChange.style.opacity = '1';
    nextR.style.pointerEvents = 'auto';
    option1.style.pointerEvents = 'auto';
    option2.style.pointerEvents = 'auto';
    option3.style.pointerEvents = 'auto';
    downloadTimer = clearInterval(downloadTimer);
    texting = clearInterval(texting);
}

nextR.onclick = function(){
    reset1();
}

let ClickedNum = 0;

let rockClicked = false;
let paperClicked = false;
let scissorsClicked = false;

let rndChoice = 0;

function doTime(){
    if(timeLeft < 0){
        cont2.style.pointerEvents = 'auto';
        clearInterval(downloadTimer);
    }
    counter.style.visibility = 'visible';
    counter.innerHTML = timeLeft;
    user.style.animation = 'MoveUpDown 650ms linear 4';
    bot.style.animation = 'MoveUpDown2 650ms linear 4';
    timeLeft -= 1;
    if(timeLeft === -1){
        user.style.animation = 'remove-user 300ms linear 1 forwards';
        bot.style.animation = 'remove-bot 300ms linear 1 forwards';
        counter.innerHTML = 'GO';
    }
}

function scoreAndText(){
    if(once === 1){
        if(once !== 1){
            clearInterval(texting);
        }
        user.style.animation = 'add-new-user 300ms linear 1';
        bot.style.animation = 'add-new-bot 300ms linear 1';
        relateImageUser(),relateImageBot();
        scenarios(ClickedNum,rndChoice);
        counter.visibility = 'hidden';
        counter.style.fontSize = '20px';
        counter.style.padding ='20px 24px';
        counter.style.fontFamily = 'Silkscreen, cursive';
        counter.style.backgroundColor= '#ff641a';
        counter.style.color = 'white';
        counter.style.width = '350px';
        counter.style.boxShadow= '0 3px 10px rgb(0 0 0 / 0.2)';
        counter.style.border = '4px solid #f03800';
        counter.style.borderRadius = '5px';
        opacityChange.style.opacity = '0.5';
        once -= 1;
        if(user_score.value === num_rounds.value){
            counter.innerHTML = 'YOU WIN THE GAME! GUESS YOU\'RE LUCKY';
            nextR.style.pointerEvents = 'none';
            option1.style.pointerEvents = 'none';
            option2.style.pointerEvents = 'none';
            option3.style.pointerEvents = 'none';
        }
        else if(bot_score.value === num_rounds.value){
            counter.innerHTML = 'THE BOT WINS THE GAME! BETTER LUCK NEXT TIME';
            nextR.style.pointerEvents = 'none';
            option1.style.pointerEvents = 'none';
            option2.style.pointerEvents = 'none';
            option3.style.pointerEvents = 'none';
        }
        else{
            nextR.style.pointerEvents = 'auto';
            counter.innerHTML = textWinner;
        }
    }
}

option1.onclick = function(){
    if(num_rounds.value !== '' && num_rounds.value <= 20 && num_rounds.value.includes('.') == false){
        cont2.style.pointerEvents = 'none';
        nextR.style.pointerEvents = 'none';
        option1.style.pointerEvents = 'none';
        option2.style.pointerEvents = 'none';
        option3.style.pointerEvents = 'none';
        err.innerHTML = '';
        err.style.display = 'none';
        num_rounds.readOnly = true;
        rockClicked = true;
        ClickedNum = 0;
        downloadTimer = setInterval(doTime,1000);
        texting = setInterval(scoreAndText,5000);
    }
    else{
        err.style.display = 'block';
        err.innerHTML = 'Please set the number of rounds [1-20]';
    }
}

option2.onclick = function(){
    if(num_rounds.value !== '' && num_rounds.value <= 20 && num_rounds.value.includes('.') == false){
        cont2.style.pointerEvents = 'none';
        nextR.style.pointerEvents = 'none';
        option1.style.pointerEvents = 'none';
        option2.style.pointerEvents = 'none';
        option3.style.pointerEvents = 'none';
        err.innerHTML = '';
        err.style.display = 'none';
        num_rounds.readOnly = true;
        paperClicked = true;
        ClickedNum = 1;
        downloadTimer = setInterval(doTime,1000);
        texting = setInterval(scoreAndText,5000);
    }
    else{
        err.style.display = 'block';
        err.innerHTML = 'Please set the number of rounds [1-20]';
    }
}

option3.onclick = function(){
    if(num_rounds.value !== '' && num_rounds.value <= 20 && num_rounds.value.includes('.') == false){
        cont2.style.pointerEvents = 'none';
        nextR.style.pointerEvents = 'none';
        option1.style.pointerEvents = 'none';
        option2.style.pointerEvents = 'none';
        option3.style.pointerEvents = 'none';
        err.innerHTML = '';
        err.style.display = 'none';
        num_rounds.readOnly = true;
        scissorsClicked = true;
        ClickedNum = 2;
        downloadTimer = setInterval(doTime,1000);
        texting = setInterval(scoreAndText,5000);
    }
    else{
        err.style.display = 'block';
        err.innerHTML = 'Please set the number of rounds [1-20]';
    }
}

function relateImageUser(){
    if(rockClicked === true){
        user.src = 'user-hand.png';
    }
    else if(paperClicked === true){
        user.src = 'paper.png';
    }
    else if(scissorsClicked === true){
        user.src = 'scissors.png';
    }
    return null;
}

function relateImageBot(){
    rndChoice = Math.floor(Math.random() * 3);
    if(rndChoice === 0){
        bot.src = 'bot-hand.png';
    }
    else if(rndChoice === 1){
        bot.src = 'paperBot.png';
    }
    else if(rndChoice === 2){
        bot.src = 'scissorsBot.png';
    }
    return null;
}

let textWinner = '';

const user_score = document.getElementById('score-user');
const bot_score = document.getElementById('score-bot');

function scenarios(clickedNum,rndNum){
    if(clickedNum === rndNum){
        textWinner = 'This round is a draw!';
    }
    else if(clickedNum === 0 && rndNum === 1){
        textWinner = 'The bot wins this round!';
        bot_score.value++;
    }
    else if(clickedNum === 0 && rndNum === 2){
        textWinner = 'You win this round!';
        user_score.value++;
    }
    else if(clickedNum === 1 && rndNum === 0){
        textWinner = 'You win this round!';
        user_score.value++;
    }
    else if(clickedNum === 2 && rndNum === 0){
        textWinner = 'The bot wins this round!';
        bot_score.value++;
    }
    else if(clickedNum === 1 && rndNum === 2){
        textWinner = 'The bot wins this round!';
        bot_score.value++;
    }
    else if(clickedNum === 2 && rndNum === 1){
        textWinner = 'You win this round!';
        user_score.value++;
    }
    return textWinner;
}

const input_check = document.getElementById('check');
const image_user = document.getElementById('user-moves');

function checksGirl(){
    if(input_check.checked == true){
        image_user.style.top = '70%';
        image_user.style.left = '34%';
        image_user.style.background = 'url(girl-user-sprite.png)';
        image_user.style.width = 'calc(3593px / 16)';
        image_user.style.animation = 'animate-girl 1s steps(16) infinite';
    }
    else if(input_check.checked == false){
        image_user.style.top = '76%';
        image_user.style.left = '53%';
        image_user.style.background = 'url(boy-user-sprite.png)';
        image_user.style.width = 'calc(4000px / 15)';
        image_user.style.animation = 'animate-user 1s steps(15) infinite';
    }
}

input_check.onclick = function(){
    checksGirl();
}

const resetAgain = document.getElementById('resar');

function roundsDone(){
    reset1();
    num_rounds.value = '';
    num_rounds.readOnly = false;
    user_score.value = 0;
    bot_score.value = 0;
}

resetAgain.onclick = function(){
    roundsDone();
    err.style.display = 'none';
}

//TODO TICTACTOE AI

var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}