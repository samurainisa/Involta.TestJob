import type { RssSource } from '~/shared/news';

export const rssSources: RssSource[] = [
  {
    id: 'mos',
    label: 'Mos.ru',
    domain: 'mos.ru',
    feedUrl: 'https://www.mos.ru/rss',
  },
  {
    id: 'lenta',
    label: 'Lenta.ru',
    domain: 'lenta.ru',
    feedUrl: 'https://lenta.ru/rss/news',
  },
];
