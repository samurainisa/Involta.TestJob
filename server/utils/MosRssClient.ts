import { $fetch } from 'ofetch';

export class MosRssClient {
  constructor(private readonly feedUrl: string) {}

  async fetchFeed(): Promise<string> {
    return await $fetch(this.feedUrl, {
      responseType: 'text',
      headers: { 'User-Agent': 'InvoltaTestJob/1.0' },
    });
  }
}

export const mosRssClient = new MosRssClient('https://www.mos.ru/rss');
