FROM node as build-stage
RUN npm i -g yarn
ADD . /app
WORKDIR /app
RUN yarn
ENV NODE_ENV=production
RUN yarn build

FROM nginx

COPY --from=build-stage /app/build/ /usr/share/nginx/html
