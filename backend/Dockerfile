# Backend: Node + Puppeteer (Debian slim to keep Chromium easy)
FROM node:20-slim

# Install Chromium + deps for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libnss3 \
    libx11-6 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxrender1 \
    libxshmfence1 \
    libgbm1 \
    libgtk-3-0 \
    libdrm2 \
    libpango-1.0-0 \
    libcairo2 \
 && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_ARGS="--no-sandbox --disable-setuid-sandbox"

WORKDIR /app

# Install dependencies using only backend context
COPY package*.json ./
RUN npm install --omit=dev

# Copy backend source code
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
