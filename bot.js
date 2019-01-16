// NodeDirt-Disco Discord Bot
// Visit https://www.nodedirt.com
// Join our Discord @ https://discord.gg/crtdzEE

const { Client } = require('discord.js');
config = require('./config.json'),
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
var discord_channel_id_discord_log = config.discord_channel_id_discord_log;
var discord_channel_id_welcome = config.discord_channel_id_welcome;
var discord_channel_id_radio = config.discord_channel_id_radio;
var discord_channel_id_botspam = config.discord_channel_id_botspam;
var discord_auto_role_name = config.discord_auto_role_name;
var discord_newuser_default_role_name = config.discord_newuser_default_role_name;
var discord_server_support_role_id_one = config.discord_server_support_role_id_one;
var discord_server_support_role_id_two = config.discord_server_support_role_id_two;
var discord_invite_link = config.discord_invite_link;
var modlist_link = config.modlist_link;
var mysql_host = config.mysql_host;
var mysql_user = config.mysql_user;
var mysql_pass = config.mysql_pass;
var mysql_database = config.mysql_database;
var info_website = config.info_website;
var info_copyright = config.info_copyright;
var api_youtube_data = config.api_youtube_data;
var api_google_shortener = config.api_google_url;

var mm = require('musicmetadata');


var aliasesFile = "./aliases.yml";
//Current Date/Time
var currentdate = new Date(); 
var logTimestamp = "Resist.Network | " + currentdate.getDate() + "/"
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
				
//Need to be a json file so we can keep it after restart... *Cough* fanbus
let queue = {};

//Depending on your command framework (or if you use one), it doesn't have to
//edit messages so you can rework it to fit your needs. Again, this doesn't have
//to be async if you don't care about message editing.
async function googleCommand(msg, args) {

// These are our two variables. One of them creates a message while we preform a search,
// the other generates a URL for our crawler.
let searchMessage = await msg.reply("`Querying the matrix for answers...`");
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
		searchMessage.edit("`Answer found, see attached.`\n "+googleData.q);
		
// If no results are found, we catch it and return 'No results are found!'
	}).catch((err) => {
		searchMessage.edit("`No results found!`");
	});
}
//movies
async function movieCommand(msg, args) {

// These are our two variables. One of them creates a message while we preform a search,
// the other generates a URL for our crawler.
let searchMessage = await msg.reply("`Querying the matrix for answers...`");
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
		searchMessage.edit("`Answer found, see attached.`\nhttps://Resist.Network/files/everlast.mp4");
		
// If no results are found, we catch it and return 'No results are found!'
	}).catch((err) => {
		searchMessage.edit("`No results found!`");
	});
}
//Some Lmp3ing Stuff
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


// radio now playing
function radioNowPlaying(channel){
	http.get("http://bot.Resist.Network:8000/status-json.xsl", function(res){
		var data = '';

		res.on('data', function (chunk){
			data += chunk;
		});

		res.on('end',function(){
			var obj = JSON.parse(data);
		client.channels.get(channel).send(":arrow_forward:  `Displaying current track and stream information...`\n```css\nCurrent Track { "+obj.icestats.source.title.replace(/_/g, ' ').replace(/-/g,' ')+" }\nNext Track { Not Yet Implemented }\nPrevious Track { Not Yet Implemented }\nPeak Listeners { "+obj.icestats.source.listener_peak+" }\nCurrent Listeners { "+obj.icestats.source.listeners+" }\nCurrent Bit Rate { "+obj.icestats.source.bitrate+" }```");
		});
	});
	return true;
}

