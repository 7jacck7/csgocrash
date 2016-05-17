//		Parley system explained: http://www.roulettesystems.org/parlay-system
//
// 		HELLO
// 		THANKS FOR USING MY SCRIPT.
// 		THE SCRIPT WAS CREATED BY FREEDOM AND IS 100% FREE
//      
//      
//
// 		ANY QUESTIONS? ASK ME IN CHAT @ CSGOCRASH.COM
//
// 		BET RESPONSIBLY
//
//		  
// 		
// 		CHANGE SETTINGS HERE BELOW
var bet = 10;	   // Initial bet
var multiplier = 2 // 2x recommended for parley to work
var rounds = 3     // Rounds to streak before starting over
//  ==========================================================



// Do not modify below this line unless you know what youre doing
//================================================================

// Money and balance variables
var initialBR = engine.getBalance();
var curBR = initialBR; // Current balance
var minBR = curBR; 			 // Min balance
var maxBR = curBR; 			 // Max balance
var net = 0;         			 // Current networth.
// Tracking wins/losses and total games played
var gamesWon = 0;
var gamesLost = 0;
var gamesTotal = 0;
var gamesObserved = 0;
// Trackers
var gameResult;
var gameInside;
var parleyCount = 1;
var parleyBet = bet;
var parleyCycles = 0;
// Clear console (F12 in chrome)
console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBot started');


engine.on('game_starting', function(info) {
	placeBet(parleyBet);
});

engine.on('game_crash', function(data) {
	gamesObserved += 1;
	gameResult = engine.lastGamePlay();
	gameInside = engine.lastGamePlayed();
	if (gameResult=="WON"&&gameInside==true) {
		netUpdate();
		parleyBet *= 2;
		gamesWon += 1;
		gamesTotal += 1;
	}
	else if (gameResult=="LOST"&&gameInside==true) {
		netUpdate();
		parleyBet = bet;
		parleyCount = 1;
		gamesLost += 1;
		gamesTotal += 1;
	}
	logUpdate();
});
function logUpdate() {
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
	console.log('Total games observed: ',gamesObserved);
	console.log('Total games played: ',gamesTotal);
	console.log('Total games won/lost: ',gamesWon,'/',gamesLost);
	console.log('Net: ', net/100,'\n');
	
}
function placeBet(bet) {
	if (bet>curBR) stopBot('Current bet exceeded your balance');	
	else if (bet<1||bet>engine.getMaxBet()/100) stopBot('Bet invalid. Its too low or above the betting limit');
	else {
		trueBet();
	}
}
function trueBet() {
	engine.placeBet(parleyBet*100, multiplier*100, false);
	console.log('Parley round: ',parleyCount,'\nPlacing bet of: ',parleyBet);
	if (parleyCount==rounds) parleyCount = 1;
	else parleyCount += 1;
}
function netUpdate() {
	curBR = engine.getBalance();           
    if (curBR<minBR) {
		minBR = curBR;                     
    } 
	else if (curBR>maxBR) {
		maxBR = curBR;                        
    }
	net = curBR - initialBR; 
}
function stopBot(reason) {
	console.log(reason,'\n Bot stopped')
	engine.stop();
}
