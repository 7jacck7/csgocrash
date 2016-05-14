var nickname;
var message;
var id;
var idS;
var returnMessage;
var bool = false;

console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
engine.on('msg', function(data) {
    nickname = data.nickname;
	message = data.message;
	id = data.steamid;	
	bool = false;
	idS = id.toString();
	for (var i = 0; i < message.length+1-idS.length; i++) {
		if (message.substring(i,(i+idS.length))==idS) {
			bool = true;
		}
	}
	if (bool) {
			returnMessage = "Steam64 detected - "+nickname+", do not beg for coins in chat";
			engine.chat(returnMessage);
			//returnMessage = "/mute "+idS+" 3h";
			engine.chat(returnMessage);
			console.log(nickname);			
		

	}
});

