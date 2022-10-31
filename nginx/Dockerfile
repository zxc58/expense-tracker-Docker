# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10 as build-stage
WORKDIR /app
# ENV REACT_APP_BACK_END_HOST=http://server:3000
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
# REACT_APP_BACK_END_HOST=http://localhost:3025