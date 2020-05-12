#!/bin/sh

rm -rf node_modules bower_components && \
npm install && \
npm run build && \
npm run release && \
echo "OK!"
