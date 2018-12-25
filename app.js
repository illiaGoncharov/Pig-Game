/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 200 or Number Specifided By Player points on GLOBAL score wins the game

*/

alert("The game has 2 players, playing in rounds");
alert("In each turn, a player rolls a dice as many times as he whishes.");
alert("Each result get added to his ROUND score.");
alert("BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.");
alert("AND, if the player rolls two 6, ALL his scores get lost. After that, it's the next player's turn.");
alert("The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.");
alert("The first player to reach 200 or Specified Winner Score (bottom of the page) points on GLOBAL score wins the game.");
alert("You can see whole Game Log in Browser Console (cmd + opt + i then Console)");
alert("Have Fun!");

var scores, 
	roundScore,
	activePlayer,
	gamePlaying,
	firstDice,
	secondDice;
	
init();

function nextPlayer() {
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
	document.getElementById('current-' + activePlayer).textContent = '0';
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

	console.log("Player-" + activePlayer + " now playes!");
};

function doubleSix() {
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore; 
	// Add current to global
	score[activePlayer] = roundScore;
	// Update UI
	document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
	console.log('Player-' + activePlayer + ": " + "6x2: Bad Luck");
	nextPlayer();
}

document.querySelector('.btn-roll').addEventListener('click', function() {
		if (gamePlaying) {
			firstDice = Math.floor(Math.random() * 6) + 1;
			secondDice = Math.floor(Math.random() * 6) + 1;
			console.log('Player-' + activePlayer + ": " + firstDice + " and " + secondDice);
			var diceDOMone = document.querySelector('.dice-1');
			var diceDOMtwo = document.querySelector('.dice-2');
			document.querySelector('.dice-1').style.display = 'block';
			document.querySelector('.dice-2').style.display = 'block';
			diceDOMone.src = 'dice-' + firstDice + '.png';
			diceDOMtwo.src = 'dice-' + secondDice + '.png';
			if(firstDice === 6 && secondDice === 6){
				doubleSix();
			} else if (firstDice !== 1 && secondDice !== 1) {
				// Add score
				var dice = firstDice + secondDice;
				roundScore += dice;
				document.querySelector('#current-' + activePlayer).textContent = roundScore; 
			} else {
				console.log("Other player's turn");				
				// Other player
				nextPlayer();
			}
		} else {} 
	}
);

document.querySelector('.btn-hold').addEventListener('click', function() {
		if (gamePlaying) {
			// Add current to global
			score[activePlayer] += roundScore;

			// Update UI
			document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
			console.log('Player-' + activePlayer + " now holds: " + score[activePlayer]);

			// Check Winnig Score
			var input = document.getElementById('input').value;
			var winningScore;
			if (input) {
				winningScore = input;
			} else {
				winningScore = 200;
			}

			// Check if player won
			if (score[activePlayer] >= winningScore) {
				document.getElementById('name-' + activePlayer).textContent = "Winner!";
				document.querySelector('.dice-1').style.display = 'none';
				document.querySelector('.dice-2').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
				gamePlaying = false;
			} else {
				nextPlayer();
			}
		} else {}	
	}	
);

function init() {
	score = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = "Player 0";
	document.getElementById('name-1').textContent = "Player 1";

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');

	console.log("Game Init: Active Player-" + activePlayer)
};

document.querySelector('.btn-new').addEventListener('click', init);
 