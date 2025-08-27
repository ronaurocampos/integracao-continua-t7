FROM node:20-alpine AS build
COPY . /home/app/
RUN npm install -g @angular/cli@19.2.15
WORKDIR /home/app/
RUN npm install && ng build

FROM nginx:stable-alpine-slim
COPY --from=build /home/app/dist/sgcmapp/browser/ /usr/share/nginx/html
COPY --from=build /home/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
