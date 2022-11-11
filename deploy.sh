#!/bin/sh
# git stash && git pull && rm -rf node_modules && npm install && npm run build && NODE_ENV=production pm2 startOrReload ecosystem.config.js --env production && pm2 save
# git stash && git pull -f && npm run build && NODE_ENV=production pm2 startOrReload ecosystem.config.js --env production && pm2 save

#yarn install && yarn build && NODE_ENV=production pm2 startOrReload ecosystem.config.js --env production && pm2 save
