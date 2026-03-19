FROM node:17-alpine

RUN mkdir /les-foulees-sarmates.com
WORKDIR /les-foulees-sarmates.com

RUN apk add --update --virtual .tmp-deps python3 make g++ && \
    rm -rf /var/cache/apk/*

COPY package.json .
RUN npm install --quiet

RUN apk del .tmp-deps

COPY . .

RUN npm run build
