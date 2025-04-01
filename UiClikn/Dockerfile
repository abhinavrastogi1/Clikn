FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

COPY --chown=node:node . .

EXPOSE 5173

CMD ["npm","run","dev"]

