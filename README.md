# torrent-bot

It's a bot! Just a bot!

## Small description
This is an IRC bot for adding torrents' infoHashes to whitelist from a command !addtorrent.

## Clone
```bash
git clone https://github.com/kaotisk-hund/torrent-bot.git
```

## Install

```bash
npm install
```

## Start it
```bash
npm start
```

It joins irc.kaotisk-hund.tk and then #torrents channel.

There... it waits!

### While in the same channel
```bash
Usage:
!addtorrent <infoHash>
```

This adds the infoHash to a file called ./whitelist. Now, if you run an opentracker server
with whitelist mode on, then there is a file /var/opentracker/whitelist where your server
stores its whitelist.

You can use ./bin/append_whitelist.sh to append the local generated whitelist from torrent-bot
to the server's one. You can also use crontab to update the list in schedule.

Something to know about torrent tracker whitelist feature:
While you can easily and successfully update your whitelist, opentracker requires either restart
or SIGHUP signal in order to read the refreshed list.
