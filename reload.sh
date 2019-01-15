#!/bin/bash
sleep 1;
killall ices;
/storage/ices-start.sh;
cd /storage/resist-discord-bot;
#git stash;
#git pull;
#screen -S bot -X quit;
screen -S bot-music -X quit;
/storage/resist-discord-bot/start.sh &
pkill -9 node
