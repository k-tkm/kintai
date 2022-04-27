FROM node:16.13.1-alpine
RUN npm i -g @nestjs/cli
WORKDIR /backend
COPY ./package.json ./yarn.lock /backend/
RUN yarn
COPY . .
CMD ["yarn", "start:dev"]
