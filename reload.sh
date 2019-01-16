#!/bin/bash
sleep 1;
killall ices;
cd /storage/resist-discord-bot;
#git stash;
#git pull;
screen -S bot -X quit;
screen -S bot-radio -X quit;
pkill -9 node &
/storage/resist-discord-bot/start.sh &
