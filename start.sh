#!/bin/bash
cd "$(dirname "$0")"
DISCORD=$(cat ~/.discord_token)
MONGO=$(cat ~/.mongo)
cd "$(dirname "$0")"
if ! screen -list | grep -q "bot"; then
	cd /storage/resist-discord-bot/
	rm /storage/resist-discord-bot/config.json
	sed "s#DISCORD_TOKEN#$DISCORD#g" /storage/resist-discord-bot/config.json.template > /storage/resist-discord-bot/config.json;
	git stash;
	git pull;
	npm update;
        screen -LdmS bot node /storage/resist-discord-bot/bot.js
fi
