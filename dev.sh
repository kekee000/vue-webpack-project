#/bin/bash

env=$1

ps -a | grep 'edp webserver' | grep -v 'grep' | cut -d " " -f2 | xargs kill

if [ "$env" != 'preview' ]; then
    NODE_ENV=$env edp webserver start &
    if [ "$JS_ENV" = 'es6' ]; then
        webpack-dev-server --config=webpack-es6.config.js --inline --hot
    else
        webpack-dev-server --inline --hot
    fi
else
    NODE_ENV=preview edp webserver start
fi
