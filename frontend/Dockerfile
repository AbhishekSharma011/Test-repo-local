# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # CRA -> /build ; Vite -> /dist (Dockerfile below assumes CRA)

# Serve with Nginx
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
# Make sure the file name matches exactly (we use nginx.conf below)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# If your build outputs /dist (Vite), change /app/build to /app/dist
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
