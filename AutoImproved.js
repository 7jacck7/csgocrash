// Version 1.0 - Created by FREEDOM
// This is exactly the same as the AUTO function on the site except this one throws in
// a random amount of rounds to stop betting when it lost only to begin again after
// waiting. This is to reduce the chance of riding a red train while afking.

var betAmount = 2000;
var cashOut = 1.5; // x
var noNegative = -10000; // If your net goes this much negative it stops betting
//============= dont modify past this line ==================
var net = 0;
var minBet = 250;
var gamesPlayed = 0;
var gamesWon = 0;
var gamesLost = 0;
var gamesNotEntered = 0;
var maxBet = engine.getMaxBet();
var ID = engine.getSteamID();
var balance = engine.getBalance();
var curBR = balance;
var maxBR = balance;
var minBR = balance;
var startBR = balance;
var cashedOut = true;
var pullout = 0;
var count = 0;

engine.on('game_starting', function(info) {
    //console.log('Game Starting in ' + info.time_till_start);
	if (pullout==0&&checkBet(betAmount)&&net>noNegative) {
		console.log('Placing a bet: ',betAmount);
		cashedOut = false;
		engine.placeBet( betAmount*100, cashOut*100, true );
	}
	else {
		if (pullout>0) {
			pullout = pullout-1;
		}
		else {	
		console.log('Bet amount invalid');
		}
	}
});

engine.on('game_started', function(data) {
    //console.log('Game Started', data);
});

engine.on('game_crash', function(data) {
    //console.log('Game crashed at ', data.game_crash);
	var gameResult = engine.lastGamePlay();
	var gameInside = engine.lastGamePlayed();
	//console.log('debug: ', gameResult);
	if (gameResult=="WON"&&gameInside==true) {
		gamesWon = gamesWon+1;
		gamesPlayed = gamesPlayed+1;
	}
	else if (gameResult=="LOST"&&gameInside==true) {
		gamesLost = gamesLost+1;
		gamesPlayed = gamesPlayed+1;
		pullout = Math.floor(Math.random() * 5)+5;
		console.log('Lost a bet, waiting for ',pullout,' rounds before betting again');
	}
	else if (gameInside==false&&pullout>0) {
		pullout = pullout-1;
		console.log('Pullout is at ',pullout);
	}
	curBR = engine.getBalance();           
    if ( curBR < minBR ) {
		minBR = curBR;                     
    } 
	else if ( curBR > maxBR ) {
		maxBR = curBR;                        
    }
	net = curBR - startBR;   
	if (count==10) {
		logg();
		count = 0;
	}
	else {
		count++;
	}
	console.log('Net: ', net);
});

engine.on('player_bet', function(data) {
	if (data.steamid == ID) {
		cashedOut = false;
	}
});

engine.on('cashed_out', function(resp) {
    if (resp.steamid == ID) {
		cashedOut = true;
	}
});

engine.on('msg', function(data) {
    //console.log('Chat message!...');
});

engine.on('connect', function() {
    //console.log('Client connected, this wont happen when you run the script');
});

engine.on('disconnect', function() {
    //console.log('Client disconnected');
});
function logg() {
	console.log('Total games played: ',gamesPlayed);
	console.log('Total games won/lost: ',gamesWon,'/',gamesLost);
}
function checkBet(moni) {
	return (moni>=250&&moni<=50000);
}
