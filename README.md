# Involta Test Job — Лента новостей

SSR-приложение на Nuxt для агрегации новостей из нескольких RSS-источников с фильтрацией, поиском, пагинацией и переключением вида списка.

## Стек

- [Nuxt 4](https://nuxt.com/) (SSR) + [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) — управление состоянием
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) — парсинг RSS на сервере
- TypeScript, ESLint, Prettier

## Источники новостей

RSS-фиды агрегируются на сервере (`server/api/news.get.ts`) и объединяются в единую ленту, отсортированную по дате:

| id      | Источник  | Feed                          |
| ------- | --------- | ------------------------------ |
| `mos`   | Mos.ru    | https://www.mos.ru/rss         |
| `lenta` | Lenta.ru  | https://lenta.ru/rss/news      |

Список источников — `server/constants/sources.ts`.

## Функциональность

- **Список новостей** — карточками или строками, переключение вида хранится в `localStorage` (`app/storages/ViewModeStorage.ts`), не сбрасывается фильтрами
- **Пагинация** — постраничная навигация с полным путём в URL: `/` — первая страница, `/page/2`, `/page/3` и т.д. (`app/pages/page/[page].vue`)
- **Фильтр по источнику** и **поиск** по заголовку/описанию — состояние хранится в query-параметрах (`?source=`, `?q=`), поиск — с debounce 300мс
- **Сброс фильтров** — очищает поиск, фильтр по источнику и возвращает на первую страницу
- **Обновление списка** — повторный запрос текущей страницы с текущими фильтрами

## Маршрутизация

| URL                      | Описание                                   |
| ------------------------ | ------------------------------------------- |
| `/`                      | Первая страница ленты                       |
| `/page/:page`            | Страница `:page` (число > 1, иначе 404)     |
| `?source=lenta\|mos`     | Фильтр по источнику (query param)           |
| `?q=текст`               | Поисковый запрос (query param)              |

Query-параметры сохраняются при переходе между страницами пагинации.

## Установка и запуск

```bash
npm install

npm run dev       # dev-сервер, http://localhost:3000

npm run build      # production-сборка
npm run preview    # локальный просмотр production-сборки

npm run lint        # ESLint
npm run lint:fix
npm run format       # Prettier
npm run format:check
```

## Структура проекта

```
app/
  clients/       # HTTP-клиент для запросов к своему API
  components/     # UI-компоненты (app/components/news/*)
  constants/       # Клиентские константы (фильтры источников)
  managers/         # Слой доменной логики поверх HTTP-клиента
  pages/             # Файловая маршрутизация (/, /page/:page)
  shared/             # Общие типы (news, pagination, filter, viewMode)
  storages/            # Обёртки над localStorage
  stores/               # Pinia-сторы (news, view)
  utils/                 # Утилиты (форматирование дат, пагинация, query)
server/
  api/            # Nuxt server route — агрегация и фильтрация новостей
  constants/       # Список RSS-источников
  types/            # Типы «сырых» RSS-данных
  utils/             # RSS-клиент и парсер
```
