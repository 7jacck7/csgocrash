//		Paroli system explained: http://www.casinoreviewsquad.com/betting-systems/the-paroli-betting-system/
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
	var baseBet = 2;   // Your basebet
//      Paroli system requires a set 2x multiplier to work
//      
//      
//		Modifying below this line is done at your own risk
	
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
	var paroliCount = 1;
	var paroliBet = baseBet;
	var paroliCycles = 0;
	// Clear console (F12 in chrome)
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBot started');
	

engine.on('game_starting', function(info) {
	placeBet(paroliBet);
});

engine.on('game_crash', function(data) {
	gamesObserved += 1;
	gameResult = engine.lastGamePlay();
	gameInside = engine.lastGamePlayed();
	if (gameResult=="WON"&&gameInside==true) {
		netUpdate();
		gamesWon += 1;
		gamesTotal += 1;
	}
	else if (gameResult=="LOST"&&gameInside==true) {
		netUpdate();
		gamesLost += 1;
		gamesTotal += 1;
	}
	logUpdate();
});
function logUpdate() {
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
	console.log('Completed paroli cycles: ',paroliCycles);
	console.log('Total games observed: ',gamesObserved);
	console.log('Total games played: ',gamesTotal);
	console.log('Total games won/lost: ',gamesWon,'/',gamesLost);
	console.log('Net: ', net/100,'\n');
	
}
function placeBet(bet) {
	if (bet>curBR) stopBot('Current bet exceeded your balance');	
	else if (bet<1||bet>engine.getMaxBet()/100) stopBot('Bet invalid. Its too low or above the betting limit');
	switch (paroliCount) {
		case 1:
			paroliBet = baseBet;
			trueBet();
			break;
		case 2: 
			paroliBet *= 2 
			if (gameResult=="LOST") paroliBet = baseBet;
			trueBet();
			break;
		case 3: 
			paroliBet *= 2;
			if (gameResult=="LOST") paroliBet = baseBet;
			trueBet();
			paroliCycles += 1;
			break;
		default:
			stopBot('Paroli count error');
	}
}
function trueBet() {
	engine.placeBet(paroliBet*100, 200, true);
	console.log('Paroli round: ',paroliCount,'\nPlacing bet of: ',paroliBet);
	if (paroliCount==3) paroliCount = 1;
	else paroliCount += 1;
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

// ============================================================
// ======== NOT USED ==========================================
// ============================================================

engine.on('game_started', function(data) {
});
engine.on('player_bet', function(data) {

});
engine.on('cashed_out', function(data) {

});

engine.on('msg', function(data) {

});

engine.on('connect', function() {
    console.log('Client connected, this wont happen when you run the script');
});

engine.on('disconnect', function() {
    console.log('Client disconnected');
});