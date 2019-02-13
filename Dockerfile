FROM node

RUN mkdir /super-snacks-api
WORKDIR /super-snacks-api

COPY package*.json ./

COPY . .

EXPOSE 3000
