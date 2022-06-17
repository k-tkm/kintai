FROM node:16-alpine
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "dev"]
