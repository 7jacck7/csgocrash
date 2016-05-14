// THIS SCRIPT IS INTENDED ONLY FOR MODS/ADMINS AND DOES NOTHING FOR NORMAL USERS
// THIS IS NOT AN AUTOBET SCRIPT
// CREATED BY FREEDOM - 100% FREE SCRIPTS

var banDuration = 3 // Steam64 ban duration in hours.
var banDuration2 = 30 // Offensive language ban duration in minutes.

// Notes to add here, you can actually check for other stuff than profanity
// You can for example track "can i have" or "send coins pls"

var profanity = ["nigga", "nigger","niga", "n1ga", "n1gga", "bluegum", "mutt", "sandnigger", "sand nigger",
"chink", "gook", "spic", "beaner", "hick", "isis", "lobos"]

// No touchy touchy beyond this line (unless you know what youre doin)
var nickname;
var message;
var id;
var idS;
var returnMessage;
var idDetected = false;
var fuuu;
engine.on('msg', function(data) {
	idDetected = false;						

    	nickname = data.nickname;  			
	message = data.message;
	message = message.toLowerCase();
	id = data.steamid;					
	idS = id.toString();                
	steam64(idS,message,nickname);		//Check if hes posting steam64 ID
//	spam(idS,message,nickname);         //Check if hes spamming
    	offensive(idS,message,nickname);	//Check if hes being rude/offensive
});
function steam64(id,message,name) {
	for (var i = 0; i < message.length+1-id.length; i++) {
		if (message.substring(i,(i+id.length))==id) {
			idDetected = true; 
			returnMessage = "Steam64 detected - "+name+", do not beg for coins in chat you filth";
			engine.chat(returnMessage);
			returnMessage = "/mute "+id+" "+banDuration+"h";
			engine.chat(returnMessage);
			break;
		}                      
	}
}
function offensive(id,message,name) {
	console.log('stage1');
	for (var i = 0; i<profanity.length; i++) {
		for (var k = 0; k<message.length+1-profanity[i].length; k++) {
			if (message.substring(k, k+profanity[i].length)==profanity[i]) {
				returnMessage = "Profanity detected - "+name+", do not use rude/offensive words";
				engine.chat(returnMessage);
				returnMessage = "/mute "+id+" "+banDuration2+"m";
				engine.chat(returnMessage);
			}		
		}
	}
}


