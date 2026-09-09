import type { RssSource } from '~/shared/news';
import { RssClient } from '../utils/MosRssClient';
import { MosRssParser } from '../utils/MosRssParser';

const sources: RssSource[] = [
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

export default defineEventHandler(async () => {
  const client = new RssClient();
  const parser = new MosRssParser();

  const news = await Promise.all(
    sources.map(async (source) => {
      const xml = await client.fetchFeed(source.feedUrl);
      return parser.parse(xml, source);
    }),
  );
  return news.flat();
});
