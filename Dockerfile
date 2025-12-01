FROM node:20-alpine

USER root

WORKDIR /webapp

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