function radioQueue(channel){
//	console.log("Testing radio queue...");
	http.get("http://bot.Resist.Network:8000/status-json.xsl", function(res){
		var data = '';

		res.on('data', function (chunk){
			data += chunk;
		});

		res.on('end',function(){
			var obj = JSON.parse(data);
			var title = obj.icestats.source.title.replace(/\/storage\/resist-discord-bot\/assets\/public\/music\//g, "").replace(/__/g, " ").replace(/_/g, " ");
			console.log("Current Track { "+title+" }");

			var sys = require('util');
			var exec = require('child_process').exec;
			function puts(error, stdout, stderr) { 
				var playList = stdout.replace(/.mp3/g, "").replace(/\/storage\/resist-discord-bot\/assets\/public\/music\//g, "").replace(/__/g, " ").replace(/_/g, " ");
				var finalPlayList = playList.replace(title,"{ "+title+" }");
				//console.log(finalPlayList);
				client.channels.get(channel).send(":arrow_forward:  `Displaying current radio queue...`\n```css\n"+finalPlayList+"```");
				return true;
			}
			exec("cat /storage/listen.m3u", puts);
			
		});
	});
}
function radioRemove(channel){
	console.log("Starting radio remove...");
	http.get("http://bot.Resist.Network:8000/status-json.xsl", function(res){
		var data = '';

		res.on('data', function (chunk){
			data += chunk;
		});

		res.on('end',function(){
			var obj = JSON.parse(data);
			var title = obj.icestats.source.title + ".mp3";
			var titlePretty = obj.icestats.source.title.replace(/\/storage\/resist-discord-bot\/assets\/public\/music\//g, "").replace(/__/g, " ").replace(/_/g, " ");

			var sys = require('util');
			var exec = require('child_process').exec;
			function puts(error, stdout, stderr) { 
				client.channels.get(channel).send(":wastebasket:  `Removed "+titlePretty+" `from the radio queue`!");
				return true;
			}
			exec("rm -rf /storage/resist-discord-bot/assets/public/music/"+title, puts);
			exec("pkill -10 ices && pkill -1 ices");
	
			setTimeout(function () {
				radioNowPlaying(discord_channel_id_botspam);
			}, 10000);				
		});
	});
}
function radioRemoveBackend(channel,player){
	console.log("Starting radio remove...");
	http.get("https://bot.Resist.Network/status-json.xsl", function(res){
		var data = '';

		res.on('data', function (chunk){
			data += chunk;
		});

		res.on('end',function(){
			var obj = JSON.parse(data);
			var title = obj.icestats.source.title + ".mp3";
			var titlePretty = obj.icestats.source.title.replace(/\/storage\/WA-Bot\/assets\/public\/music\//g, "").replace(/__/g, " ").replace(/_/g, " ");

			var sys = require('util');
			var exec = require('child_process').exec;
			function puts(error, stdout, stderr) { 
				client.channels.get(channel).send(":wastebasket:  `Player "+player+" removed "+titlePretty+" `from the radio queue`!");
				//client.channels.get("419425539884056587").send(":wastebasket:  `Player "+player+" removed "+titlePretty+" `from the radio queue`!");
				return true;
			}
			exec("rm -rf /storage/resist-discord-bot/assets/public/music/"+title, puts);
			exec("pkill -10 ices && pkill -1 ices");
	
			setTimeout(function () {
				radioNowPlaying(discord_channel_id_botspam);
			}, 10000);				
		});
	});
}
//timeout
var timed_out = false,
    timer     = setTimeout(function() {
        timed_out = true;
		radioNowPlaying(discord_channel_id_botspam);
    }, (1000*60*3)); // ten minutes passed


function A() {
    radioNowPlaying(discord_channel_id_botspam, function(result) { // call func with callback
        if (result) {
             clearTimeout(timer);
             DONE();
			 //radioNowPlaying("422898611106480139");
        }else if (! timed_out ) {
            setTimeout(A, 1000); // call again in 10 seconds
        }
    });
}
//end timeout
//end radio now playing
exports.searchKat = searchKat;
exports.searchPb = searchPb;
var readyLog = function(msg,d,u,uid) {
	if(!u) { var u = bot_nickname; }
	if(!uid) { var uid = "System"; }
	var sys = require('util');
	var exec = require('child_process').exec;
//	client.channels.get(discord_channel_id_log).send("!radio play");	
	fs.readFile('.git/refs/heads/master', function(err, data) {
		var gitHash = data.toString().substr(null,8);
		console.log("Repository Hash: "+gitHash);
		console.log("---------------------------\n");
		client.channels.get(discord_channel_id_botspam).send("`Bot PID { "+process.pid+" }, Repo Hash { "+gitHash+" } started successfully!`");
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
	'reload': (msg) => {
		//msg.delete(1000);
		var gitHash;
		fs.readFile('.git/refs/heads/master', function(err, data) {
			var gitHash = data.toString().substr(null,8);
			let host = msg.content.split(' ')[1];
			var sys = require('util')
			var exec = require('child_process').exec;
			function puts(error, stdout, stderr) { 
				client.channel(discord_channel_id_log).send({embed: {
					color: 0xff8000,
					author: {
						name: bot_nickname+" - Reload",
						icon_url: bot_logo_square
					},
					//title: "Querying "+host+ "...",
					description: "```Reloading Bot...\n\nBot PID: "+process.pid+"\n\nRepository Version Hash: "+gitHash+"```",
					timestamp: new Date(),
					footer: {
						text: info_copyright
					}
				}});
				msg.channel.send({embed: {
					color: 0xff8000,
					author: {
						name: bot_nickname+" - Reload",
						icon_url: bot_logo_square
					},
					//title: "Querying "+host+ "...",
					description: "```Reloading Bot...\n\nBot PID: "+process.pid+"\n\nRepository Version Hash: "+gitHash+"```",
					timestamp: new Date(),
					footer: {
						text: info_copyright
					}
				}});				
			}
			if (systemOS === "win32") {
				exec("UnSupported OS !!", puts);
			} else {
				var lastChannel = msg.channel.id;
				exec('echo "'+lastChannel+'" > /storage/resist-discord-bot/lastChannel');
				exec("/storage/resist-discord-bot/reload.sh &");
				//exec("", puts);
			}	
		});
	},'shutdown': (msg) => {
		//msg.delete(1000);
		if (msg.author.id == bot_admin_id) {
				process.exit();
		}
	},'reboot': (msg) => {
		//msg.delete(1000);
		if (msg.author.id == bot_admin_id) {

			let host = msg.content.split(' ')[1];
			var sys = require('util')
			var exec = require('child_process').exec;
			function puts(error, stdout, stderr) { 
				msg.channel.send({embed: {
					color: 0xff8000,
					author: {
						name: bot_nickname+" - Rebooting Host",
						icon_url: bot_logo_square
					},
					//title: "Querying "+host+ "...",
					description: "```"+stdout+"```",
					timestamp: new Date(),
					footer: {
						text: info_copyright
					}
				}});
			}
			if (systemOS === "win32") {
				//exec("ping -n 5 "+host, puts);
			} else {
				exec("echo Rebooting the Host...;sudo reboot;", puts);
			}
		}
	},'purge': (msg) => {
		//msg.delete(1000);
		var message = msg;
		let amount1 = msg.content.split(' ')[1];
		var amount = parseInt(amount1)+1;
		var amountInt = parseInt(amount)+0;
		if (!amount) { 
			message.channel.send(":wastebasket: :exclamation: `You must specify an amount of messages!`");
		} else if (parseInt(amount1) > 50) {
			message.channel.send(":wastebasket: :exclamation: `You must specify an amount under 50!`");
		} else {
			message.channel.bulkDelete(amount).then(message.channel.send(":wastebasket:  `Purged "+amount1+" message(s) from channel <#"+msg.channel.id+">!` ```css\nMessages Purged { "+amount1+" }\nChannel Purged { #"+msg.channel.name+" }\nUser { "+msg.author.username+"/"+msg.author.id+" }\n\nThis message will self destruct in 5 seconds...```").then(msg => msg.delete(5000)).catch(err => console.log(err)));
		}
	},'brag': (msg) => {
		//msg.delete(1000);
		if (msg.author.id == bot_admin_id) {
			var descriptionAbout = "Our bots do things yours can't. Haha.";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    //author: {
				//	name: bot_nickname+" - About",
				//	icon_url: bot_icon_about
			    //},
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
/* 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, */
            //fields: [{
			//		"name": "Host OS Info: ",
			//		"value": os.type()+" ("+os.platform+") "+os.arch()
            //}],
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			});
		}
	},'about': (msg) => {
		//msg.delete(1000);
		//if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("`Querying the answer to life, the universe, and everything...` ```css\n42 :)\n\nCustom Open Source Discord Bot built with [Node] and [Discord.js] for our Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!\n\n{ Resist.Network | All Rights Reserved }```");
	},'sendnudes': (msg) => {
		    msg.channel.send("`Well, I suppose its ok since I know you...`\nhttps://i.dailymail.co.uk/i/pix/2015/07/15/15/2A8D0D2000000578-0-image-a-34_1436968980848.jpg");
	},'auth-login': (msg) => {
		let player = msg.content.split(' ')[1];
		msg.delete(1000);
		//if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("<:barcode:420860838438502400>  `Verified biometric and secure authentication bit for "+player+" successfully!`");
	},'auth-login-fail': (msg) => {
		let player = msg.content.split(' ')[1];
		msg.delete(1000);
		//if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send(":spy:  `Unable to verify "+player+"'s secure biometric authentication bit... impostor?`");
	},'auth-register': (msg) => {
		let player = msg.content.split(' ')[1];
		msg.delete(1000);
		//if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("<:thumbprint:420873257370124290>  `Created a new authentication bit for "+player+" successfully, updating protocols and assigning system access...` ```css\nSystem Username: { username }\nSystem Password: { ********** }\nUser Home: { /home/username }\nSecure Shell Access: { ssh.Resist.Network }\n\nSystem user provisioned successfully in matrix!\n\nMay the odds ever be in your favor!```");
	},'clear': (msg) => {
		msg.delete(1000);
		var authToken = bot_token;
		
		// https://github.com/yanatan16/nanoajax
		!function(t,e){function n(t){return t&&e.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)?new XDomainRequest:e.XMLHttpRequest?new XMLHttpRequest:void 0}function o(t,e,n){t[e]=t[e]||n}var r=["responseType","withCredentials","timeout","onprogress"];t.ajax=function(t,a){function s(t,e){return function(){c||(a(void 0===f.status?t:f.status,0===f.status?"Error":f.response||f.responseText||e,f),c=!0)}}var u=t.headers||{},i=t.body,d=t.method||(i?"POST":"GET"),c=!1,f=n(t.cors);f.open(d,t.url,!0);var l=f.onload=s(200);f.onreadystatechange=function(){4===f.readyState&&l()},f.onerror=s(null,"Error"),f.ontimeout=s(null,"Timeout"),f.onabort=s(null,"Abort"),i&&(o(u,"X-Requested-With","XMLHttpRequest"),e.FormData&&i instanceof e.FormData||o(u,"Content-Type","application/x-www-form-urlencoded"));for(var p,m=0,v=r.length;v>m;m++)p=r[m],void 0!==t[p]&&(f[p]=t[p]);for(var p in u)f.setRequestHeader(p,u[p]);return f.send(i),f},e.nanoajax=t}({},function(){return this}());

		var regexReactId = /\$[0-9]+/g
		var ids = $$('[data-reactid*=":$"].message-text').map(function getMessageId(el) {
			var reactid = el.getAttribute('data-reactid')
			var match = reactid.match(regexReactId)
			var id = match.pop().substr(1)
			return id
		}).filter(function(id){
			return !!id
		})
		var channel = window.location.href.split('/').pop()
		var base_url = 'https://discordapp.com/api/channels/' + channel + '/messages/'
		var deleteLoop = function(){
			if (! ids.length) { return }
			var id = ids.pop()
			nanoajax.ajax({
				url: base_url + id,
				method: 'DELETE',
				headers: {
					authorization: authToken
				}
			}, function(){
				setTimeout(deleteLoop, 500)
			})
		}
		deleteLoop()		
		msg.channel.send("`Wiping all channel hard drives and cache buffers for channel...`");
	},'announcement': (msg) => {
		let announcement = msg.content.split(/\s(.+)/)[1];
		msg.delete(1000);
		if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("<:wa:502866072152571924>:loudspeaker:  `Announcement for` @everyone `. See attached.`\n"+announcement).then(function (message) {
              this.addReaction("👍", msg.author)
              this.addReaction("👍", msg.author)
              //message.pin()
              //message.delete()
            }).catch(function() {
              //Something
             });;
		}
	},'maintenance': (msg) => {
		let maintenance = msg.content.split(/\s(.+)/)[1];
		msg.delete(1000);
		if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("<:wa:502866072152571924><:cone:421166940531326977>  `Performing maintenance on internal systems, expected ETA is "+maintenance+"!`");
		}
	},'rules': (msg) => {
		msg.delete(1000);
		//if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("`Initializing Resist.Network rules database provided by Derakel :P ...`\n\n<:wa:502866072152571924>__**Resist.Network RULES**__ <:wa:324446350211284992>\n\n**Member Rules\n===========================**\n```css\n#1 Respect the Decisions of the Staff. Do not undermine their authority.\n\n#2 We are an English speaking Community mostly. Support cannot be guaranteed, but we will try.\n\n#3 DO NOT disrespect anyone. Racism, Sexism or any other -ism is not tolerated.\n\n#4 DO NOT act in a Childish Behavior, CAUSE DRAMA or TROLL other Members.\n\n#5 DO NOT Spam/Harass Channels with either Text, Microphone or Bots.\n\n#6 DO NOT excessively use capslock. (LOL or ROFL is fine)\n\n#7 DO NOT Advertise other Discords, Servers and/or Communities. Streamers are an exception if they are promoting our Community.\n\n#8 DO NOT bring conversations into the wrong Channels.\n\n#9 Everyone swears... BUT overuse of profanity is very much frowned upon.\n\n#10 Do not speak about illegal activities, substances or anything of the sort.\n\n#11 If you have a Complaint, Question or Issue; please go to https://Resist.Network and submit a topic.```\n**Staff Rules\n===========================**\n```css\n#1 Do not change Discord Settings without Administrative Authorization.\n\n#2 Do not assume that you are above anyone or any Rules that Members must follow.\n#3 Just because you 'can' do something, doesn't mean you should.```", {
				files: [
				"https://Resist.Network/images/home_logo.png"
			]
			});
	},'motd': (msg) => {
		msg.delete(1000);
		//if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("`Initializing Resist.Network...` ```prolog\nWelcome to the Resist.Network Minecraft Community! We host our own custom Minecraft modpack and server. Sci-fi, Futuristic, CyberPunk themed tech only survival pack. \n\nPlease check our chat channels, or visit our website at the link below for the mod list, launcher information,\nconnect information and much much more. Good luck!```\n\nGet it Now!  [ https://Resist.Network/get-the-game ]\n\nJoin <#234843566248034305> for regular chat and to meet the community!\n\n**SERVER INFORMATION**```css\nMinecraft (Custom Modded) Version { 1.12.2 }\nServer Address { Resist.Network }\nServer Port { 25565 }\n```\n**OPEN A SUPPORT TICKET** - **!open**\n```ldif\nCreates a private channel and staff will assist you when they are available.\n\nFor immediate help, check the FTB Wiki for general progression, or check out site for various custom tweaks and recipes.```\n**DOWNLOAD GAME** - **!download**\n```ldif\nProvides the downloads for Windows, Linux and OSX players.```", {
				files: [
				"https://resist.network/wp-content/uploads/2019/01/textcrop.png"
			]
			});
	},'modlist': (msg) => {
		//if (msg.author.id == bot_admin_id) {
/* 			var descriptionAbout = "```Custom Open Source Discord Bot built with Discord.js for our custom Minecraft community and server.\n\nFor more information including current and planned features visit the link above.\n\nBig Brother is Watching You!```";
			msg.channel.send({embed: {
			    color: 0xff8000,
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_logo_square,
					url: "https://Resist.Network"
			    },
			    //title: bot_nickname,
			    //url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			}); */
			msg.channel.send("`Oh right, get it here...` "+modlist_link)
	},'status' : (msg) => {
		//msg.delete(1000);
		var freeMem = prettySize(os.freemem());
		var totalMem = prettySize(os.totalmem());
		var milliSecUp = os.uptime() * 1000;
		var upTime = prettyMs(milliSecUp, {verbose: true});
		msg.channel.send("`Querying bot node statistics...`\n```Memory Usage: "+freeMem+" Free / "+totalMem+" Total \n\nBot OS/Arch: "+os.type()+" ("+os.arch()+")\n\nBot Node FQDN: "+os.hostname()+"\n\nBot Node Update: "+upTime+"```");
	},'help': (msg) => {
		if(msg.member.roles.find("name", "Admin") || msg.member.roles.find("name", "GM") || msg.member.roles.find("name", "Mod")) {
			msg.author.send("`Since you are staff, here are some extras...` ```css\n.MINECRAFT_PLAYER_FIXES\n!unstuck [playerName] { Teleports the player to spawn. }\n!reset [playerName] {Resets players account password. The will get a new pin on join. }\n\n.BOT\n!status { Get Main Computer's (BOT) node statistics. }\n\n```");

		//Rest of your code
		}
		msg.channel.send("`Here are my Discord commands...` ```css\n.MINECRAFT\n/register [newPassword] { Register your player name in game, and reserves your website account for that name. }\n/login [yourPassword] { Only needed once per server restart. Verifies your identity. }\n\/changepass [oldPassword] [newPassword] { Changes your in game and website password. }\n\n.MINECRAFT_RADIO \n/add [searchTerm] { Get and grab first result as a new radio track. }\n/skip { Skip to the next track in the queue. }\n/remove { Removes currently playing track from the queue. }\n\n.BOT_PLAYER\n!player [playerName] { Get the information card for a player. }\n!achievements top { Get current top achievement owners server wide. }\n\!achievements [playerName] { Get a players achievement list. }\n!time top { Get top playtimes for the server. }\n!time [playerName] { Get a players time statistics. }\n!tps { Get current WA.Net server TPS. }\n!open { Opens a support ticket with staff. }\n\n.BOT_RADIO \n!radio add [searchTerm] { Get and grab first result as a new radio track. }\n!radio skip { Skip to the next track in the queue. }\n!radio remove { Removes currently playing track from the queue. }\n!radio nowplaying { Shows currently playing live track information. }\n!radio queue { Shows the current live radio queue and lineup. }\n\n.BOT_GOOGLE\n!google [searchTerm] { Search Google and return first result. }\n\n.BOT_YOUTUBE\n!ytdl [searchTerm] { Download, encode and serve up the video off our servers as MP4 for later or mobile. }\n\n.BOT_NETWORK_UTILITY\n!speedtest { Run a network speed test on Main Computer's (BOT) node. }\n!nmap [hostName] { Perform a port scan on host/IP. }\n!ping [hostName] { Ping a host/IP. }\n!nslookup [hostName] { Get domain name server information on a host/IP. }\n!dig [hostName] { Get network dig information from a host/IP. }\n!traceroute [hostName] { Expose the network route of a host/IP. }\n\n.BOT_MISCELLANEOUS\n!about { About this bot. }```");		
		//msg.delete(1000);
	},'ping': (msg) => {
		//msg.delete(1000);		
		let host = msg.content.split(' ')[1];
		var mentionCommandAuthor = "<@"+msg.author.id+">";
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { 
			msg.channel.send(""+mentionCommandAuthor+" `I pinged "+host+" with a few packets, see attached...`\n```ldif\n"+stdout+"```"); 
		}
		if (systemOS === "win32") {
			exec("ping -n 5 "+host, puts);
		} else {
			exec("ping -c 5 "+host, puts);
		}
	},'tps': (msg) => {
		//msg.delete(1000);		
		let host = msg.content.split(' ')[1];
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { 
			if(stdout == "") {
				msg.channel.send("`Querying game server overall health and ticks per second...` ```Well, I may be artificial, but I am far from perfect. Error!```");			
			} else {
				msg.channel.send("`Querying game server overall health and ticks per second...` ```css\n"+stdout+"```");
			}
		}
		if (systemOS === "win32") {
			//exec("ping -n 5 "+host, puts);
		} else {
			exec("/bin/bash /storage/resist-discord-bot/tps.sh", puts);
		}
	},'achievements': (msg) => {
		//msg.delete(1000);		
		let user = msg.content.split(' ')[1];
		if (user == "top") {
			var sys = require('util');
			var exec = require('child_process').exec;
			function puts(error, stdout, stderr) { 
				msg.channel.send(":medal:  `Displaying top achievements for user "+user+"` ```css\n"+stdout+"```");
			}
			if (systemOS === "win32") {
				//exec("ping -n 5 "+host, puts);
			} else {
				exec("/storage/aach.sh | iconv -f utf-8 -t utf-8 -c", puts);
			}
		} else if (!user) {
			msg.channel.send(":medal: :exclamation: `Must either specify [top] or a [playerName]!`");
		} else {
			msg.channel.send(":medal:  `Displaying recent top achievements for all users...` ```css\nNot Yet Implemented!```");
		}
	},'time': (msg) => {
		//msg.delete(1000);		
		let user = msg.content.split(' ')[1];
		if (!user) {
			msg.channel.send(":medal: :exclamation: `Must either specify [top] or a [playerName]!`");
		} else {
			var sys = require('util');
			var exec = require('child_process').exec;
			function puts(error, stdout, stderr) { 
				stdout = stdout.replace(/WA.Net#  /g, "");
				stdout = stdout.replace(/WA.Net# /g, "");
				stdout = stdout.replace(/-- Resist.Network   OnTime    LeaderBoard--/g, "");
				if (user == "top") {
					msg.channel.send(":stopwatch:  `Querying time statistics for all players...` ```css\n"+stdout+"```");
				} else {
					msg.channel.send(":stopwatch:  `Querying "+user+"'s time statistics...` ```css\n"+stdout+"```");
				}
			}
			if (systemOS === "win32") {
				//exec("ping -n 5 "+host, puts);
			} else {
				exec("/storage/time.sh "+user+" | iconv -f utf-8 -t utf-8 -c", puts);
			}
		}
	},'download': (msg) => {
		//msg.delete(1000);
		msg.channel.send("`Compiling and preparing recent game download links...` ```css\nWINDOWS OS { WA-Installer.exe }\n\nUNIVERSAL OS { WorldAutomation.jar }\n\n\n\nBest for our game and mod pack. \n\nImproves textures, usability, UI, and overall player experience.\n\n\n\nREQUIREMENTS { Java 8 x64 Required }\n\nAUTHORS { Th3Fanbus, MrJoseph }\n\nSOURCE { github.com/worldautomation/WA-Bot }```**Also Available on the popular Technic Launcher:** **https://www.technicpack.net/modpack/worldautomation**\n\n", {
/* 			embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Custom Launcher Download",
					icon_url: bot_logo_square
				},
				//title: "Querying "+host+ "...",
				description: "```WINDOWS = WA-Installer.exe\n\nLINUX / OSX = WorldAutomation.jar\n\n\n\nBest for our game and mod pack. \n\nImproves textures, usability, UI, and overall player experience.\n\n\n\nREQUIREMENTS: Java 8 x64 Required\n\nAUTHORS: Th3fanbus, MrJoseph\n\nSOURCE: github.com/worldautomation/WA-Bot```",
				timestamp: new Date(),
				footer: {
					text: info_copyright
				}
			}, */
			files: [
				"./downloads/WA-Installer.exe",
				"./downloads/WorldAutomation.jar",
				"https://Resist.Network/images/home_logo.png"
			]
		});
	},'webpage': (msg) => {
		//msg.delete(1000);
		let requestPage = msg.content.split(' ')[1];
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { 
			msg.channel.send("```"+stdout+"```")
		}
		msg.channel.send({embed: {
			color: 0x2DD302,
			author: {
				name: bot_nickname+" - Grab a Web Page",
				icon_url: bot_logo_square
			},
			//title: "Querying "+host+ "...",
			description: "```Check Below for your Page!```",
			timestamp: new Date(),
			footer: {
				text: info_copyright
			}
		}});			
		if (systemOS === "win32") {
			//exec("ping -n 5 "+host, puts);
		} else {
			var page = "lynx "+requestPage+" --dump -nolist";
			exec(page, puts);
		}
	},'speedtest': (msg) => {
		//msg.delete(1000);		
		var mentionCommandAuthor = "<@"+msg.author.id+">";
		msg.channel.send("`Running speed test from bot host node, please wait...`");
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { 
			msg.channel.send(""+mentionCommandAuthor+" `Speed test result is complete, see attached.`\n```css\n"+stdout+"```"); 
		}
		exec("/storage/resist-discord-bot/speedtest.sh", puts);
	},'update': (msg) => {
		msg.channel.send("`Starting update, please wait...`"); 
		//msg.delete(1000);
		let host = msg.content.split(' ')[1];
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) {
			msg.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Self Update",
					icon_url: bot_logo_square
				},
				//title: "Checking & Downloading Available Patches",
				description: "```"+stdout+"```",
			    timestamp: new Date(),
			    footer: {
			      text: info_copyright
			    }
				}
			});
		}
		exec("cd /storage/resist-discord-bot/; git pull; npm install;", puts);
 },'nslookup': (msg) => {
		//msg.delete(1000);
		var mentionCommandAuthor = "<@"+msg.author.id+">";
		let host = msg.content.split(' ')[1];
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { 
			msg.channel.send(""+mentionCommandAuthor+" `Pinging name server lookup on "+host+"...`\n```css\n"+stdout+"```"); 
		}
		exec("nslookup "+host, puts);
 },'dig': (msg) => {
		//msg.delete(1000);		
		var mentionCommandAuthor = "<@"+msg.author.id+">";
		let host = msg.content.split(' ')[1];
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { 
			msg.channel.send(""+mentionCommandAuthor+" `Digging network registry information for "+host+"...`\n```css\n"+stdout+"```"); 
		}
		exec("dig "+host, puts);
 },'gitdiff': (msg) => {
		//msg.delete(1000);
		let which = msg.content.split(' ')[1];
		//needs a which revision to diff too and some other adjustments down below in the dirty 
		var sys = require('util');
		var exec = require('child_process').exec;
		const main_computer = client.emojis.find("name", "main_computer");
		const main_minecraft = client.emojis.find("name", "main_minecraft");
		const warning = client.emojis.find("name", "warning");
		function puts(error, stdout, stderr) {
			var output = stdout.replace(/`/g, "");
			msg.channel.send("`Displaying recent cybernetic differences against revision #"+which+" of my code...` ```css\n"+output+"```");
		}
		//exec("git log --graph --abbrev-commit -n 5", puts);
		if (!which || which == 0) {
			exec("git diff HEAD~1 --word-diff=plain | head -n 30", puts);
		} else {
			exec("git diff HEAD~"+which+" --word-diff=plain | head -n 30", puts);
		}
 },'list': (msg) => {
	 //msg.delete(1000);
		let request = msg.content.split(' ')[1];
		//ar output = stdout.replace(/ /g, "%20");

		//needs a which revision to diff too and some other adjustments down below in the dirty 
		var sys = require('util');
		var exec = require('child_process').exec;
		const main_computer = client.emojis.find("name", "main_computer");
		const main_minecraft = client.emojis.find("name", "main_minecraft");
		const warning = client.emojis.find("name", "warning");
		function puts(err, results) {
			//msg.channel.send(main_computer+" "+main_minecraft+" `[Main Computer] Bot is displaying recent Discord cybernetics...` ```http\n"+stdout+"```");
			//if(err !== null) {
				//msg.channel.send(main_computer+" <:magnetv:317627959940743168> :warning: `Received no results for "+request+"!`");
			//} else {
				console.log("Results: "+results.title);
				console.log("Error: "+err);
/* 			  for (var i = 0; i < results.length; i++) {
				for (obj of results[i]) {
				   //obj = whatever field its currently on (name, email, w/e)
				   theShit = "";
				   theShit = theShit + ('| ' + obj.title + ' | ' + obj.url);
				   console.log(obj);
				   console.log(obj['title']);
				   console.log(theShit);
				   //theEmail = theEmail + theShit;
				   //msg.channel.send(main_computer+" <:magnetv:317627959940743168> `Displaying results for "+request+"...` ```python\n"+theEmail+"```")
				}		
			  }   */
				//msg.channel.send(main_computer+" <:magnetv:317627959940743168> `Displaying results for "+request+"...` ```python\n"+results[1]['title']+"```");
			//}
		}
		//exec("git log --graph --abbrev-commit -n 5", puts);
		//exec("/storage/list.sh "+request, puts);
		searchKat(request, puts);
},'radio': (msg) => {
	let cmd = msg.content.split(' ')[1];
	//msg.delete(1000);
	switch(cmd) {
		case "skip":
			exec("pkill -10 ices && pkill -1 ices");
			msg.channel.send(":fast_forward:  `Skipping to the next radio track!`");		
			
			setTimeout(function () {
				radioNowPlaying(discord_channel_id_botspam);
			}, 10000);			
			
			break;
		case "remove":
			radioRemove(discord_channel_id_botspam);		
			break;
		case "nowplaying":
			radioNowPlaying(discord_channel_id_botspam);
			break;
		case "queue":
			exec("/storage/ices-start.sh; pkill -1 ices");
			radioQueue(discord_channel_id_botspam);
			break;			
		case "test":
			let testRaw = msg.content.split(' ')[2];
			msg.channel.send('Search String: '+testRaw);
			break;
		case "wipe":
			exec("rm -rf /storage/resist-discord-bot/assets/public/music/*.mp3");
			exec("cp -rf /storage/resist-discord-bot/assets/public/music-orig/*.mp3 /storage/resist-discord-bot/assets/public/music/.");
			exec("mv /storage/listen.m3u.orig /storage/listen.m3u");
 			msg.channel.send(":wastebasket:  `Wiping radio queue...`");
			radioQueue(discord_channel_id_botspam);
 			msg.channel.send(":white_check_mark:  `Radio queue wipe completed!`");
			exec("pkill -10 ices && pkill -1 ices");			
			break;			
		case "play":
			//msg.delete(1000);
			const streamOptions = { seek: 0, volume: 1 };
			var voiceChannel = client.channels.get(discord_channel_id_radio);
			voiceChannel.join().then(connection => {
				console.log("Starting Resist.Network Radio Streamer....");
				client.channels.get(discord_channel_id_log).send("`Initializing the Resist.Network Media encoders and Playing Test Track...`");
				//radioNowPlaying("422898611106480139");
				//const stream = ytdl('http://listen.radionomy.com/hotmixradio-lounge-128.m3u', { filter : 'audioonly' });
				//const stream = ffmpeg('https://radio.Resist.Network/music/Mad_World_-_Gary_Jules.mp3');

				const dispatcher = connection.playStream("http://bot.resist.network:8000/listen.mp3", streamOptions);
				dispatcher.on("end", end => {
					console.log("Main Resist.Network ICECAST Server has quit broadcasting!");
					//msg.channel.send("<:restart:526045216839303168> `Main Radio feed has quit broadcasting, check the servers!`");
					voiceChannel.leave();
				});
			}).catch(err => console.log(err));
			break;
		case "add":
			let searchRaw = msg.content.replace(msg.content.split(' ')[0], "").replace(msg.content.split(' ')[1],"");
			if(searchRaw == "" || !searchRaw) {
				msg.channel.send(":exclamation: `You need to supply a search term with !radio add [searchTerm]...`");	
				return true;
			}
			msg.channel.send(":mag_right: `Searching YouTube for `"+searchRaw.substr(1)+" `...`");	
			console.log(searchRaw);
			var YouTube = require('youtube-node');
			var mentionCommandAuthor = "<@"+msg.author.id+">";
			var youTube = new YouTube();
			youTube.setKey(api_youtube_data);
			var prettySearchTerm = searchRaw;
			var searchTerm = searchRaw.replace(/ /g, '+');
			youTube.search(searchRaw, 1, function(error, result) {
				if (error) {
					console.log(error);
				} else {
					var result = result;
					//console.log("Pre Parse Result: "+result['items']);
					result['items'].forEach(function (video) {
						var videoNamePretty = video.snippet.title;				
						video.snippet.title = video.snippet.title.replace(/[^a-zA-Z0-9-_]/g, '_').replace("_-_", "-").replace("__-__","-");
						var videoDownload = video.snippet.title;
						var playerQueryIntro = ":small_red_triangle_down: `Starting download and encoding for "+videoNamePretty+"...`";
						var playerEmbed = {embed: {
							color: 0x000000,
							title: videoNamePretty,					
							"thumbnail": {
								"url": video.snippet.thumbnails.default.url,
							},
							description: "\n https://www.youtube.com/watch?v="+video.id.videoId+"\n```dns\nYou will be notified (mentioned) when this download is complete and in the radio queue!```"
						}};	

						//download to mp3
						var videoUrl = "https://www.youtube.com/watch?v="+video.id.videoId;   
						var tempDir = "/storage/resist-discord-bot/assets/public/music/temp"; 
						var musicDir = "/storage/resist-discord-bot/assets/public/music"; 

						var videoReadableStream = ytdl(videoUrl, { filter: 'audioonly'});

						ytdl.getInfo(videoUrl, function(err, info){
							var videoName = info.title.replace('|','').replace(/[^a-zA-Z0-9-_]/g, '_').replace("_-_", "-").replace("__-__","-");
							var videoWritableStream = fs.createWriteStream(tempDir + '/' + videoName + '.mp3'); 
							var stream = videoReadableStream.pipe(videoWritableStream);
							exec("rm /storage/listen.m3u");
							exec("find /storage/resist-discord-bot/assets/public/music | grep .mp3 > /storage/listen.m3u");
							msg.channel.send(":white_check_mark:  `Added request from ` "+mentionCommandAuthor+" ` to Live Radio...` ```"+videoNamePretty+"\nDownloaded and encoded into MP3 (Audio)...\nAdded to Resist.Network Live Radio Queue...\nEnjoy!```Listen Live in **#radio**, in Game or at -> https://Resist.Network/listen.mp3");	
							msg.channel.send(playerQueryIntro, playerEmbed);
							var tempFile = tempDir + '/' + videoName + '.mp3';
							var mp3Path = musicDir + '/' + videoName + '.mp3';
							if (fs.existsSync(mp3Path)) {
								//completeMessage();
							} else {
								stream.on('finish', function() {
								   //res.writeHead(204);
								   //res.end();
								   //move now that it is done...
									ffmpeg(tempFile).audioCodec('libmp3lame').save(mp3Path).on('end', function() {
										fs.unlinkSync(tempFile);
										//completeMessage();
										console.log('Done');
									});					   
									move(tempDir + '/' + videoName + '.mp3', musicDir + '/' + videoName + '.mp3', console.log('DONE2'));
								});    
							}
						});              
						//end download

					});
				}
			});	
			break;
		default:
			break;
	}
	
 },'radio-backend': (msg) => {
	let cmd = msg.content.split(' ')[1];
	msg.delete(1000);
	switch(cmd) {
		case "remove":
			radioRemoveBackend("422898611106480139",msg.content.split(' ')[2]);		
			break;
		case "add":
			let searchRaw = msg.content.replace(msg.content.split(' ')[0], "").replace(msg.content.split(' ')[1],"").replace(msg.content.split(' ')[2],"");
			if(searchRaw == "" || !searchRaw) {
				msg.channel.send(":exclamation: `You need to supply a search term with !radio add [searchTerm]...`");	
				return true;
			}
			msg.channel.send(":mag_right: `Player "+msg.content.split(' ')[2]+" sent in game request for`"+searchRaw.substring(2)+" `...`");	
			//client.channels.get("419425539884056587").send(":mag_right: `Player "+msg.content.split(' ')[2]+" sent in game request for`"+searchRaw.substring(2)+" `...`");	
			var YouTube = require('youtube-node');
			var mentionCommandAuthor = msg.content.split(' ')[2];
			var youTube = new YouTube();
			youTube.setKey(api_youtube_data);
			var prettySearchTerm = searchRaw;
			var searchTerm = msg.content.replace(msg.content.split(' ')[0], "").replace(msg.content.split(' ')[1],"").replace(msg.content.split(' ')[2],"").substr(3).replace(/ /g, '+');
			console.log("Searching for: '"+searchTerm+"'");

			youTube.search(searchTerm, 1, function(error, result) {
				if (error) {
					console.log(error);
				} else {
					var result = result;
					//console.log("Pre Parse Result: "+result['items']);
					result['items'].forEach(function (video) {
						var videoNamePretty = video.snippet.title;				
						video.snippet.title = video.snippet.title.replace(/[^a-zA-Z0-9-_]/g, '_').replace("_-_", "-").replace("__-__","-");
						var videoDownload = video.snippet.title;
						var playerQueryIntro = ":small_red_triangle_down: `Starting download and encoding for "+videoNamePretty+"...`";
						var playerEmbed = {embed: {
							color: 0x000000,
							title: videoNamePretty,					
							"thumbnail": {
								"url": video.snippet.thumbnails.default.url,
							},
							description: "\n https://www.youtube.com/watch?v="+video.id.videoId+"\n```dns\nYou will be notified (mentioned) when this download is complete and in the radio queue!```"
						}};	

						//download to mp3
						var videoUrl = "https://www.youtube.com/watch?v="+video.id.videoId;   
						var tempDir = "/storage/resist-discord-bot/assets/public/music/temp"; 
						var musicDir = "/storage/resist-discord-bot/assets/public/music"; 

						var videoReadableStream = ytdl(videoUrl, { filter: 'audioonly'});

						ytdl.getInfo(videoUrl, function(err, info){
							var videoName = info.title.replace('|','').replace(/[^a-zA-Z0-9-_]/g, '_').replace("_-_", "-").replace("__-__","-");
							var videoWritableStream = fs.createWriteStream(tempDir + '/' + videoName + '.mp3'); 
							var stream = videoReadableStream.pipe(videoWritableStream);

							function completeMessage() {
								//
								request.post('https://www.googleapis.com/urlshortener/v1/url?key='+api_google_shortener, {
								  json: {
									'longUrl': 'https://radio.Resist.Network/music/'+video.snippet.title+'.mp3'
								  }
								}, function (error, response, body) {
								  //if(error) {
									//console.log(error)
								 // } else {
									exec("rm /storage/listen.m3u");
									exec("find /storage/resist-discord-bot/assets/public/music | grep .mp3 > /storage/listen.m3u");
									msg.channel.send(":white_check_mark:  `Added request from in game player "+mentionCommandAuthor+" to Live Radio...` ```"+videoNamePretty+"\nDownloaded and encoded into MP3 (Audio)...\nAdded to Resist.Network Live Radio Queue...\nEnjoy!```Listen Live in **#radio**, in Game or at -> https://Resist.Network/listen.mp3");	
									//console.log(response.statusCode, body)
								  //}
								})
								//
							}
							msg.channel.send(playerQueryIntro, playerEmbed);
							var tempFile = tempDir + '/' + videoName + '.mp3';
							var mp3Path = musicDir + '/' + videoName + '.mp3';
							if (fs.existsSync(mp3Path)) {
								completeMessage();
							} else {
								stream.on('finish', function() {
								   //res.writeHead(204);
								   //res.end();
								   //move now that it is done...
									ffmpeg(tempFile).audioCodec('libmp3lame').save(mp3Path).on('end', function() {
										fs.unlinkSync(tempFile);
										completeMessage();
										//console.log('Done');
									});					   
									//move(tempDir + '/' + videoName + '.mp3', musicDir + '/' + videoName + '.mp3', completeMessage);
								});    
							}
						});              
						//end download

					});
				}
			});	
			break;
		default:
			break;
	}
 },'ytdl': (msg) => {
	let searchRaw = msg.content.substr(msg.content.indexOf(' ')+1);
	console.log(searchRaw);
	var YouTube = require('youtube-node');
	var mentionCommandAuthor = "<@"+msg.author.id+">";
	var youTube = new YouTube();
	youTube.setKey(api_youtube_data);
	var prettySearchTerm = searchRaw;
	var searchTerm = searchRaw.replace(/ /g, '+');
	////msg.delete(1000);
	youTube.search(searchTerm, 1, function(error, result) {
		if (error) {
			console.log(error);
		} else {
			var result = result;
			//console.log("Pre Parse Result: "+result['items']);
			result['items'].forEach(function (video) {
				var videoNamePretty = video.snippet.title;								
				video.snippet.title = video.snippet.title.replace(/[^a-zA-Z0-9-_]/g, '_').replace("_-_", "-").replace("__-__","-");
				var videoDownload = video.snippet.title;
				var playerQueryIntro = "<:ytdl:526045628304719891> `Starting YouTube download for "+videoNamePretty+"...`";
				//console.log(video.snippet.thumbnails.medium.url);

				//download to mp3
				var videoUrl = "https://www.youtube.com/watch?v="+video.id.videoId;   
				var youtubeTempDir = "/storage/resist-discord-bot/assets/public/youtube/temp"; 
				var youtubeDir = "/storage/resist-discord-bot/assets/public/youtube"; 

				var videoReadableStream = ytdl(videoUrl);

				ytdl.getInfo(videoUrl, function(err, info){
					var videoName = info.title.replace('|','').toString('ascii').replace(/[^a-zA-Z0-9-_]/g, '_').replace("_-_", "-").replace("__-__","-");
					var videoWritableStream = fs.createWriteStream(youtubeTempDir + '/' + videoName + '.mp4'); 
					var stream = videoReadableStream.pipe(videoWritableStream);

					function completeMessage() {
						//
						//request.post('https://www.googleapis.com/urlshortener/v1/url?key='+api_google_shortener+'', {
						//  json: {
						//	'longUrl': 'https://Resist.Network/register'
						//  }
						//}, function (error, response, body) {
						var resistURL = 'https://bot.Resist.Network/youtube/'+video.snippet.title+'.mp4';
						var playerEmbed = {embed: {
							color: 0x000000,
							title: videoNamePretty,					
							"thumbnail": {
								//medium/high/default
								"url": video.snippet.thumbnails.default.url,
							},
							description: "\n "+resistURL+"",
							timestamp: new Date(),
							footer: {
								text: info_copyright
							}
						}};	

							//currentEdit
						  //console.log(""+JSON.stringify(body.error)+"");
						  //if(error) {
							console.log(error)
						  //} else {
							msg.channel.send("<:ytdl:526045628304719891> `Added YouTube download request from ` "+mentionCommandAuthor+" ` to the server...`",playerEmbed);	
							//console.log(response.statusCode, body)
						  //}
						//})
						//
					}
					stream.on('finish', function() {
					   //res.writeHead(204);
					   //res.end();
					   //move now that it is done...
					   move(youtubeTempDir + '/' + videoName + '.mp4', youtubeDir + '/' + videoName + '.mp4', completeMessage);
					});           	   
					//msg.channel.send(playerQueryIntro);
				});              
				//end download

			});
		}
	});	
	
 },'nmap': (msg) => {
	 //msg.delete(1000);
		let host = msg.content.split(' ')[1];
		var mentionCommandAuthor = "<@"+msg.author.id+">";
		var sys = require('util');
		var exec = require('child_process').exec;
		const main_computer = client.emojis.find("name", "main_computer");
		const main_minecraft = client.emojis.find("name", "main_minecraft");
		function puts(error, stdout, stderr) {
			//stdout.substring(0, stdout.indexOf(" ", 2000));
			//stdout.substring(stdout.indexOf(" ", 2000));
			msg.channel.send(""+mentionCommandAuthor+" `Displaying port scan of "+host+"...` ```css\n"+stdout+"```");
			//msg.channel.send(main_computer+" "+main_minecraft+" `[Main Computer] Bot is displaying recent Discord cybernetics...` ```http\n"+stdout.substring(stdout.indexOf(" ", 2000));
		}
		//exec("git log --graph --abbrev-commit -n 5", puts);
		exec("nmap -T4 -F -Pn "+host, puts);
 },'screen': (msg) => {
	 //msg.delete(1000);
		let host = msg.content.split(' ')[1];
		var sys = require('util');
		var exec = require('child_process').exec;
		const main_computer = client.emojis.find("name", "main_computer");
		const main_minecraft = client.emojis.find("name", "main_minecraft");
		function puts(error, stdout, stderr) {
			var output = stdout.replace(/`/g, "");
			//stdout.substring(0, stdout.indexOf(" ", 2000));
			//stdout.substring(stdout.indexOf(" ", 2000));
			msg.channel.send("`Displaying current main terminal session...` ```"+output+"```");
			//msg.channel.send(main_computer+" "+main_minecraft+" `[Main Computer] Bot is displaying recent Discord cybernetics...` ```"+stdout.substring(stdout.indexOf(" ", 2000));
		}
		//exec("git log --graph --abbrev-commit -n 5", puts);
		exec("tail -n 30 /storage/resist-discord-bot/screenlog.0 | sed '/^[[:space:]]*$/d;s/[[:space:]]*$//'", puts);
 },'traceroute': (msg) => {
		//msg.delete(1000);		
		let host = msg.content.split(' ')[1];
		var mentionCommandAuthor = "<@"+msg.author.id+">";
		msg.channel.send("`Tracing "+host+" through origin network... please wait...`");
		var sys = require('util');
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { 
			msg.channel.send(""+mentionCommandAuthor+" `Trace route result for "+host+" is complete, see attached.`\n```css\n"+stdout+"```"); 
		}
     exec("traceroute "+host, puts);
 },'open': (msg) => {
	 //msg.delete(1000);
		var ticketID = parseInt(fs.readFileSync('ticketID').toString());			
		ticketID = ticketID +1;
		var mentionCommandAuthor = "<@"+msg.author.id+">";
		msg.guild.createChannel('ticket-'+ticketID, 'text', [{ 
			id: discord_server_id, 
			denied: 0x400
		},{ 
			id: discord_server_support_role_id_one, 
			allowed: 0x400 
		},{ 
			id: discord_server_support_role_id_two, 
			allowed: 0x400 
		}]).then(channel => { 
			channel.setParent(discord_category_id_support); 
			channel.send(":question:  `Created secure support ticket #"+ticketID+", for `"+mentionCommandAuthor+" `...` ```css\nTICKET { #"+ticketID+" }\nPLAYER { "+msg.author.username+" }\n\nPlease type a description of the issue, and someone will assist you shortly.\n\nUse [!close] to close the ticket once you are satisified!```")}).catch(error => console.log(error));
		msg.channel.send(":question:  `Opened Ticket #"+ticketID+" for "+msg.author.username+", an ` <@&"+discord_server_support_role_id_one+"> ` or ` <@&"+discord_server_support_role_id_two+"> ` will assist you there!`");
		fs.writeFile('ticketID', ticketID, function(err){ if(err) return console.log(err); 
	});
 },'close': (msg) => {
		if(msg.channel.parent.id === discord_category_id_support) {
			msg.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Support",
					icon_url: bot_logo_square
				},
				title: "Closing Support Ticket...",
				description: "Closing Ticket!",
             fields: [{
                "name": "Username",
                "value": msg.author.username
            }, {
                "name": "User ID",
                "value": msg.author.id
            }],
			    timestamp: new Date(),
			    footer: {
			      text: info_copyright
			    }
			}
			}).then(msg.channel.delete());
		} else {
			return;
/* 			msg.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Support",
					icon_url: bot_logo_square
				},
				title: "NOT a Support Channel...",
				description: "Refusing to close channel...",
             fields: [{
					"name": "Username: ",
					"value": msg.author.username
            }, {
					"name": "User ID: ",
					"value": msg.author.id
            }],
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			}});				 */
		}
	},'google': (msg) => {
		var message = msg;
		let searchTerm = msg.content.replace(msg.content.split(' ')[0], "");
		//msg.delete(1000);
		googleCommand(msg,searchTerm);
	},'movie': (msg) => {
		var message = msg;
		let searchTerm = msg.content.split//msg.delete(1000);
		movieCommand(msg,searchTerm);
	},'eval': (msg) => {
		//msg.delete()
		var message = msg;
		const args = msg.content.split(' ').slice(1);
		if (message.content.startsWith(bot_prefix + "eval")) {
			// Perm Check Fanboy
		    if(message.author.id !== config.bot_admin_id) return;
		    try {
		      const code = args.join(" ");
		      let evaled = eval(code);

		      if (typeof evaled !== "string")
		        evaled = require("util").inspect(evaled);

		      message.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Code Evaluation",
					icon_url: bot_logo_square
				},
				//title: "Querying "+host+ "...",
				description: "```"+clean(evaled)+"```",
				fields: [{ 
					"name": "Result", 
					"value": ":sunny: Code Evaluated Successfully!"
				}],
			    timestamp: new Date(),
			    footer: {
			      text: info_copyright
			    }
			}});
		    } catch (err) {
		      message.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Code Evaluation",
					icon_url: bot_logo_square
				},
				//title: "Querying "+host+ "...",
				fields: [{ "name": "Result", "value": ":exclamation: Code Evaluation Failure!"}],
				description: "```"+clean(err)+"```",
			    timestamp: new Date(),
			    footer: {
			      text: info_copyright
			    }
			}});
		    }
		}
	},'login-minecraft': (msg) => {
		msg.delete(1000);
		var message = msg;
		let player = msg.content.split(' ')[1];
		var conJoinMC = mysql.createConnection({
				host: mysql_host,
				user: mysql_user,
				password: mysql_pass,
				database: mysql_database
		});
		conJoinMC.connect(err => {
			var now = moment();
			var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
			console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] Queried "+player+"...\n");
			conJoinMC.query("SELECT * FROM `player_experience`,`player_time`,`player_accounts` WHERE player_experience.player_name = '"+player+"' AND player_accounts.player_name = '"+player+"' AND player_time.playerName = '"+player+"';", function(err,rows) { 
				if(err) { console.log("MySQL Error: "+err); } 
				var mcUser = rows[0].playerName;
				var mcWorld = rows[0].world;
				var mcStatus = rows[0].mc_online_status;
				var xp_exp = rows[0].exp;
				var xp_exp_to_level = rows[0].exp_to_level;
				var xp_total_exp = rows[0].total_exp;
				var xp_exp_lvl = rows[0].exp_lvl;
				var total_votes = rows[0].votes;
				var bal = rows[0].money;
				function getTIMESTAMP(UNIX_timestamp) {
					var a = new Date(parseInt(UNIX_timestamp));
					if (UNIX_timestamp == 0) {
						return "Never";
					} else {
						return a;
					}
				}
				
				var last_seen = rows[0].last_seen;
				var registered = rows[0].firstlogin;
				var last_vote = rows[0].lastVote;
				
				var mcHealth = 0;
				var mcWallet = 0;
				var playTimePretty = rows[0].playtime;
				msg.channel.send("<:barcode:420860838438502400>  `Verified "+mcUser+" against the main identity database successfully!`");
				conJoinMC.end();
			})
		})
	},'player': (msg) => {
		//msg.delete(1000);
		var message = msg;
		let player = msg.content.split(' ')[1];
 		if(!player) {
			msg.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Player Info",
					icon_url: bot_logo_square
				},
				description: "You must supply a player name!",				
				timestamp: new Date(),
				footer: {
					text: info_copyright
			    }
			}});				
		} else { 
			var conJoinMC = mysql.createConnection({
					host: mysql_host,
					user: mysql_user,
					password: mysql_pass,
					database: mysql_database
			});
			conJoinMC.connect(err => {
				var now = moment();
				var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
				console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] Queried "+player+"...\n");
				conJoinMC.query("SELECT * FROM `site_users`, `accounts`, `luckperms_players` WHERE site_users.user_login = '"+player+"' AND luckperms_players.username = '"+player+"';", function(err,rows) { 
					if(err) { console.log("MySQL Error: "+err); } 
					if (!rows[0]) {
						msg.channel.send({embed: {
							color: 0xff8000,
							author: {
								name: bot_nickname+" - Player Info",
								icon_url: bot_logo_square
							},
							description: "Player does not exist or I can't find enough data on them yet. Wait a half day or so. We will find something! Perhaps they haven't authenticated with the system!",				
							timestamp: new Date(),
							footer: {
								text: info_copyright
							}
						}});	
						return true;
					}
					var mcUser = rows[0].user_login;
					/*var mcWorld = rows[0].world;
					var mcStatus = rows[0].mc_online_status;
					*/
					var xp_exp = rows[0].exp;
					var xp_exp_to_level = rows[0].exp_to_level;
					var xp_total_exp = rows[0].total_exp;
					var xp_exp_lvl = rows[0].exp_lvl;
					/*
					var total_votes = rows[0].votes;
					*/
					var bal = rows[0].credit_balance;
					
					var uuid = rows[0].uuid;
					var uuidSecure = uuid.substr(uuid.length - 6);
					
					var rank = "";
					if(rows[0].primary_group == "default") {
						var rank = "Citizen";
					}
					if(rows[0].primary_group == "independent") {
						var rank = "Independent";
					}
					if(rows[0].primary_group == "technician") {
						var rank = "Technician";
					}
					if(rows[0].primary_group == "operator") {
						var rank = "Operator";
					}					
					/*
					function getTIMESTAMP(UNIX_timestamp) {
						var a = new Date(parseInt(UNIX_timestamp));
						if (UNIX_timestamp == 0) {
							return "Never";
						} else {
							return a;
						}
					}*/

					//start towns
					/*conJoinMC.query("SELECT * FROM `player_accounts`,`ResidentsToTowns` WHERE player_accounts.player_uuid = ResidentsToTowns.resident AND player_accounts.player_name = '"+mcUser+"';", function(err,rows) { 
					if(err) { console.log("MySQL Error: "+err); } 
					if (!rows[0]) {
						msg.channel.send({embed: {
							color: 0xff8000,
							author: {
								name: bot_nickname+" - Town Info",
								icon_url: bot_logo_square
							},
							description: "Player does not have any towns man! Homeless!",				
							timestamp: new Date(),
							footer: {
								text: info_copyright
							}
						}});	
						return true;
					}*/
					var towns = "";
					/*
					rows.forEach(function(row) {
						towns = towns + row['town']+" ("+row['rank']+"), ";
					});
					var townsPretty = towns.substring(0, towns.length - 2);
					console.log(townsPretty);
					
					var last_seen = rows[0].last_seen;
					var registered = rows[0].firstlogin;
					var last_vote = rows[0].lastVote;
					
					var mcHealth = 0;
					var mcWallet = 0;
					var playTimePretty = rows[0].playtime;*/

					//msg.delete(1000);		
					var sys = require('util');
					var exec = require('child_process').exec;
					function puts(error, stdout, stderr) { 
						var cleanOut = stdout.replace(/Resist.Network#  /g, "`Time Info` ");
						var playerQueryIntro = "`Displaying credentials for "+mcUser+"...`";
						var playerEmbed = {embed: {
							color: 0xff8000,
							author: {
								name: "Resist.Network - Identification Card",
								icon_url: "https://www.top5reviewed.com/wp-content/uploads/2016/07/Fingerprint-Door-Lock-220x220.png"
							},
							"thumbnail": {
								"url": "https://visage.surgeplay.com/full/128/"+uuid,
							},
							description: "`Player Name` "+mcUser+"\n`Rank` "+rank+"\n`Identification Number` "+uuidSecure+"\n\n<:Heart:532686774108160007> `Current Health` NA\n<:xp:532688543374639115> `Current Level` "+xp_exp_lvl+"\n<:xp:532688543374639115> `XP to next Level` "+xp_exp_to_level+"\n<:xp:532688543374639115> `Current XP Level` "+xp_total_exp+"\n<:credit:532687325101293579> `Credit Balance` "+bal+"\n\n`Fleet` N/A\n`Towns` PLACEHOLDER\n\n"+cleanOut,				
							//timestamp: new Date(),
							//footer: {
							//	text: info_copyright
							//}
						}};		
						msg.channel.send(playerQueryIntro, playerEmbed);
					}
					if (systemOS === "win32") {
						//exec("ping -n 5 "+host, puts);
					} else {
						exec("/storage/time.sh "+mcUser+" | iconv -f utf-8 -t utf-8 -c", puts);
				
					}					
					
					//
					
					conJoinMC.end();
				})
			})
		}
	},'join-minecraft': (msg) => {
		msg.delete(1000);
		var message = msg;
		let player = msg.content.split(' ')[1];
 		if(!player) {
			msg.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Player Info",
					icon_url: bot_logo_square
				},
				description: "You must supply a player name!",				
				timestamp: new Date(),
				footer: {
					text: info_copyright
			    }
			}});				
		} else { 
			var conJoinMC = mysql.createConnection({
					host: mysql_host,
					user: mysql_user,
					password: mysql_pass,
					database: mysql_database
			});
			conJoinMC.connect(err => {
				var now = moment();
				var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
				console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] Queried "+player+"...\n");
				conJoinMC.query("SELECT * FROM `player_experience`,`player_time`,`player_accounts`,`permissions_inheritance` WHERE permissions_inheritance.child = player_accounts.player_uuid AND player_experience.player_name = '"+player+"' AND player_accounts.player_name = '"+player+"' AND player_time.playerName = '"+player+"';", function(err,rows) { 
					if(err) { 
						console.log("MySQL Error: "+err); 
						msg.channel.send("<:barcode:420860838438502400>  `Not enough information for "+player+" yet, give it some time...`");
						return true;
					} 
					if (!rows[0]) {
						var playerQueryIntro = "<:barcode:420860838438502400>  `Displaying credentials for "+player+"...`";
						var playerEmbed = {embed: {
							color: 0xff8000,
							author: {
								name: "WA.Net - Identification Card",
								icon_url: "https://minotar.net/avatar/"+player+"/200.png"
							},
							"thumbnail": {
								"url": "https://minotar.net/body/"+player+"/200.png",
							},
							description: "`Player Name` "+player+"\n`Rank` N/A\n`Identification Number` N/A\n\n<:health:422012053092564992> `Current Health` NA\n<:xp:422013876847116289> `Current Level` N/A\n<:xp:422013876847116289> `XP to next Level` N/A\n<:xp:422013876847116289> `Current XP Level` N/A\n<:credit:422009800256258058> `Credit Balance` N/A\n\n`Fleet` N/A\n`Towns` N/A",				
							//timestamp: new Date(),
							//footer: {
							//	text: info_copyright
							//}
						}};
						msg.channel.send(playerQueryIntro, playerEmbed);
						return true;
					} else {
						msg.channel.send("<:barcode:420860838438502400>  `Not enough information for "+player+" yet, give it some time...`");
						return true;
					}
					var mcUser = rows[0].playerName;
					var mcWorld = rows[0].world;
					var mcStatus = rows[0].mc_online_status;
					var xp_exp = rows[0].exp;
					var xp_exp_to_level = rows[0].exp_to_level;
					var xp_total_exp = rows[0].total_exp;
					var xp_exp_lvl = rows[0].exp_lvl;
					var total_votes = rows[0].votes;
					var bal = rows[0].money;
					var uuid = rows[0].player_uuid;
					var uuidSecure = uuid.substr(uuid.length - 6);
					var rank = rows[0].parent;
					function getTIMESTAMP(UNIX_timestamp) {
						var a = new Date(parseInt(UNIX_timestamp));
						if (UNIX_timestamp == 0) {
							return "Never";
						} else {
							return a;
						}
					}

					//start towns
					conJoinMC.query("SELECT * FROM `player_accounts`,`ResidentsToTowns` WHERE player_accounts.player_uuid = ResidentsToTowns.resident AND player_accounts.player_name = '"+mcUser+"';", function(err,rows) { 
					if(err) { console.log("MySQL Error: "+err); } 
					if (!rows[0]) {
						msg.channel.send({embed: {
							color: 0xff8000,
							author: {
								name: bot_nickname+" - Town Info",
								icon_url: bot_logo_square
							},
							description: "Player does not have any towns man! Homeless!",				
							timestamp: new Date(),
							footer: {
								text: info_copyright
							}
						}});	
						return true;
					}
					var towns = "";
					rows.forEach(function(row) {
						towns = towns + row['town']+" ("+row['rank']+"), ";
					});
					var townsPretty = towns.substring(0, towns.length - 2);
					console.log(townsPretty);
					
					var last_seen = rows[0].last_seen;
					var registered = rows[0].firstlogin;
					var last_vote = rows[0].lastVote;
					
					var mcHealth = 0;
					var mcWallet = 0;
					var playTimePretty = rows[0].playtime;
					var playerQueryIntro = "<:barcode:420860838438502400>  `Displaying credentials for "+mcUser+"...`";
					var playerEmbed = {embed: {
						color: 0xff8000,
						author: {
							name: "Resist.Network - Identification Card",
							icon_url: "https://minotar.net/avatar/"+mcUser+"/200.png"
						},
						"thumbnail": {
							"url": "https://minotar.net/body/"+mcUser+"/200.png",
						},
					description: "`Player Name` "+mcUser+"\n`Rank` "+rank+"\n`Identification Number` "+uuidSecure+"\n\n<:health:422012053092564992> `Current Health` NA\n<:xp:422013876847116289> `Current Level` "+xp_exp_lvl+"\n<:xp:422013876847116289> `XP to next Level` "+xp_exp_to_level+"\n<:xp:422013876847116289> `Current XP Level` "+xp_total_exp+"\n<:credit:422009800256258058> `Credit Balance` "+bal+"\n\n`Fleet` N/A\n`Towns` "+townsPretty,				
						//timestamp: new Date(),
						//footer: {
						//	text: info_copyright
						//}
					}};
					msg.channel.send(playerQueryIntro, playerEmbed);
					conJoinMC.end();
					})
				})
			})
		}
	},'first-join-minecraft': (msg) => {
		msg.delete(1000);
		var message = msg;
		let player = msg.content.split(' ')[1];
 		if(!player) {
			msg.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Player Info",
					icon_url: bot_logo_square
				},
				description: "You must supply a player name!",				
				timestamp: new Date(),
				footer: {
					text: info_copyright
			    }
			}});				
		} else { 


			msg.channel.send("<:thumbprint:420873257370124290>  `Detected that "+player+" is a new user!`");

		}
	},'leave-minecraft': (msg) => {
		msg.delete(1000);
		var message = msg;
		let player = msg.content.split(' ')[1];
 		if(!player) {
			msg.channel.send({embed: {
				color: 0xff8000,
				author: {
					name: bot_nickname+" - Player Info",
					icon_url: bot_logo_square
				},
				description: "You must supply a player name!",				
				timestamp: new Date(),
				footer: {
					text: info_copyright
			    }
			}});				
		} else { 
			var conJoinMC = mysql.createConnection({
					host: mysql_host,
					user: mysql_user,
					password: mysql_pass,
					database: mysql_database
			});
			conJoinMC.connect(err => {
				var now = moment();
				var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
				console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] Queried "+player+"...\n");
				conJoinMC.query("SELECT * FROM `player_experience`,`player_time`,`player_accounts` WHERE player_experience.player_name = '"+player+"' AND player_accounts.player_name = '"+player+"' AND player_time.playerName = '"+player+"';", function(err,rows) { 
					if(err) { console.log("MySQL Error: "+err); } 
					var mcUser = rows[0].playerName;
					var mcWorld = rows[0].world;
					var mcStatus = rows[0].mc_online_status;
					var xp_exp = rows[0].exp;
					var xp_exp_to_level = rows[0].exp_to_level;
					var xp_total_exp = rows[0].total_exp;
					var xp_exp_lvl = rows[0].exp_lvl;
					var total_votes = rows[0].votes;
					var bal = rows[0].money;
					var uuid = rows[0].player_uuid;
					var uuidSecure = uuid.substr(uuid.length - 6);
					var rank = rows[0].parent;
					function getTIMESTAMP(UNIX_timestamp) {
						var a = new Date(parseInt(UNIX_timestamp));
						if (UNIX_timestamp == 0) {
							return "Never";
						} else {
							return a;
						}
					}
					
					var last_seen = rows[0].last_seen;
					var registered = rows[0].firstlogin;
					var last_vote = rows[0].lastVote;
					
					var mcHealth = 0;
					var mcWallet = 0;
					var playTimePretty = rows[0].playtime;
					if (mcUser == "Nogura") {
						msg.channel.send(":zzz:  `Placing "+mcUser+" into secure cryogenic stasis storage. Sleep well master!`");
					} else {
						msg.channel.send(":zzz:  `Placing "+mcUser+" into secure cryogenic stasis storage.`");
					}
					conJoinMC.end();
				})
			})
		}
	},'give': (msg) => {
		var message = msg;
		let player = msg.content.split(' ')[1];
		let amount = msg.content.split(' ')[2];
		//msg.delete(1000);
		// Perm check Fanboy Buddy :D
	    if(message.author.id !== config.bot_admin_id) return;
		if(!player) {
		msg.channel.send({embed: {
			color: 0xff8000,
			author: {
				name: bot_nickname+" - Player Awards",
				icon_url: bot_logo_square
			},
			description: "You must supply a player name!",				
		    timestamp: new Date(),
		    footer: {
				text: info_copyright
		    }
		}
		});				
				
		} else {
			if(!amount) { amount = 5; }
			var con = mysql.createConnection({
				host: mysql_host,
				user: mysql_user,
				password: mysql_pass,
				database: mysql_database
			});
			con.connect(err => {
				con.query("SELECT * from xf_user where username = '"+player+"';", function(err,rows) { if(err) { 
					var now = moment();
					var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
					console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] DB ERROR: "+err+"\n");	
				} 
				var mcUser = rows[0].username;
				var mcRegistered = rows[0].regdate;
				var mcWorld = rows[0].world;
				var mcStatus = rows[0].mc_online_status;
				var mcGameTime = rows[0].mc_game_time;
				var mcPlayerLevel = rows[0].mc_player_level;
				var mcCurrentXP = rows[0].mc_current_xp;
				var mcTotalXP = rows[0].mc_total_xp;
				var mcHealth = rows[0].mc_health;
				var mcWallet = rows[0].mc_wallet;
				var balance = parseInt(balance = 0);
					
				balance = balance+parseInt(mcWallet);
				balance = balance+parseInt(amount);
				con.query("UPDATE xf_user SET mc_wallet = '"+balance+"' WHERE username = '"+player+"';", function(err,rows) { if(err) {
					var now = moment();
					var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
					console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] DB ERROR: "+err+"\n");	
				} 
				msg.channel.send({embed: {
					color: 0xff8000,
					author: {
						name: bot_nickname+" - Player Awards",
						icon_url: bot_icon_about
					},
					"thumbnail": {
						"url": "https://minotar.net/body/"+mcUser+"/100.png"
					},		 
		            fields: [{
		               "name": "Player Name",
		               "value": ""+mcUser
		           },
				   {
		               "name": "Old Balance",
		               "value": ""+mcWallet
		           },
				   {
		               "name": "New Balance",
		               "value": ""+balance
		           },{
		               "name": "Awarded By / Amount",
		               "value": ""+msg.author.username+" / "+amount
		           }],				
				    timestamp: new Date(),
				    footer: {
				      text: info_copyright
				    }
				}});
				});
				var now = moment();
				var formattedNow = now.format('YYYY-MM-DD HH:mm:ss Z');
				console.log("["+formattedNow+"]["+msg.author.username+"/"+msg.author.id+"] Awarded "+mcUser+" "+amount+"...\n");	
				con.end();		
			});
			});
		}
 }		
};

