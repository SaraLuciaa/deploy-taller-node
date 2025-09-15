# ---------- STAGE 1: builder ----------
FROM node:22 AS builder
WORKDIR /app

# Instala TODAS las dependencias (incluye dev para tener tsc)
COPY package*.json ./
RUN npm ci

# Copia código y compila a dist/
COPY . .
RUN npm run build   # <-- requiere que tengas "build": "tsc"

# ---------- STAGE 2: runner (producción) ----------
FROM node:22-slim AS runner
WORKDIR /app

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copia el compilado
COPY --from=builder /app/dist ./dist

# (si tienes archivos estáticos fuera de dist, cópialos también)
# COPY --from=builder /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000

# Asegúrate que tu "start" apunte a dist/index.js (o dist/src/index.js)
CMD ["node", "dist/index.js"]
