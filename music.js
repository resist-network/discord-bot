// NodeDirt-Disco Discord Bot
// Visit https://www.nodedirt.com
// Join our Discord @ https://discord.gg/crtdzEE

const { Client } = require('discord.js');
config = require('./config-jr.json'),
os = require('os'),
mysql = require('mysql'),
fs = require('fs'),
ytdl = require('ytdl-core'),
cheerio = require('cheerio'),
snekfetch = require('snekfetch'),
querystring = require('querystring'),
moment = require('moment'),
express = require('express'),
path = require('path'),
request = require("request"),
http = require("http");
//db = require('mongodb'),


client = new Client();
var sys = require('util');
var exec = require('child_process').exec;
var cluster = require('cluster');
var systemOS = os.platform();
var prettySize = require('prettysize');
var prettyMs = require('pretty-ms');
var ffmpeg = require('fluent-ffmpeg');
	
bot_prefix = config.bot_prefix;
bot_passes = config.bot_passes;
bot_nickname = config.bot_nickname;
bot_admin_id = config.bot_admin_id;
bot_token = config.bot_token;
bot_web_port = config.bot_web_port || 5000;
bot_web_title = config.bot_web_title;
bot_web_favicon = config.bot_web_favicon;
bot_logo_long = config.bot_logo_long;
bot_logo_square = config.bot_logo_square;
bot_icon_log = config.bot_icon_log;
bot_icon_inet = config.bot_icon_inet;
bot_emoji_logo = config.bot_emoji_logo;
var bot_icon_about = config.bot_icon_about;
var bot_icon_help = config.bot_icon_help;
var bot_icon_ticket = config.bot_icon_ticket;
var bot_icon_heart = config.bot_icon_heart;
var discord_server_invite_link = config.discord_server_invite_link;
discord_server_id = config.discord_server_id;
var discord_category_id_support = config.discord_category_id_support;
var discord_channel_id_log = config.discord_channel_id_log;
var discord_channel_id_welcome = config.discord_channel_id_welcome;
var discord_channel_id_radio = config.discord_channel_id_radio;
var discord_auto_role_name = config.discord_auto_role_name;
var discord_server_support_role_id_one = config.discord_server_support_role_id_one;
var discord_server_support_role_id_two = config.discord_server_support_role_id_two;
var discord_invite_link = config.discord_invite_link;
var mysql_host = config.mysql_host;
var mysql_user = config.mysql_user;
var mysql_pass = config.mysql_pass;
var mysql_database = config.mysql_database;
var info_website = config.info_website;
var info_copyright = config.info_copyright;
var api_youtube_data = config.api_youtube_data;
var api_google_shortener = config.api_google_shortener;

var mm = require('musicmetadata');


