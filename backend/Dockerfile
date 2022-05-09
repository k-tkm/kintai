FROM node:16.13.1-alpine
WORKDIR /backend
COPY ./package.json ./yarn.lock /backend/
RUN yarn
COPY . .
CMD ["yarn", "start:dev"]
