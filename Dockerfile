FROM node:18-alpine

WORKDIR /app
COPY . .

RUN yarn install --production
CMD ["yarn", "start"]

EXPOSE 3000
