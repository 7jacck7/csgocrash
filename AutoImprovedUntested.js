// Version 1.1 - Created by FREEDOM
// This is exactly the same as the AUTO function on the site except this one throws in
// a random amount of rounds to stop betting when it lost only to begin again after
// waiting. This is to reduce the chance of it riding a red train while afking.

var betAmount = 200; // Set the amount to bet. Must be more than 250
var cashOut = 1.5; // x
var noNegative = -10000; // If your net goes this much negative it stops betting
var Rmin = 5; // Minimum amount of rounds to wait before betting again after a loss
var Rmax = 10; // Maximum amount of rounds to wait before betting again after a loss

var pulloutMethod = 1; // 1 = Rmin to Rmax Pullout, 2 = Multiplier Pullout (set amount below)
var pulloutMultiAmount = 3; //2: Amount of times to let it crash below cashOut before betting again

//============= Modify Past this line at your own risk ==================
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
var pullout2 = 0;
var pullout2count = 0;
var count = 0;

engine.on('game_starting', function(info) {
    //console.log('Game Starting in ' + info.time_till_start);
	if (pullout==0&&checkBet(betAmount)&&(net/100)>noNegative) {
		cashedOut = false;
		engine.placeBet( betAmount*100, cashOut*100, true );
		console.log('Placing a bet: ',betAmount);
	}
	else {
		if (pullout>0) {
		}
		else {	
		console.log('Bet amount invalid. Bot stopped');
		engine.stop();
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
	
	}
	if (gameResult=="WON"&&gameInside==true) {
		gamesWon = gamesWon+1;
		gamesPlayed = gamesPlayed+1;
		logg();
	}
	else if (gameResult=="LOST"&&gameInside==true) {
		gamesLost = gamesLost+1;
		gamesPlayed = gamesPlayed+1;
		switch(pulloutMethod) {
			case 1: 
				pullout = Math.floor(Math.random() * (Rmax-Rmin)) + Rmin;
				console.log('Lost a bet, waiting for ',pullout,' rounds before betting again');
				logg();
				break;
			case 2:
				pullout2count = pulloutMultiAmount
				console.log('Waiting ',pullout2count,'rounds where the crash is less than ',cashOut);
			default:
				console.log('Wrong method specified. Type in 1 or 2','\n','Bot Stopped');
				engine.stop();
		}
	}
	else if (gameInside==false&&(pullout>0||pullout2>0)) {
		if (pulloutMethod==1) {
			pullout = pullout-1;	
			console.log('Pullout is at ',pullout);
		}
		else if (pulloutMethod=2) {
			pullout2 = (engine.data.game_crash/100);
			if (pullout2<=cashOut) {
				pullout2count = pullout2count-1;
				console.log('Pullout is at ',pullout2count);
			}
			else {
				console.log(pullout2,' > ',cashOut);
			}
		}
	}
	
	curBR = engine.getBalance();           
    if ( curBR < minBR ) {
		minBR = curBR;                     
    } 
	else if ( curBR > maxBR ) {
		maxBR = curBR;                        
    }
	net = curBR - startBR;   	
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
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
	console.log('Total games played: ',gamesPlayed);
	console.log('Total games won/lost: ',gamesWon,'/',gamesLost);
	console.log('Net: ', net/100);
}
function checkBet(moni) {
	return (moni>=250&&moni<=50000);
}
