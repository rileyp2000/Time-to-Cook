FROM node:lts-slim

WORKDIR /usr/local/app
COPY package.json /usr/local/app/
COPY package-lock.json /usr/local/app/
RUN npm install
COPY server.js /usr/local/app/
COPY recipes.js /usr/local/app/

EXPOSE 5000

CMD ["npm", "run", "docker"]