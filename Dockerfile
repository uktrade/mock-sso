FROM node:8.9.3
MAINTAINER tools@digital.trade.gov.uk

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 8080

CMD [ "npm", "start" ]