client.on('ready', () => {
	readyLog("",bot_nickname+" PID #"+process.pid+" is Ready!");
	console.log("\n\n\n");
	console.log(bot_nickname+" is ready for you!");
	console.log("---------------------------");
	console.log("Bot is Ready!");
	console.log("---------------------------");
	//A();
/* 	const streamOptions = { seek: 0, volume: 1 };
	var voiceChannel = client.channels.get(discord_channel_id_radio);
	voiceChannel.join().then(connection => {
		console.log("Starting Resist.Network Radio Streamer....");
		client.channels.get(discord_channel_id_log).send("`Initializing the Resist.Network Media encoders and Playing Test Track...`");
		radioNowPlaying("discord_channel_id_botspam);
		//const stream = ytdl('http://listen.radionomy.com/hotmixradio-lounge-128.m3u', { filter : 'audioonly' });
		const stream = ffmpeg('https://Resist.Network/listen.mp3');

		const dispatcher = connection.playStream("https://ia801905.us.archive.org/6/items/DSOTM/06%20-%20Money.mp3", streamOptions);
		dispatcher.on("end", end => {
			console.log("Main Resist.Network ICECAST Server has quit broadcasting!");
			client.channels.get(discord_channel_id_log).send("`Main Radio feed has quit broadcasting, check the servers!`");
			voiceChannel.leave();
		});
	}).catch(err => console.log(err)); */


});

