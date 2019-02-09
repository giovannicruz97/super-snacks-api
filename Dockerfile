FROM node

RUN mkdir /magic_app
WORKDIR /magic_app

COPY package*.json ./

COPY . .

EXPOSE 3000
