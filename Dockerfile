FROM node:22.18.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile --prefer-offline --link-duplicates --ignore-scripts --production

COPY . .

EXPOSE 3000

CMD ["node", "dist/app.js"]
