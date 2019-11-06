#!/bin/bash
#
# This script does the following:

# Append whitelist to opentracker's whitelist
cat whitelist >> /var/opentracker/whitelist

# Empty local whitelist
cat /dev/null > whitelist

# Send SIGHUP signal to opentracker
kill -n 1 `pgrep opentracker`

# TODO: As it should be removing the list only
# if the append to opentracker's one is successful.

# Consider running it as root or chmod 777 your opentracker's
# whitelist so you don't lose local whitelist infoHashes in case
# of permission errors.