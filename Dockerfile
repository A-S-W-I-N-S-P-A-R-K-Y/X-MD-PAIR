FROM node:lts-buster

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
