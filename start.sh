#!/bin/bash
cd "$(dirname "$0")"
DISCORD=$(cat ~/.discord_token)
MYSQL_DATABASE=$(cat ~/.mysql_database)
MYSQL_USER=$(cat ~/.mysql_user)
MYSQL_PASSWORD=$(cat ~/.mysql_password)
MYSQL_HOST=$(cat ~/.mysql_host)
MCR_PASS=$(cat ~/.mcr_pass)
YOUTUBE_KEY=$(cat ~/.youtube_key)
GOOGLE_URL=$(cat ~/.google_url)
MONGO=$(cat ~/.mongo)
cd "$(dirname "$0")"
if ! screen -list | grep -q "bot"; then
	echo "Bot was not started, starting in background!"
	cd /storage/resist-discord-bot/
	rm /storage/resist-discord-bot/config.json
	rm /storage/resist-discord-bot/tps.sh
	sed "s#MCR_PASS#$MCR_PASS#g" /storage/resist-discord-bot/tps.sh.template > /storage/resist-discord-bot/tps.sh;
	sed "s#DISCORD_TOKEN#$DISCORD#g" /storage/resist-discord-bot/config.json.template > /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_USER/$MYSQL_USER/g" /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_PASSWORD/$MYSQL_PASSWORD/g" /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_HOST/$MYSQL_HOST/g" /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_DATABASE/$MYSQL_DATABASE/g" /storage/resist-discord-bot/config.json;
	sed -i "s/YOUTUBE_KEY/$YOUTUBE_KEY/g" /storage/resist-discord-bot/config.json;
	sed -i "s/GOOGLE_URL/$GOOGLE_URL/g" /storage/resist-discord-bot/config.json;
	#git stash;
	#git pull;
	#npm update;
        screen -LdmS bot node /storage/resist-discord-bot/bot.js
else
	echo "Bot is already started, not starting!"
fi

if ! screen -list | grep -q "bot-radio"; then
	echo "Radio Bot was not started, starting in background!"
        screen -LdmS bot-radio /usr/bin/ices -c /storage/radio.conf
else
	echo "Radio Bot is already started, not starting!"
fi
