#!/bin/bash
sleep 1;
killall ices;
/storage/ices-start.sh;
git stash;
git pull;
cd /storage/resist-discord-bot;
screen -S bot -X quit;
screen -S bot-music -X quit;
pkill -9 node
/storage/resist-discord-bot/start.sh;
