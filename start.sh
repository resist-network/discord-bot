#!/bin/bash
cd "$(dirname "$0")"
if ! screen -list | grep -q "bot"; then
	cd /storage/discord-bot/
	git stash;
	git pull;
	npm update;
        screen -LdmS bot node /storage/discord-bot/bot.js
fi
