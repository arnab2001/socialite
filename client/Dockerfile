FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
FROM nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

# # Build react client
# FROM node:16-alpine

# # Working directory be app
# WORKDIR /usr/src/app

# COPY package*.json ./

# ###  Installing dependencies

# RUN npm install --silent

# # copy local files to app folder
# COPY . .

# EXPOSE 3000

# CMD ["npm","start"]

# docker build -t arnabchat2001/client  .
# docker tag arnabchat2001/client arnabchat2001/client:v2
# docker run -p 3000:3000 arnabchat2001/client:v2