#!/bin/bash
sleep 1;
killall ices;
/storage/ices-start.sh;
git stash;
git pull;
cd /storage/WA-Bot;
screen -S WA-Bot -X quit;
screen -S WA-Bot-Music -X quit;
pkill -9 node
/storage/WA-Bot/WA-Bot.sh;