var aliasesFile = "./aliases.yml";
//Current Date/Time
var currentdate = new Date(); 
var logTimestamp = "WorldAutomation.Net | " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
var msgTimestamp = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
if (cluster.isMaster) {
	cluster.fork();
	cluster.on('exit', function(worker, code, signal) {
		cluster.fork();
	});
}
if (cluster.isWorker) {

//Need to be a json file so we can keep it after restart... *Cough* fanbus
let queue = {};

//Depending on your command framework (or if you use one), it doesn't have to
//edit messages so you can rework it to fit your needs. Again, this doesn't have
//to be async if you don't care about message editing.
async function googleCommand(msg, args) {

// These are our two variables. One of them creates a message while we preform a search,
// the other generates a URL for our crawler.
let searchMessage = await msg.reply("<:main_computer:420575980198035456> <:wa:324446350211284992>  `[Main Computer] Bot @ WA.Net(Jr)# Querying the matrix for answers...`");
let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`;

// We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
// utilize that for our try/catch block.
return snekfetch.get(searchUrl).then((result) => {

		// Cheerio lets us parse the HTML on our google result to grab the URL.
		let $ = cheerio.load(result.text);

		// This is allowing us to grab the URL from within the instance of the page (HTML)
		let googleData = $('.r').first().find('a').first().attr('href');

		// Now that we have our data from Google, we can send it to the channel.
		googleData = querystring.parse(googleData.replace('/url?', ''));
		//searchMessage.edit(`Result found!\n${googleData.q}`);
		searchMessage.edit("<:main_computer:420575980198035456> <:wa:324446350211284992>  `[Main Computer] Bot @ WA.Net(Jr)# Answer found, see attached.`\n "+googleData.q);
		
// If no results are found, we catch it and return 'No results are found!'
	}).catch((err) => {
		searchMessage.edit("<:main_computer:420575980198035456> <:wa:324446350211284992>  `[Main Computer] Bot @ WA.Net(Jr)# No results found!`");
	});
}
//movies
async function movieCommand(msg, args) {

// These are our two variables. One of them creates a message while we preform a search,
// the other generates a URL for our crawler.
let searchMessage = await msg.reply("<:main_computer:420575980198035456> <:wa:324446350211284992>  `[Main Computer] Bot @ WA.Net(Jr)# Querying the matrix for answers...`");
let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`;

// We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
// utilize that for our try/catch block.
return snekfetch.get(searchUrl).then((result) => {

		// Cheerio lets us parse the HTML on our google result to grab the URL.
		let $ = cheerio.load(result.text);

		// This is allowing us to grab the URL from within the instance of the page (HTML)
		let googleData = $('.r').first().find('a').first().attr('href');

		// Now that we have our data from Google, we can send it to the channel.
		googleData = querystring.parse(googleData.replace('/url?', ''));
		//searchMessage.edit(`Result found!\n${googleData.q}`);
		searchMessage.edit("<:main_computer:420575980198035456> <:wa:324446350211284992>  `[Main Computer] Bot @ WA.Net(Jr)# Answer found, see attached.`\nhttps://www.worldautomation.net/files/everlast.mp4");
		
// If no results are found, we catch it and return 'No results are found!'
	}).catch((err) => {
		searchMessage.edit("<:main_computer:420575980198035456> <:wa:324446350211284992>  `[Main Computer] Bot @ WA.Net(Jr)# No results found!`");
	});
}
//Some Logging Stuff
var discordLog = function(msg,d,u,uid) {
	if(!u) { var u = bot_nickname; }
	if(!uid) { var uid = "System"; }
	client.channels.get(discord_channel_id_log).send({embed: {
		color: 0xff8000,
		author: {
			name: bot_nickname+" - Log Event",
			icon_url: bot_icon_about
		},
/* 		thumbnail: {
			"url": bot_logo_square,
			"width": 5,
			"height": 5
    }, */
    fields: [{
			"name": "User Info",
			"value": u+" / "+uid
    }, {
			"name": "Log Data",
			"value": d
    }],
		timestamp: new Date(),
		footer: {
			text: info_copyright
		}
	}});
	var now = moment();
	var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
	console.log("["+formattedNow+"]["+u+"/"+uid+"] "+d+"\n");
};
/**
 * JavaScript scraper for ThePirateBay and KickAssTorrents.
 *
 * Requirements:
 *   npm install request jsdom
 *
 * Usage:
 *
 *   searchKat('something', callback);
 *   searchPb('something', callback);
 *
 * `callback` is a function with the signature `function(err, results)`,
 * where `err` is an instance of `Error`, and `results` is an array of
 * `Result` objects.
 *
 * If `err === null`, then `results` is an array, either empty or with items.
 *
 * If `err !== null`, then `results` is `null`.
 */

var url = require('url');

var request = require('request');
var jsdom = require('jsdom');


//move file
function move(oldPath, newPath, callback) {

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}

//move file end
/**
 * Results will be instances of this object.
 */
function Result(options) {
  if (options === undefined || options === null) {
    options = {};
  }
  if (typeof options !== 'object') {
    throw new Error('options must be object');
  }

  // Validate title and url.
  ['title', 'url'].forEach(function(key) {
    if (!options.hasOwnProperty(key)) {
      options[key] = null;
      return;
    }

    if (typeof options[key] !== 'string') {
      throw new Error(key + ' must be string');
    }

    options[key] = options[key].trim();
  });

  // Validate seeders and leechers.
  ['se', 'le'].forEach(function(key) {
    if (!options.hasOwnProperty(key)) {
      options[key] = null;
      return;
    }

    if (typeof options[key] !== 'number') {
      throw new Error(key + ' must be number');
    }

    var n = options[key];
    if (Math.floor(n) !== Math.ceil(n)) {
      throw new Error(key + ' must be int');
    }
  });

  this.title = options.title;
  this.url = options.url;
  this.se = options.se;  // Seeders.
  this.le = options.le;  // Leechers.
}


/**
* Search youtube
*/



/**
 * Search in KickAssTorrents.
 */
function searchKat(query, callback) {
  if (typeof query !== 'string') {
    throw new Error('query must be string');
  }
  if (typeof callback !== 'function') {
    throw new Error('callback must be function');
  }

  var queryUrl = 'http://dwtorrent.com/usearch/' + encodeURIComponent(query) + '/';

  return request.get(queryUrl, function(err, response, body) {
    if (err) {
      return callback(err);
    }

    return jsdom.env(body, function(_, window) {
      var results = Array.prototype.slice.call(
        window.document.querySelectorAll('.data tr:not(.firstr)')
      ).map(function(row) {
        var ml = row.querySelector('.cellMainLink');
        var title = ml.textContent.trim();
        var torrentUrl = url.resolve(queryUrl, ml.getAttribute('href'));

        var stats = Array.prototype.slice.call(
          row.querySelectorAll('td'),
          -2
        ).map(el => parseInt(el.textContent, 10));

        var se = stats[0];
        var le = stats[1];

        return new Result({
          title: title,
          url: torrentUrl,
          se: se,
          le: le,
        });
      });

      return callback(null, results);
    });
  });
}

