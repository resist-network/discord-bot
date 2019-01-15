#!/bin/bash
cd "$(dirname "$0")"
DISCORD=$(cat ~/.discord_token)
MYSQL_DATABASE=$(cat ~/.mysql_database)
MYSQL_USER=$(cat ~/.mysql_user)
MYSQL_PASSWORD=$(cat ~/.mysql_password)
MYSQL_HOST=$(cat ~/.mysql_host)
YOUTUBE_KEY=$(cat ~/.youtube_key)
MONGO=$(cat ~/.mongo)
cd "$(dirname "$0")"
if ! screen -list | grep -q "bot"; then
	cd /storage/resist-discord-bot/
	rm /storage/resist-discord-bot/config.json
	sed "s#DISCORD_TOKEN#$DISCORD#g" /storage/resist-discord-bot/config.json.template > /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_USER/$MYSQL_USER/g" /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_PASSWORD/$MYSQL_PASSWORD/g" /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_HOST/$MYSQL_HOST/g" /storage/resist-discord-bot/config.json;
	sed -i "s/MYSQL_DATABASE/$MYSQL_DATABASE/g" /storage/resist-discord-bot/config.json;
	sed -i "s/YOUTUBE_KEY/$YOUTUBE_KEY/g" /storage/resist-discord-bot/config.json;
	git stash;
	git pull;
	#npm update;
        screen -LdmS bot node /storage/resist-discord-bot/bot.js
fi
