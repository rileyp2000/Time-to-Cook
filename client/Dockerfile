FROM node:lts-slim

WORKDIR /usr/local/app
COPY src/ /usr/local/app/src
COPY public/ /usr/local/app/public
COPY package.json /usr/local/app/
COPY package-lock.json /usr/local/app/
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]