/**
 * Search in ThePirateBay.
 */
function searchPb(query, callback) {
  if (typeof query !== 'string') {
    throw new Error('query must be string');
  }
  if (typeof callback !== 'function') {
    throw new Error('callback must be function');
  }

  var searchUrl = 'https://thepiratebay.to/s/?q=' + encodeURIComponent(query) + '&page=0&orderby=99';

  return request.get(searchUrl, function(err, response, body) {
    if (err) {
      return callback(err);
    }

    return jsdom.env(body, function(_, window) {
      var results = Array.prototype.slice.call(
        window.document.querySelectorAll('#searchResult tr')
      ).map(function(row) {
        var titleLink = row.querySelector('.detName a');
        if (!titleLink) {
          return;
        }

        var title = titleLink.textContent.trim();
        var torrentUrl = url.resolve(searchUrl, titleLink.getAttribute('href'));

        var stats = Array.prototype.slice.call(
          row.querySelectorAll('td'),
          -2
        ).map(el => parseInt(el.textContent, 10));

        var se = stats[0];
        var le = stats[1];

        return new Result({
          title: title,
          url: torrentUrl,
          se: se,
          le: le,
        });
      }).filter(r => !!r);

      return callback(null, results);
    });
  });
}

exports.searchKat = searchKat;
exports.searchPb = searchPb;

var readyLog = function(msg,d,u,uid) {
	if(!u) { var u = bot_nickname; }
	if(!uid) { var uid = "Music"; }
	var sys = require('util');
	var exec = require('child_process').exec;
	//client.channels.get(discord_channel_id_log).send("!radio play");	
	fs.readFile('.git/refs/heads/master', function(err, data) {
		var gitHash = data.toString().substr(null,8);
		console.log("Repository Hash: "+gitHash);
		console.log("---------------------------\n");
		client.channels.get(discord_channel_id_log).send("<:main_computer:420575980198035456> <:terminalreal:421547027051184128>  `[Main Computer] Bot @ WA.Net(Jr)# Systems initialized, starting node daemon...`\n```css\nBot Started Successfully!\n\nBot PID { "+process.pid+" }\n\nRepository Version Hash { "+gitHash+" }```");
	});
};

var restartMessage = function(msg,d,u,uid) {
	if(!u) { var u = bot_nickname; }
	if(!uid) { var uid = "System"; }
	msg.channel.send({embed: {
		color: 0xFF0000,
		author: {
			name: bot_nickname+" - Reboot",
			icon_url: bot_logo_square
		},
		//title: "User: " +u+" / " +uid,
		description: bot_nickname+" is restarting now!\n\nThis process can take up to a minute. If it takes longer check your console.",
		timestamp: new Date(),
		footer: {
			text: info_copyright
		}
	}});
};

function clean(text) {
	if (typeof(text) === "string") {
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	} else {
		return text;
	}
}

function sleep(time, callback) {
	var stop = new Date().getTime();
	while(new Date().getTime() < stop + time) {
		;
	}
	callback();
}

function botReboot() {
	sleep(2000, function() {
	});
	process.exit();
}
const commands = {
	'test': (msg) => {
		//msg.delete(1000);
		if (msg.author.id == bot_admin_id) {
				msg.channel.send('test');
		}
	}
};
function radioNowPlaying(sourceInfo){
	http.get("http://radio.worldautomation.net/status-json.xsl", function(res){
		var data = '';

		res.on('data', function (chunk){
			data += chunk;
		});

		res.on('end',function(){
			var obj = JSON.parse(data);
			console.log( obj.icestats.source[sourceInfo] );
			console.log( "Title: "+obj.icestats.source.title+" Peak Listeners: "+obj.icestats.source.listener_peak+" Current Listeners: "+obj.icestats.source.listeners+" Bit Rate: "+obj.icestats.source.bitrate+"");
		});
	});
}
client.on('ready', () => {
	readyLog("",bot_nickname+" PID #"+process.pid+" is Ready!");
	console.log("\n\n\n");
	console.log(bot_nickname+" is ready for you!");
	console.log("---------------------------");
	console.log("Bot is Ready!");
	console.log("---------------------------");
	radioNowPlaying();


});

client.on('message', msg => {

	//console.log("["+logTimestamp+"] "+msg.author.username+"("+msg.author.id+") "+msg);

		if (commands.hasOwnProperty(msg.content.toLowerCase().slice(bot_prefix.length).split(' ')[0])) {
			commands[msg.content.toLowerCase().slice(bot_prefix.length).split(' ')[0]](msg);
		}
	
});

client.login(bot_token);



}
  
