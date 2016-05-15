// THIS SCRIPT IS INTENDED ONLY FOR MODS/ADMINS AND DOES NOTHING FOR NORMAL USERS
// THIS IS NOT AN AUTOBET SCRIPT
// CREATED BY FREEDOM - 100% FREE SCRIPTS

// ============== TURN ON / OFF =================== 
var steam64 = true; 	// Check for steam64 			(true = on, false = off)
var offensive = true;   // Check for offensive language (true = on, false = off)
var spam = true; 		// Check for spam 				(true = on, false = off)
// ================================================

// ============= DURATION AND M/H/D/Y SETTINGS =============================
var steam64Duration = 3; 	 // Steam64 ban duration.
var languageDuration = 30; 	 // Offensive language ban duration.
var spamDuration = 45;		 // Spam ban duration.


var messagesMax = 5;   		 // Amount of messages in a row to be countes as spam

var steam64B = "h"; 		 // (m = minutes, h = hours, d = days, y = years)
var languageB = "m"; 		 // (m = minutes, h = hours, d = days, y = years)
var spamB = "m"; 		 	 // (m = minutes, h = hours, d = days, y = years)

// Notes to add here, you can actually check for other stuff than profanity
// You can for example track "can i have" or "send coins pls"

var profanity = ["nigga", "nigger","rigged","scam site"];


// No touchy touchy beyond this line (unless you know what youre doin)
var nickname;
var message;
var id;
var idS;
var returnMessage;
var spamCount = 0;
var spamLastID;


engine.on('msg', function(data) {
    nickname = data.nickname;  			
	message = data.message;
	message = message.toLowerCase();
	id = data.steamid;					
	idS = id.toString();                
	if (steam64) steam64i(idS,message,nickname);		//Check if hes posting steam64 ID
    if (spam)	spami(idS,nickname);         			//Check if hes spamming
    if (offensive) offensivei(idS,message,nickname);	//Check if hes being rude/offensive
});
function steam64i(id,message,name) {
	for (var i = 0; i < message.length+1-id.length; i++) {
		if (message.substring(i,(i+id.length))==id) {
			returnMessage = "Steam64 detected - "+name+", do not beg for coins in chat you filth";
			engine.chat(returnMessage);
			returnMessage = "/mute "+id+" "+steam64Duration+steam64B;
			engine.chat(returnMessage);
			break;
		}                      
	}
}
function offensivei(id,message,name) {
	for (var i = 0; i<profanity.length; i++) {
		for (var k = 0; k<message.length+1-profanity[i].length; k++) {
			if (message.substring(k, k+profanity[i].length)==profanity[i]) {
				returnMessage = "Profanity detected - "+name+", do not use rude/offensive words";
				engine.chat(returnMessage);
				returnMessage = "/mute "+id+" "+languageDuration+languageB;
				engine.chat(returnMessage);
			}		
		}
	}
}
function spami(id,name) {
	if (id==spamLastID) {
		spamCount += 1;
		if (spamCount>messagesMax) {
			spamCount = 1;
			returnMessage = "Spam detected - "+name+", do not spam";
			engine.chat(returnMessage);
			returnMessage = "/mute "+id+" "+spamDuration+spamB;
			engine.chat(returnMessage);	

		}
	}
	else {
		spamCount = 1;
		spamLastID = id;
	}
}
