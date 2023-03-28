FROM node:lts-slim

WORKDIR /usr/local/app
COPY package.json /usr/local/app/
COPY package-lock.json /usr/local/app/
RUN npm install
COPY src/ /usr/local/app/src
COPY public/ /usr/local/app/public

EXPOSE 3000

CMD ["npm", "run", "start"]