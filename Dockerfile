FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM caddy:alpine
COPY --from=build /app/build/client /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
