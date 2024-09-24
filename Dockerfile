ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-slim as runtime

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
CMD node ./dist/server/entry.mjs

# docker build -t mi-aplicacion-astro .
# docker run -p 8022:80 mi-aplicacion-astro
