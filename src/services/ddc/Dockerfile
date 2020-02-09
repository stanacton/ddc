FROM node:lts-alpine as build-stage
RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine as production-stage
COPY --from=build-stage /app/ /home/node/app
RUN npm install
WORKDIR /home/node/app
ENV PORT=80
ENV NODE_ENV=production
EXPOSE 80
CMD ["node", "dist/server"]
