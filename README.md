torrent-bot

It's a bot! Just a bot!

Clone:

git clone torrent-bot.git

Install:

npm install

Start it:

npm start

It joins irc.kaotisk-hund.tk and then #torrents channel.

There it waits!

Usage:
!addtorrent <infoHash>

This adds the infoHash to a file called ./whitelist. Now, if you run an opentracker server
with whitelist mode on, then there is a file /var/opentracker/whitelist where your server
stores it's whitelist.

You can use ./bin/append_whitelist.sh to append the local generated whitelist from torrent-bot
to the server's one. You can also use crontab to update the list in schedule.

Something to know about torrent tracker whitelist feature:
While you can easily and successfully update your whitelist, opentracker requires either restart
or SIGHUP signal in order to read the refreshed list.
