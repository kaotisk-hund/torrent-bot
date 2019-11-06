/*
 *	This bot is made for use in Kaotisk Hund IRC Network
 *
 *	This part is for creating a bot in #torrents channel
 *  and make available a command for adding a infoHash
 *  to a local file called ./whitelist.
 *
 *  In order to added the collected infoHashes to the
 *  opentracker's whitelist, you need to run
 *   ./bin/append_whitelist.sh.
 * 
 *  Check options around if you want to hack this.
 *
 */

/*
 * Configuration
 */
var config = {
	ircServer : 'h.kaotisk-hund.tk',
	nickname : 'torrejelp',
	channels : ['#torrents'],
	username : 'TorrentHelper',
	realName: 'Kravl Oke Tanyaka'
}

/*
 * Basic requirements
 */
var irc = require('irc');		// Requires irc library
var fs = require('fs');			// Requires fs library

/*
 * Initiate connection with irc server
 */
var client = new irc.Client(config.ircServer, config.nickname, {
	channels: config.channels,
	userName: config.username,
	realName: config.realName
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
var dbg = false;

/*
 * Whitelist save
 */
function saveIH(infoHash){
	fs.appendFile("./whitelist", infoHash+"\n", function(err) {
	    if(err) {
    	    return console.log(err);
    	}
    	if (dbg) {console.log("The file was saved!")};
	});
}

/*
 * Handles message, data
 */
client.addListener('message', function(from, to, message){
	packed = [from, to, message];
	argarr = argumentor(message);
	comsel(command);
});

/*
 * Output array, this is a process utility
 * and renamed soon.
 */
 function argumentor(input){
 	argarr = argv_trans(input);
 	command = comex(argarr);
 	return argarr;
 }

/*
 * Command select.
 * At this moment, we manage routing here.
 */
function comsel(command){
	if(command === '!addtorrent'){
		var infoHash = argarr[1];
		addtorrent(infoHash);
	}
}

/*
 * Add torrent!!!!
 * This is going to save the infoHash into a file.
 */
function addtorrent(infoHash){
	if (infoHash === null) {
		client.say(packed[1], "Usage: !addtorrent <infoHash>");
	} else {
		saveIH(infoHash);
		client.say(packed[1], infoHash + " torrent added!!");
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
 * Logs errors to console
 */
client.addListener('error', function(message) {
    if (dbg) {console.log('!!!! ERROR !!!!: ', message)};
});