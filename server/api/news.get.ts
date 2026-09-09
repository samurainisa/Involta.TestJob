import type { NewsListResponse } from '~/shared/news';
import { RssClient } from '../utils/MosRssClient';
import { MosRssParser } from '../utils/MosRssParser';
import { rssSources } from '../constants/sources';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const sourceId = typeof query.source === 'string' ? query.source : undefined;
  const search = typeof query.q === 'string' ? query.q.trim().toLowerCase() : '';
  const page = Number(query.page) || 1;
  const pageSize = 10;

  const client = new RssClient();
  const parser = new MosRssParser();

  const news = await Promise.all(
    rssSources.map(async (source) => {
      const xml = await client.fetchFeed(source.feedUrl);
      return parser.parse(xml, source);
    }),
  );
  let items = news.flat();

  items.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  if (sourceId) {
    items = items.filter((item) => item.sourceId === sourceId);
  }

  if (search) {
    items = items.filter((item) => {
      const title = item.title.toLowerCase();
      const description = (item.description ?? '').toLowerCase();
      return title.includes(search) || description.includes(search);
    });
  }

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = (safePage - 1) * pageSize;

  const result: NewsListResponse = {
    items: items.slice(start, start + pageSize),
    meta: {
      page: safePage,
      pageSize,
      total,
      pageCount,
    },
  };

  return result;
});
