#!/bin/bash
#
# Append whitelist to opentracker's whitelist
# Empty local whitelist
cat /dev/null > whitelist

cat whitelist >> /var/opentracker/whitelist