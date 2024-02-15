FROM node:lts-buster

RUN ffmpeg

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
