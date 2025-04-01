FROM node:18-alpine

WORKDIR /home/node/app

COPY  package*.json .

RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

CMD ["node","src/index.js"]