FROM node:12

ENV NODE_ENV=development

WORKDIR /app

COPY package.json .

RUN npm install && npm install nodemon -g

EXPOSE 3000

CMD [ "nodemon", "app.js" ]
