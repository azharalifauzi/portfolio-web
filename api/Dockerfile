FROM node:lts-alpine@sha256:bdec2d4aa13450a2e2654e562df1d8a3016b3c4ab390ccd3ed09d861cbdb0d83 as base

FROM base as production

WORKDIR /app
COPY  --chown=node:node package.json package-lock.json /app/
COPY --chown=node:node . /app
EXPOSE 5000

ENV NODE_ENV=production
RUN npm install --production
RUN npm run build

USER node

CMD ["node", "dist/index.js"]

FROM base as dev

WORKDIR /app
COPY package.json package-lock.json /app/
COPY . /app
EXPOSE 5000

ENV NODE_ENV=development
RUN npm install -g ts-node-dev
RUN npm install

USER root

CMD ["npm", "run", "dev"]