FROM node:20-slim AS base

# ✅ ติดตั้ง native build tool สำหรับ lightningcss
RUN apt-get update && apt-get install -y python3 make g++ libc6-dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
