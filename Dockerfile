ARG NODE_VER
FROM node:${NODE_VER} as dev

FROM node:${NODE_VER} as base
EXPOSE 3000

RUN npm update -g npm
RUN npm i -g @nestjs/cli

USER node
WORKDIR /home/node/app

COPY --chown=node:node ./backend .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

FROM node:${NODE_VER} as builder

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini


FROM base AS production
WORKDIR /home/node/app

RUN apt-get update && apt-get install -y unattended-upgrades
RUN unattended-upgrade -v

COPY --from=builder /tini /tini
COPY --chown=node:node ./backend/node_modules/ ./node_modules/
COPY --chown=node:node ./backend/dist ./dist/
COPY --chown=node:node ./backend/.env ./.env

USER node
ENTRYPOINT ["/tini", "--"]
CMD ["node", "dist/main.js"]