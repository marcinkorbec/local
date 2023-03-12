FROM node:14
WORKDIR /web
COPY package*.json ./
RUN npm install
RUN npm install env-cmd
COPY ./public ./public
COPY ./src ./src
COPY ./jsconfig.json ./
COPY ./.env* ./
EXPOSE 3000
CMD npm start
