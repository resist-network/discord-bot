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
var ffmpeg = require('@ffmpeg-installer/ffmpeg');
	
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
var url_website = config.url_website;
var info_copyright = config.info_copyright;
var api_youtube_data = config.api_youtube_data;
var api_google_shortener = config.api_google_shortener;

var mm = require('musicmetadata');


var aliasesFile = "./aliases.yml";
//Current Date/Time
var currentdate = new Date(); 
var logTimestamp = bot_nickname+" | "+currentdate.getDate() + "/"
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
		searchMessage.edit("`Answer found, see attached.`\n"+url_website+"/files/everlast.mp4");
		
// If no results are found, we catch it and return 'No results are found!'
	}).catch((err) => {
		searchMessage.edit("`No results found!`");
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
	if(!uid) { var uid = "System"; }
	var sys = require('util');
	var exec = require('child_process').exec;
//	client.channels.get(discord_channel_id_log).send("!radio play");	
	fs.readFile('.git/refs/heads/master', function(err, data) {
		var gitHash = data.toString().substr(null,8);
		console.log("Repository Hash: "+gitHash);
		console.log("---------------------------\n");
		client.channels.get(discord_channel_id_log).send("`Systems initialized, starting node daemon and bot...`\n```css\nBot Started Successfully!\n\nBot PID { "+process.pid+" }\n\nRepository Version Hash { "+gitHash+" }```");
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
				client.channel("350546430668046336").send({embed: {
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
				exec('echo "'+lastChannel+'" > '+__dirname+'/lastChannel');
				exec(""+__dirname+"/reload.sh &");
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
			    author: {
					name: bot_nickname+" - About",
					icon_url: bot_icon_about
			    },
			    title: bot_nickname,
			    url: info_website,
			    description: descriptionAbout,
 				thumbnail: {
					"url": bot_logo_square,
					"width": 5,
					"height": 5
            }, 
            fields: [{
					"name": "Host OS Info: ",
					"value": os.type()+" ("+os.platform+") "+os.arch()
            }],
			    timestamp: new Date(),
			    footer: {
					text: info_copyright
			    }
			  }
			});
		}
	},'auth-login': (msg) => {
		let player = msg.content.split(' ')[1];
		msg.delete(1000);
			msg.channel.send("<:barcode:420860838438502400>  `Verified biometric and secure authentication bit for "+player+" successfully!`");
	},'auth-login-fail': (msg) => {
		let player = msg.content.split(' ')[1];
		msg.delete(1000);
		msg.channel.send(":spy:  `Unable to verify "+player+"'s secure biometric authentication bit... impostor?`");
	},'clear': (msg) => {
		msg.delete(1000);
		var authToken = bot_token;
		
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
			msg.channel.send("<:wa:502866072152571924>:loudspeaker:  `Announcement for` @everyone `. See attached.`\n"+announcement).then(function (message) {
              this.addReaction("👍", msg.author)
              this.addReaction("👍", msg.author)
            }).catch(function() {
             });;
		}
	},'maintenance': (msg) => {
		let maintenance = msg.content.split(/\s(.+)/)[1];
		msg.delete(1000);
		if (msg.author.id == bot_admin_id) {
			msg.channel.send("<:wa:502866072152571924><:cone:421166940531326977>  `Performing maintenance on internal systems, expected ETA is "+maintenance+"!`");
		}
	},'rules': (msg) => {
		msg.delete(1000);
		msg.channel.send("`Initializing "+info_website+" rules database provided by Derakel :P ...`\n\n<:wa:502866072152571924>__**"+info_website+" RULES**__ <:wa:324446350211284992>\n\n**Member Rules\n===========================**\n```css\n#1 Respect the Decisions of the Staff. Do not undermine their authority.\n\n#2 We are an English speaking Community mostly. Support cannot be guaranteed, but we will try.\n\n#3 DO NOT disrespect anyone. Racism, Sexism or any other -ism is not tolerated.\n\n#4 DO NOT act in a Childish Behavior, CAUSE DRAMA or TROLL other Members.\n\n#5 DO NOT Spam/Harass Channels with either Text, Microphone or Bots.\n\n#6 DO NOT excessively use capslock. (LOL or ROFL is fine)\n\n#7 DO NOT Advertise other Discords, Servers and/or Communities. Streamers are an exception if they are promoting our Community.\n\n#8 DO NOT bring conversations into the wrong Channels.\n\n#9 Everyone swears... BUT overuse of profanity is very much frowned upon.\n\n#10 Do not speak about illegal activities, substances or anything of the sort.\n\n#11 If you have a Complaint, Question or Issue; please go to "+url_website+" and submit a topic.```\n**Staff Rules\n===========================**\n```css\n#1 Do not change Discord Settings without Administrative Authorization.\n\n#2 Do not assume that you are above anyone or any Rules that Members must follow.\n#3 Just because you 'can' do something, doesn't mean you should.```", {
			files: [
			url_website+"/images/home_logo.png"
		]
		});
	},'motd': (msg) => {
		msg.delete(1000);
		msg.channel.send("`Initializing "+info_website+"...` ```prolog\nWelcome to the "+info_website+" Minecraft Community! We host our own custom Minecraft modpack and server. Actively developed and in use for over 4 years, we have every mod and plugin you could possibly need/want! \n\nPlease check our chat channels, or visit our website at the link below for the mod list, launcher information,\nconnect information and much much more. Good luck!```\n<:dirt:526037661723394067> <:sword:526037661744365569> <:steve:526038216587870209> <:sword:526037661744365569> <:dirt:526037661723394067> <:sword:526037661744365569> <:steve:526038216587870209> <:sword:526037661744365569> <:dirt:526037661723394067> <:sword:526037661744365569> <:steve:526038216587870209> <:sword:526037661744365569> <:dirt:526037661723394067>\n\nGet it Now!  [ "+url_website+"/download ]\n\nJoin <#234843566248034305> for regular chat and to meet the community!\n\n<:dirt:526037661723394067> <:sword:526037661744365569> <:steve:526038216587870209> <:sword:526037661744365569> <:dirt:526037661723394067> <:sword:526037661744365569> <:steve:526038216587870209> <:sword:526037661744365569> <:dirt:526037661723394067> <:sword:526037661744365569> <:steve:526038216587870209> <:sword:526037661744365569> <:dirt:526037661723394067>\n\n**SERVER INFORMATION**```css\nMinecraft (Modded) Version { 1.7.10 }```\n**OPEN A SUPPORT TICKET** - **!open**\n```ldif\nCreates a private channel and staff will assist you when they are available.\n\nFor immediate help, check the FTB Wiki for general progression, or check out site for various custom tweaks and recipes.```\n**DOWNLOAD GAME** - **!download**\n```ldif\nProvides the downloads for Windows, Linux and OSX players.```", {
			files: [
			url_website+"/images/128x128.png"
		]
		});
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
		exec("speedtest-cli", puts);
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
		exec("cd /storage/WA-Bot/; git pull; npm install;", puts);
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
				var playerQueryIntro = "<:ytdl:526045628304719891> `[Main Computer] YouTube Download @ WA.Net# Starting download for "+videoNamePretty+"...`";
				//console.log(video.snippet.thumbnails.medium.url);
				var playerEmbed = {embed: {
					color: 0x000000,
					title: videoNamePretty,					
					"thumbnail": {
						//medium/high/default
						"url": video.snippet.thumbnails.default.url,
					},
					description: "\n https://www.youtube.com/watch?v="+video.id.videoId+"\n```dns\nYou will be notified (mentioned) when this download is complete and in the radio queue!```",
				}};	
				var videoUrl = "https://www.youtube.com/watch?v="+video.id.videoId;   
				var youtubeTempDir = "/storage/WA-Bot/assets/public/youtube/temp"; 
				var youtubeDir = "/storage/WA-Bot/assets/public/youtube"; 

				var videoReadableStream = ytdl(videoUrl);

				ytdl.getInfo(videoUrl, function(err, info){
					var videoName = info.title.replace('|','').toString('ascii').replace(/[^a-zA-Z0-9-_]/g, '_').replace("_-_", "-").replace("__-__","-");
					var videoWritableStream = fs.createWriteStream(youtubeTempDir + '/' + videoName + '.mp4'); 
					var stream = videoReadableStream.pipe(videoWritableStream);

					function completeMessage() {
						//
						request.post('https://www.googleapis.com/urlshortener/v1/url?key='+api_google_shortener, {
						  json: {
							'longUrl': 'https://'+url_website+'/youtube/'+video.snippet.title+'.mp4'
						  }
						}, function (error, response, body) {
						  if(error) {
							console.log(error)
						  } else {
							msg.channel.send("<:ytdl:423017037393166336> :white_check_mark:  `[Main Computer] YouTube Download @ WA.Net# Added download request from ` "+mentionCommandAuthor+" ` to the server...` ```"+videoNamePretty+"\nDownloaded and encoded into MP4 (Video)...\nAdded to WA.Net Downloads...\nEnjoy!```Watch it in your Browser or Download it Here -> "+body.id);	
							//console.log(response.statusCode, body)
						  }
						})
						//
					}
					stream.on('finish', function() {
					   //res.writeHead(204);
					   //res.end();
					   //move now that it is done...
					   move(youtubeTempDir + '/' + videoName + '.mp4', youtubeDir + '/' + videoName + '.mp4', completeMessage);
					});           	   
					msg.channel.send(playerQueryIntro, playerEmbed);
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
		msg.channel.send(":question:  `Opened Ticket #"+ticketID+" for "+msg.author.username+", `<@&422659916021628928>` will assist you there!`");
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
	}
 }		
};

client.on('ready', () => {
	readyLog("PID #"+process.pid+" is Ready!");
	console.log("\n\n\n");
	console.log(bot_nickname+" is ready for you!");
	console.log("---------------------------");
	console.log("Bot is Ready!");
	console.log("---------------------------");
	//A();
	const streamOptions = { seek: 0, volume: 1 };
	var voiceChannel = client.channels.get(discord_channel_id_radio);
	voiceChannel.join().then(connection => {
		console.log("Starting "+info_website+" Radio Streamer....");
		client.channels.get(discord_channel_id_log).send("`Initializing the "+info_website+" Media encoders and Playing Test Track...`");

		const dispatcher = connection.playStream("https://ia801905.us.archive.org/6/items/DSOTM/06%20-%20Money.mp3", streamOptions);
		dispatcher.on("end", end => {
			console.log("Main "+info_website+" ICECAST Server has quit broadcasting!");
			client.channels.get(discord_channel_id_log).send("`Main Radio feed has quit broadcasting, check the servers!`");
			voiceChannel.leave();
		});
	}).catch(err => console.log(err));


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
	client.channels.get("226249731112828928").send("`Detected new player/human named "+member.user+"/"+member.id+"...`");
	//discordLog("",'User '+member.user+' / '+member.id+' has joined the server!',member.user,member.id);
	//console.log(client.server.roles.get("name", "Citizen"));
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
  
