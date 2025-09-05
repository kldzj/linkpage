FROM node:22-slim AS base

FROM base AS deps
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public/images ./public/images
COPY --from=builder /app/config.json ./config.json

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV CONFIG_PATH=/app/config.json

CMD ["server.js"]
