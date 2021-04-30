FROM node:alpine3.13
WORKDIR /app
EXPOSE 3001:3001
COPY ./build ./build
COPY ./app.js .
RUN yarn add express esm
CMD ["node", "-r", "esm", "app"]