// Version 1.6 - Created by FREEDOM
// This is exactly the same as the AUTO function on the site except this one throws in
// a random amount of rounds to stop betting when it lost only to begin again after
// waiting. This is to reduce the chance of it riding a red train while afking.
//
// Chrome: Press f12 and switch to the console tab. Stats and outputs will be shown there.

var betAmount = 1; // Set the amount to bet. Must be more than 1
var cashOut = 1.5; // x
var noNegative = -10000; // If your net goes this much negative it stops betting
var Rmin = 5; // Minimum amount of rounds to wait before betting again after a loss
var Rmax = 10; // Maximum amount of rounds to wait before betting again after a loss

var pulloutMethod = 1; // 1 = Rmin to Rmax Pullout, 2 = Multiplier Pullout (set amount below)
var pulloutMultiAmount = 3; //2: Amount of times to let it crash below cashOut before betting again

//============= Modify Past this line at your own risk ==================
var net = 0;
var minBet = 1;
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
var gameResult;
var gameInside;
errorHandling();

engine.on('game_starting', function(info) {
    //console.log('Game Starting in ' + info.time_till_start);
	placeBet();
});

engine.on('game_started', function(data) {
    //console.log('Game Started', data);
});

engine.on('game_crash', function(data) {
	if (pullout2count>0) console.log('Game crashed at ', (data.game_crash/100));
	gameResult = engine.lastGamePlay();
	gameInside = engine.lastGamePlayed();
	if (gameResult=="WON"&&gameInside==true) {
		netUpdate();
		gamesWon += 1;
		gamesPlayed += 1;
		logg();
	}
	else if (gameResult=="LOST"&&gameInside==true) {
		netUpdate();
		gamesLost += 1;
		gamesPlayed += 1;
		pulloutMethodM();
	}
	else if (gameInside==false&&(pullout>0||pullout2count>0)) {
		pullout2 = (data.game_crash/100);
		pulloutCalc();
	}
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
function errorHandling() {
	if (betAmount>=1&&betAmount<=50000);
	else {
		console.log('Wrong betting amount','\n','Bot stopped');
		engine.stop();
	}
	if (cashOut>=1);
	else {
		console.log('Multiplier setting is wrong','\n','Bot stopped');
		engine.stop();
	}
	if (Rmax<Rmin) {
		console.log('Random range is wrong. Rmax cannot be lower than Rmin','\n','Bot stopped');
		engine.stop();
	}
	if (pulloutMethod>=3||pulloutMethod<=0) {
		console.log('Wrong pullout method selected','\n','Bot stopped');
		engine.stop();
	}
	if (noNegative>=0) {
		console.log('noNegative must be in the negatives','\n','Bot stopped');
		engine.stop();
	}
	console.log('No errors, bot started');
}
function placeBet() {
	if (pullout2count==0&&pullout==0&&(net/100)>noNegative) {
		cashedOut = false;
		engine.placeBet( betAmount*100, cashOut*100, false );
		console.log('Placing a bet: ',betAmount);
	}
	else {
		if (pullout>0||pullout2count>0) {
		}
		else {	
		console.log('Bet amount invalid. Bot stopped');
		engine.stop();
		}
	}	
}
function pulloutMethodM() {
		switch(pulloutMethod) {
			case 1: 
				pullout = Math.floor(Math.random() * (Rmax-Rmin)) + Rmin;
				logg();
				console.log('Lost a bet, waiting for ',pullout,' rounds before betting again');
				break;
			case 2:
			console.log('debug 3')
				pullout2count = pulloutMultiAmount;
				logg();
				console.log('Waiting ',pullout2count,'rounds were the crash is less than ',cashOut);
				break;
			default:
				console.log('Wrong method specified. Type in 1 or 2','\n','Bot Stopped');
				engine.stop();
				break;
		}
	
}
function pulloutCalc() {
	switch(pulloutMethod) {
		case 1: 
			pullout -= 1;
			console.log('Pullout is at ',pullout);
			break;
		case 2:
			if (pullout2<=cashOut) {
				pullout2count -= 1
				console.log('Pullout is at ',pullout2count);
			}
			break;
		default: 
			console.log('Pullout error','\n','Bot stopped');
			engine.stop();
	}
	
}
function netUpdate() {
	curBR = engine.getBalance();           
    if (curBR<minBR) {
		minBR = curBR;                     
    } 
	else if (curBR>maxBR) {
		maxBR = curBR;                        
    }
	net = curBR - startBR; 
}	
function logg() {
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
	console.log('Total games played: ',gamesPlayed);
	console.log('Total games won/lost: ',gamesWon,'/',gamesLost);
	console.log('Net: ', net/100);
}
function checkBet(moni) {
	return (moni>=1&&moni<=50000);
}
