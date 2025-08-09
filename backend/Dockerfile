# --- build stage (optional if you transpile) ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# make sure entrypoint is executable even if committed from Windows
RUN chmod +x ./entrypoint.sh

EXPOSE 5000
ENV NODE_ENV=production
# run through your entrypoint (you already added it)
ENTRYPOINT ["./entrypoint.sh"]

