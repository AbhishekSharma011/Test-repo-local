FROM node:20-alpine

WORKDIR /app

# Copy only manifests first (better layer caching)
COPY package*.json ./

# If you don't have package-lock.json, use install (NOT ci)
RUN npm install --omit=dev

# Now copy the rest of the app
COPY . .

# Make sure entrypoint runs on Linux even if committed from Windows
RUN chmod +x ./entrypoint.sh

ENV NODE_ENV=production
EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]
