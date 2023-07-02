FROM node:16.15.0
WORKDIR /crudtask
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]