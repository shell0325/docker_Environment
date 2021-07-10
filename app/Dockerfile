FROM node:12

ENV NODE_ENV=development

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]
