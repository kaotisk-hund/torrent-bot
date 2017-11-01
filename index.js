/*
 * Basic requirements
 */
var irc = require('irc');		// Requires irc library
var fs = require('fs');			// Requires fs library

/*
 * Initiate connection with irc server
 */
var client = new irc.Client('irc.kaotisk-hund.tk', 'mfibot', {
	channels: [
		'#rethymno-meshnet',
		'#cjdns',
		'#forum',
		'#general',
		'#ipfs',
		'#mail',
		'#movies',
		'#music',
		'#radio',
		'#torrents'
	],
	userName: 'mfibot',
	realName: 'Max Fiddlestick Iscar'
});

/* 
 * Introduce some variables
 */
var command;
var argarr;
var packed;

/*
 * Debug output switch.
 */
var dbg = true;

/*
 * Whitelist save
 */
function saveIH(infoHash){
	fs.appendFile("./whitelist", infoHash+"\n", function(err) {
	    if(err) {
    	    return console.log(err);
    	}
    	console.log("The file was saved!");
	});
}

/*
 * Log to conversations to console, also some mplaaaaaaaaaaa
 */
client.addListener('message', function(from, to, message){
	console.log(from + ' -> ' + to + ': ' + message);
	packed = [from, to, message];
	argarr = argumentor(message);
	comsel(command);
	// client.say(to,from +', infoHash ' + argv_trans(message) + ' added to whitelist! Thank you!');
});

/*
 * Adds a listener for every raw message so I can learn more about raw messages
 *
 * Targets: TOPIC, OP
 *
 */
client.addListener('raw',function(message){
	if (dbg) {parserawmessage(message)};

});

client.addListener('join', function(message){
	client.send('MODE', '#torrents', '+o', 'kaotisk');
})



// Not parse raw message, but print nicely to console.
function parserawmessage(message){
	console.log('{\n\tPrefix : ' + message.prefix + '\n' +
		'\tNick : ' + message.nick +  '\n' +
		'\tUser : ' + message.user +  '\n' +
		'\tHost : ' + message.host +  '\n' +
		'\tServ : ' + message.server +  '\n' +
		'\tRaCo : ' + message.rawCommand +  '\n' +
		'\tComm : ' + message.command +  '\n' +
		'\tCoTy : ' + message.commandType +  '\n' +
		'\tArgs : ' + message.args + '\n}'
	);
}

/*
 * Output some logs, this is going to be a process utility
 * and renamed soon.
 * TODO: Through a switch for console output logging.
 */
 function argumentor(input){
 	argarr = argv_trans(input);
 	command = comex(argarr);
 	console.log('command: ' + command + ', 1st argument: ' + argarr[1]);
 	return argarr;
 }

/*
 * Command select.
 * At this moment, we manage routing here.
 */
function comsel(command){
	if(command === '!hibot'){
    	client.say(packed[1], "Hi! I am a robot!");
	}
	if(command === '!addtorrent'){
		var infoHash = argarr[1];
		addtorrent(infoHash);
	}
}

/*
 * Add torrent!!!!
 * This is going to save the infoHash into a file.
 */
function addtorrent(infoHash = 0){
	if (infoHash === 0) {
		client.say(packed[1], "Usage: !addtorrent <infoHash>");
	} else {
		saveIH(infoHash);
		client.say(packed[1], "Hi! I am a robot that added " + infoHash + " torrent!!");
	}
}


/*
 * Find the command [0]
 */
function comex(arguments){
	if(arguments){
		return arguments[0];
 	}
}

/*
 * Splits message to arguments, returns second argument.
 */
function argv_trans(input){
	var array = input.split(" ");
	return array;
}


/*
 * TODO: Sets topics for basic channels
 */
//client.send('message','#rethymno-meshnet','~~~ Rethymno Meshnet ~~~ Coverage! Soon bot will be added!');
/*client.send('topic','#torrents','For adding a torrent /msg kaotisk <torrent title> <infoHash> | Tracker URL: udp://h.kaotisk-hund.tk:6969/announce');
client.send('topic','#radio','Want to send out your signal? Wanna here some good tunes? Well, we have to make it work together!');
client.send('topic','#mail','Wanna use email in hyperboria network? Ask here for an account!');
client.send('topic','#ipfs','IPFS talk!');
client.send('topic','#forum','Visit the forum at http://h.kaotisk-hund.tk/blog/index.php/forum/');
client.send('topic','#cjdns','CJDNS connectivity, peering. Also, report problems regarding your cjdns configuration and such.');
client.send('topic','#music','What\'s your music taste? What it feels like? Share freely!');
client.send('topic','#general','Welcome to Kaotisk Hund IRC!!! Other channels of interest: #music , #torrents');*/

/*
 * Logs errors to console
 */
client.addListener('error', function(message) {
    console.log('!!!! ERROR !!!!: ', message);
});