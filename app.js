/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 200 or Number Specifided By Player points on GLOBAL score wins the game

*/

// Highlight game rules 
alert("The game has 2 players, playing in rounds");
alert("In each turn, a player rolls a dice as many times as he whishes.");
alert("Each result get added to his ROUND score.");
alert("BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.");
alert("AND, if the player rolls two 6, ALL his scores get lost. After that, it's the next player's turn.");
alert("The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.");
alert("The first player to reach 200 or Specified Winner Score (bottom of the page) points on GLOBAL score wins the game.");
alert("You can see whole Game Log in Browser Console (cmd + opt + i then Console)");
alert("Have Fun!"); 

// Declare whole score for both players (array), round score, active player (0/1), true/false game active, two dices  
var scores, 
	roundScore,
	activePlayer,
	gamePlaying,
	firstDice,
	secondDice;
	
init();

// Next player function 
function nextPlayer() {
	// Update UI 
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
	document.getElementById('current-' + activePlayer).textContent = '0';

	// Checking active player 
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	// Initialise new round 
	roundScore = 0;
	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

	// New player toggle
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

	// Console log
	console.log("Player-" + activePlayer + " now playes!");
};

// In case both dices are 6
function doubleSix() {
	// Updating UI and making whole player's score equal to zero 
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore; 
	score[activePlayer] = roundScore;

	// Update UI
	document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

	// Console log
	console.log('Player-' + activePlayer + ": " + "6x2: Bad Luck");

	nextPlayer();
}

// In case Roll button triggerd 
document.querySelector('.btn-roll').addEventListener('click', function() {
		// If we've got winner gamePlaying should become false (to prevent playing one game after)
		if (gamePlaying) {
			// Calculating both dices 
			firstDice = Math.floor(Math.random() * 6) + 1;
			secondDice = Math.floor(Math.random() * 6) + 1;

			// Console log
			console.log('Player-' + activePlayer + ": " + firstDice + " and " + secondDice);

			// Get dices in DOM
			var diceDOMone = document.querySelector('.dice-1');
			var diceDOMtwo = document.querySelector('.dice-2');

			// Show dices and display pngs 
			document.querySelector('.dice-1').style.display = 'block';
			document.querySelector('.dice-2').style.display = 'block';
			diceDOMone.src = 'dice-' + firstDice + '.png';
			diceDOMtwo.src = 'dice-' + secondDice + '.png';

			// Check if there is double, If there are not 1s, in other case (we've got 1) next player's turn
			if(firstDice === 6 && secondDice === 6){
				doubleSix();
			} else if (firstDice !== 1 && secondDice !== 1) {
				// Add score
				var dice = firstDice + secondDice;
				roundScore += dice;
				document.querySelector('#current-' + activePlayer).textContent = roundScore; 
			} else {
				// Console log
				console.log("Other player's turn");	

				// Other player
				nextPlayer();
			}
		} else {} 
	}
);

// In case player want to hold current round score 
document.querySelector('.btn-hold').addEventListener('click', function() {
		if (gamePlaying) {
			// Add current to global
			score[activePlayer] += roundScore;

			// Update UI
			document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

			// Console log
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
				// Updlate UI
				document.getElementById('name-' + activePlayer).textContent = "Winner!";
				document.querySelector('.dice-1').style.display = 'none';
				document.querySelector('.dice-2').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

				// Game are not active anymore 
				gamePlaying = false;
			} else {
				nextPlayer();
			}
		} else {}	
	}	
);

// Game init function (all to zero, gamePlaying = true)	
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

// New Game button 
document.querySelector('.btn-new').addEventListener('click', init);
 