ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-slim as runtime

LABEL fly_launch_runtime="Astro"

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build -- --remote

ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV="production"

EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
