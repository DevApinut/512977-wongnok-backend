FROM node:20.5.1
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps 

EXPOSE 9000
CMD ["node", "index.js"]