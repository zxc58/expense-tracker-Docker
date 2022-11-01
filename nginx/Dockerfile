FROM node:alpine as build-stage
ENV REACT_APP_BACK_END_HOST=http://localhost:80
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# //
FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
