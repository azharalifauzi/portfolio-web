FROM node:lts-alpine@sha256:bdec2d4aa13450a2e2654e562df1d8a3016b3c4ab390ccd3ed09d861cbdb0d83 as base

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base as production

WORKDIR /app
COPY . .
COPY --from=base /app/node_modules ./node_modules
RUN yarn build

ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]

FROM base as dev
WORKDIR /app
COPY . .
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "dev"]