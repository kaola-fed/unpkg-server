#
# Dockerfile for eslint check
# Created by Cody at 03/22/2017
#

FROM ubuntu:16.04


ENV NVM_VERSION=v0.33.1


RUN sed -i 's/archive\.ubuntu\.com/mirrors\.163\.com/g' /etc/apt/sources.list
RUN apt-get update && apt-get install -y \
  git \
  curl

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN source ~/.nvm/nvm.sh
