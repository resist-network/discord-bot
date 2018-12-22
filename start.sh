#!/bin/bash
cd "$(dirname "$0")"
if ! screen -list | grep -q "bot"; then
	cd /storage/WA-Discord-Bot/
#	killall ices;
#	/storage/ices-start.sh;
	git stash;
	git pull;
        screen -LdmS bot node /storage/WA-Discord-Bot/bot.js
fi
#if ! screen -list | grep -q "WA-Bot-Music"; then
#	cd /storage/WA-Bot/
#	git stash;
#	git pull;
#   screen -LdmS WA-Bot-Music node /storage/WA-Bot/music.js	
#fi