client.on('message', msg => {

	//console.log("["+logTimestamp+"] "+msg.author.username+"("+msg.author.id+") "+msg);
	if (!msg.content.startsWith(bot_prefix)) { 
	} else {
		if (commands.hasOwnProperty(msg.content.toLowerCase().slice(bot_prefix.length).split(' ')[0])) {
			commands[msg.content.toLowerCase().slice(bot_prefix.length).split(' ')[0]](msg);
		}
	}
	
});

client.on('guildMemberAdd', member => {
	client.channels.get(discord_channel_id_discord_log).send("`Detected new player/human named "+member.user.tag+", ID#"+member.id+"...`");
	//member.addRole('Independent');
	//discordLog("",'User '+member.user+' / '+member.id+' has joined the server!',member.user,member.id);
	//console.log(client.server.roles.get("name", "Citizen"));
    var role = member.guild.roles.find('name', 'Independent');
    member.addRole(role);
});

client.login(bot_token);



express()
  .use(express.static(path.join(__dirname, 'assets/public')))
  .set('views', path.join(__dirname, 'assets/views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { 
	  'bot_web_title': bot_web_title,
	  'bot_web_favicon': bot_web_favicon,
	  'bot_nickname': bot_nickname,
	  'bot_logo_long': bot_logo_long,
	  'bot_logo_square': bot_logo_square,
	  'info_website': info_website,
	  'info_copyright': info_copyright,
	  'discord_invite_link': discord_invite_link,
	  'theme': 'default'
  })).listen(bot_web_port, () => console.log());

// END WEB MODULE


