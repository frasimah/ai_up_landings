# Handoff Package (Next.js)

## Что передаем заказчику

Есть 2 рабочих сценария.

1. Готовый Docker-образ (быстрый запуск)
- Мы публикуем образ в их Yandex Container Registry.
- Заказчик делает `docker pull` и запускает контейнер/compose.

2. Сборка из исходников (полный контроль)
- Заказчик берет `main` из Git.
- Сам собирает образ через `docker build`.

Рекомендуем передать оба варианта сразу.

## Теги образов

Рекомендуемый формат:
- `next:release-YYYYMMDD-HHMM`
- `next:latest`

## Публикация готового образа

```bash
# пример
IMAGE=cr.yandex/<registry-id>/aiup-next
TAG=release-$(date +%Y%m%d-%H%M)

docker build \
  -t ${IMAGE}:${TAG} \
  --build-arg NEXT_PUBLIC_SITE_URL=https://aiup.kata.agency \
  --build-arg NEXT_PUBLIC_STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  --build-arg STRAPI_URL=http://strapi:1337 \
  --build-arg STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  --build-arg REVALIDATE_SECRET=<secret> \
  .

docker tag ${IMAGE}:${TAG} ${IMAGE}:latest
docker push ${IMAGE}:${TAG}
docker push ${IMAGE}:latest
```

## Сборка заказчиком из Git

```bash
git clone <repo-url>
cd ai-up-next

docker build \
  -t aiup-next:latest \
  --build-arg NEXT_PUBLIC_SITE_URL=https://aiup.kata.agency \
  --build-arg NEXT_PUBLIC_STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  --build-arg STRAPI_URL=http://strapi:1337 \
  --build-arg STRAPI_PUBLIC_URL=https://dockeraiup.kata.agency \
  --build-arg REVALIDATE_SECRET=<secret> \
  .
```

## Запуск (compose)

```yaml
next:
  image: cr.yandex/<registry-id>/aiup-next:latest # или локальный aiup-next:latest
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

## Важно про env

- `NEXT_PUBLIC_*` читаются на этапе build и вшиваются в бандл.
- Если меняются `NEXT_PUBLIC_*`, нужен новый `docker build`.
- Runtime-переменные (`STRAPI_URL`, `REVALIDATE_SECRET`) можно менять через compose/env.

## Smoke-check

```bash
curl -I http://127.0.0.1:${NEXT_PORT:-3000}/
curl -I https://aiup.kata.agency/blog
```

Ожидается `200`.
