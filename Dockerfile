# syntax = docker/dockerfile:1

# Ajusta NODE_VERSION como desees
ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Astro"

# La aplicación Astro vive aquí
WORKDIR /app

# Establecer el entorno de producción
ENV NODE_ENV="production"

# Etapa de construcción para reducir el tamaño de la imagen final
FROM base AS build

# Instalar paquetes necesarios para construir módulos de node
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Instalar módulos de node
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copiar el código de la aplicación
COPY --link . .

# Construir la aplicación
RUN npm run build

# Eliminar dependencias de desarrollo
RUN npm prune --omit=dev

# Etapa final para la imagen de la aplicación
FROM node:${NODE_VERSION}-slim

# Copiar toda la aplicación
COPY --from=build /app /app

# Establecer el directorio de trabajo para el contenedor
WORKDIR /app

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar la aplicación, estableciendo el puerto a 80
CMD ["sh", "-c", "PORT=80 node dist/server/entry.mjs"]
