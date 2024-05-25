#!/bin/sh

npm i
npm run build
ls -a1 src | grep -vE ^\\\(articles\\\)\$ | grep -v ^\\.\$ | grep -v ^\\.\\.\$ | xargs -I {} cp -r src/{} out/{}
