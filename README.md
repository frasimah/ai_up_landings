
## Docker Deploy

Подробная инструкция: [DOCKER_DEPLOY.md](./DOCKER_DEPLOY.md)

### Важно про ENV в Docker

- `NEXT_PUBLIC_*` переменные попадают в клиентский бандл во время `docker build`.
- Если меняете `NEXT_PUBLIC_*`, нужно пересобрать образ.
- Runtime env без пересборки работает только для серверной части Next.

## Переменные окружения

Локально фронтенд должен ходить в Strapi через сетевой IP, а не через `localhost`.

1. Скопируйте `.env.example` в `.env.local`.
2. Укажите ваш локальный IP для `STRAPI_URL` и `STRAPI_PUBLIC_URL`, например `http://192.168.0.10:1337`.
3. Для локального фронтенда оставьте `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

Для production на Vercel задайте переменные проекта:

- `NEXT_PUBLIC_SITE_URL=https://aiup.kata.agency`
- `STRAPI_URL=<production strapi url>`
- `STRAPI_PUBLIC_URL=<public strapi url>`
- `STRAPI_TOKEN=<optional token>`
- `REVALIDATE_SECRET=<optional secret>`

Если `NEXT_PUBLIC_SITE_URL` не задан, приложение в production автоматически использует `https://aiup.kata.agency`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
