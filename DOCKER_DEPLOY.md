# AI-UP Next.js Docker Deploy

## 1) Что передаем заказчику

Поддерживаются два сценария:

1. Из исходников (рекомендуемо)
- заказчик собирает образы сам из Git (`main`)
- мы передаем инструкции + `.env` шаблоны

2. Готовый образ
- мы публикуем образ в реестр заказчика (Yandex Container Registry)
- заказчик только делает `docker pull` и `docker run`/`docker compose up`

## 2) Важный момент про ENV в Next.js

В этом проекте есть два типа переменных:

1. `NEXT_PUBLIC_*` (клиент)
- вшиваются в JS-бандл во время `docker build`
- изменение только в `docker compose environment` БЕЗ пересборки образа не обновит клиентский код

2. обычные переменные (`STRAPI_URL`, `REVALIDATE_SECRET` и т.д.)
- читаются серверной частью Next при запуске контейнера
- могут меняться без пересборки (но лучше фиксировать единообразно)

## 3) Обязательные переменные

- `NEXT_PUBLIC_SITE_URL` (например `https://aiup.kata.agency`)
- `NEXT_PUBLIC_STRAPI_PUBLIC_URL` (например `https://dockeraiup.kata.agency`)
- `STRAPI_URL` (внутренний URL для SSR, обычно `http://strapi:1337` в compose-сети)
- `STRAPI_PUBLIC_URL` (внешний публичный URL Strapi)
- `REVALIDATE_SECRET` (должен совпадать со Strapi)

## 4) Сборка образа (с build args)

```bash
docker build \
  -t aiup-next:latest \
  --build-arg NEXT_PUBLIC_SITE_URL=https://aiup.kata.agency \
  --build-arg NEXT_PUBLIC_STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  --build-arg STRAPI_URL=http://strapi:1337 \
  --build-arg STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  --build-arg REVALIDATE_SECRET=change-me \
  .
```

## 5) Пример запуска контейнера

```bash
docker run -d \
  --name aiup-next \
  -p 127.0.0.1:3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_SITE_URL=https://aiup.kata.agency \
  -e NEXT_PUBLIC_STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  -e STRAPI_URL=http://strapi:1337 \
  -e STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  -e REVALIDATE_SECRET=change-me \
  aiup-next:latest
```

## 6) Пример compose-сервиса

```yaml
next:
  build:
    context: ./ai-up-next
    dockerfile: Dockerfile
    args:
      NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL}
      NEXT_PUBLIC_STRAPI_PUBLIC_URL: ${NEXT_PUBLIC_STRAPI_PUBLIC_URL}
      STRAPI_URL: ${STRAPI_URL}
      STRAPI_PUBLIC_URL: ${STRAPI_PUBLIC_URL}
      REVALIDATE_SECRET: ${REVALIDATE_SECRET}
  container_name: aiup-next
  restart: unless-stopped
  environment:
    NODE_ENV: production
    PORT: 3000
    HOSTNAME: 0.0.0.0
    NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL}
    NEXT_PUBLIC_STRAPI_PUBLIC_URL: ${NEXT_PUBLIC_STRAPI_PUBLIC_URL}
    STRAPI_URL: ${STRAPI_URL}
    STRAPI_PUBLIC_URL: ${STRAPI_PUBLIC_URL}
    REVALIDATE_SECRET: ${REVALIDATE_SECRET}
  ports:
    - "127.0.0.1:${NEXT_PORT:-3000}:3000"
```

## 7) Проверка

```bash
curl -I http://127.0.0.1:3000/
curl -I https://aiup.kata.agency/blog
```

Ожидается `200`.

## 8) Частые проблемы

1. Фронт ходит не туда по API
- неверный `NEXT_PUBLIC_STRAPI_PUBLIC_URL` на этапе build
- пересоберите образ с корректными `--build-arg`

2. Порт не тот
- меняется через `ports` в compose (`${NEXT_PORT:-3000}:3000`)

3. После изменения env ничего не поменялось
- если это `NEXT_PUBLIC_*`, нужен `docker build` заново
