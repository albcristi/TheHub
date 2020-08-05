FROM node:14.7-alpine3.11

MAINTAINER Cristi Alb


RUN mkdir /front_end

WORKDIR /front_end

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install

COPY . /front_end