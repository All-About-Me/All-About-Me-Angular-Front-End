FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/social-media-angular /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off"]