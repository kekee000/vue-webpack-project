#/bin/bash

env=$1

ps -ax | grep 'edp webserver' | grep -v 'grep' | cut -d " " -f2 | xargs kill
NODE_ENV=$env edp webserver start &

if [ "$env" != 'preview' ]; then
    webpack-dev-server --inline --hot
fi
