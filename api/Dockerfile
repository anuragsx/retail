FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src

COPY package.json /usr/src/package.json
COPY tsconfig.json /usr/src/tsconfig.json
COPY .env /usr/src/.env

# ADD ./app /usr/src

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3232