FROM node:18

WORKDIR /test-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
