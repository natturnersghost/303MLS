#!/bin/sh
# Start Node.js application in the background
node server.js &
# Start NGINX in the foreground
nginx -g 'daemon off;'
