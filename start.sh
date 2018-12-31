#!/bin/bash
cd "$(dirname "$0")"
if ! screen -list | grep -q "bot"; then
	cd /storage/resist-discord-bot/
	git stash;
	git pull;
	npm update;
        screen -LdmS bot node /storage/resist-discord-bot/bot.js
fi
