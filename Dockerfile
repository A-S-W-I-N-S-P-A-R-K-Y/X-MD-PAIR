FROM node:lts-buster

RUN install ffmpeg

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
