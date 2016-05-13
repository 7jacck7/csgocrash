//
//
// 		HELLO
// 		THANKS FOR USING MY SCRIPT.
// 		THE SCRIPT WAS CREATED BY FREEDOM AND IS 100% FREE
//      
//      
//
// 		
// 		
// 		
// 		
//
//
//      ACTIVE SYSTEMS: PAROLI
//      INACTIVE SYSTEMS: MARTINGALE, D'ALAMBERT(useless system), PARLAY, IRON CROSS, LABOUCHERE, 1-3-2-6 AND OSCARS GRIND
//
//
// 		ANY QUESTIONS? ASK ME IN CHAT @ CSGOCRASH.COM
//
// 		BET RESPONSIBLY
//
//		
//      HERE FOLLOWS AN EXAMPLE OF HOW PAROLI SYSTEM WORKS WITH A START BET OF 5000
//		It works in 3 rounds and after those 3 rounds it restarts.
//		
//      Begins with betting the initial amount of 5000 and wins. Net +5000
//  	Second round is double the initial amount which is 10000 in this case and you win. Net +15000
//		Third round is double the second amount which is 20000 and here you win. Net +35000
//      Now its reset to round one again.
//      
//		You can only lose your initial amount per 3 round since it restarts if you lose.
//      First round bets 5000 and wins. +5000
// 		Second round bets 10000 and loses. -5000
//      New cycle, First round. 5000.
//      
// 		
// 		CHANGE SETTINGS HERE BELOW
	var bettingOn = true;  // CHANGE THIS TO TRUE TO ENABLE BETTING. WILL NOT BET AS LONG AS THIS IS FALSE EVEN IF THE BOT IS STARTED
	var betAmount = 1;   // THE INITIAL AMOUNT TO BET
	var cashOutMultiplier = 2 // ALWAYS 2x FOR PAROLI, CHANGE AT YOUR OWN RISK
//      
//      MODIFYING ANYTHING BELOW HERE MAY CAUSE A SHITSTORM, DO AT YOUR OWN RISK
//
	
	var userNameID = engine.getSteamID; 
	var kassa = engine.getBalance();
	var kassaMax = kassa;
	var kassaMin = kassa; 
	var kassaCurrent = kassa;
	var spelVunna = 0;
	var spelFörlorade = 0;
	var spelTotalt = 0;
	var cashatIn = true;
	var senaste = 0;
	var paroli = 1;
	var lastGameResult = engine.lastGamePlay();

	
	// Under nedräkning
engine.on('game_starting', function(info) {
    console.log('Game Starting in ' + info.time_till_start);
	betAmount = betAmount*paroli
	placeBet(betAmount,cashOutMultiplier,true);
});

engine.on('game_started', function(data) {
    console.log('Game Started', data);
});

engine.on('game_crash', function(data) {
    console.log('Game crashed at ', data.game_crash);
	spelTotalt = spelTotalt+1;
	senaste = (data.game_crash/100); //
	console.log(engine.lastGamePlay());	
	
});
//============================================
// FUCK BITCHES, GET MONEY... in skins
engine.on('player_bet', function(data) {
	if (data.steamid == userNameID) {
	cashatIn = false;
	}
});
engine.on('cashed_out', function(data) {
	if (data.steamid == userNameID) {
	cashatIn = true;
	}
});
//=============================================

engine.on('msg', function(data) {
    //console.log('Chat message!...');
});

engine.on('connect', function() {
    console.log('Client connected, this wont happen when you run the script');
});

engine.on('disconnect', function() {
    console.log('Client disconnected');
});

// BETTA
function placeBet( bet, para, autoplay ) {
  if ( bet ) {
    if ( bet >= 1 ) {
      if ( para ) {
        if ( para >= 1 ) {
          if ( bettingOn ) {
            engine.placeBet( bet*100, para*100, autoplay );
          }
        }
      }
    }
  }
  else {
  console.log('Invalid settings, make sure min bet is 1 and min multiplier is 1');
  }
}
// CASHA IN
function cashOut() {
  if ( !cashatIn ) {
    engine.cashOut();
    cashatIn = true;
  }
}
