FROM node:10

# Create app directory in container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]