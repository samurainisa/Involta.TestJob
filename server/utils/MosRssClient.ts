export class RssClient {
  async fetchFeed(feedUrl: string): Promise<string> {
    return await $fetch(feedUrl, {
      responseType: 'text',
      headers: { 'User-Agent': 'InvoltaTestJob/1.0' },
    });
  }
}
