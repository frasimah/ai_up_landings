FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app

# These vars are baked into the Next.js client bundle at build time.
ARG NEXT_PUBLIC_SITE_URL=
ARG NEXT_PUBLIC_STRAPI_PUBLIC_URL=
ARG STRAPI_URL=
ARG STRAPI_PUBLIC_URL=
ARG REVALIDATE_SECRET=
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_STRAPI_PUBLIC_URL=${NEXT_PUBLIC_STRAPI_PUBLIC_URL}
ENV STRAPI_URL=${STRAPI_URL}
ENV STRAPI_PUBLIC_URL=${STRAPI_PUBLIC_URL}
ENV REVALIDATE_SECRET=${REVALIDATE_SECRET}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
