# ✅ Base image ที่รองรับ native module (glibc) และ build tool
FROM node:20-slim AS base
RUN npm install -g npm@11.4.2
# ✅ ติดตั้ง build tools ที่จำเป็น
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  libc6-dev \
  git

WORKDIR /app

# ✅ คัดลอกไฟล์ package.json และติดตั้ง dependency
COPY package*.json ./
RUN npm install

# ✅ คัดลอกโค้ดที่เหลือ แล้ว build
COPY . .
RUN npm run build

# ✅ Run ใน container
EXPOSE 3000
CMD ["npm", "start"]
