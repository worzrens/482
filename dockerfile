FROM node:10

WORKDIR /server

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 4000

run npm start
