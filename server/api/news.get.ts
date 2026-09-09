import { mosRssClient } from '../utils/MosRssClient';
import { MosRssParser } from '../utils/MosRssParser';

export default defineEventHandler(async () => {
  const xml = await mosRssClient.fetchFeed();
  return new MosRssParser().parse(xml);
});
