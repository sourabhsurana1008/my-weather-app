FROM node:15.4 as build 
WORKDIR /my-weater-app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /my-weater-app/dist /usr/share/nginx/html