FROM node:11 as webpack

WORKDIR /module
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/module/node_modules/.bin/

COPY package.json ./
RUN npm install

COPY webpack.config.js ./

COPY test/index.html test/
COPY src/MuleUploader.js src/SpeedMonitor.js ./src/