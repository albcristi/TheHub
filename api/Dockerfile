FROM python:3.7

MAINTAINER Cristi Alb

ENV PYTHONUNBUFFERED 1

COPY requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

RUN mkdir /api

WORKDIR /api

COPY ./ /api