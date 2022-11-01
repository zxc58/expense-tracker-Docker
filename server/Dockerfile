FROM node:alpine
WORKDIR /server
COPY . .
RUN npm install 
RUN npm i sequelize-cli -g
EXPOSE 3000
CMD [ "npm", "start" ]
