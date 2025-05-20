FROM node:20.5.1
WORKDIR /app
COPY ..
RUN npm install --legacy-peer-deps 
EXPOSE 9000
CMD ["node", "index.js"]