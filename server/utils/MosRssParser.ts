import { XMLParser } from 'fast-xml-parser';
import type { NewsItem } from '~/shared/news';
import type { RawRssItem } from '../types/rawRss';

export class MosRssParser {
  private parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    isArray: (name) => name === 'item' || name === 'enclosure',
  });

  parse(xml: string): NewsItem[] {
    const parsedXml = this.parser.parse(xml);
    const data: RawRssItem[] = parsedXml?.rss?.channel?.item;

    return data.map((item) => ({
      id: new URL(item.link).pathname.split('/').filter(Boolean).at(-1) ?? item.link,
      title: item.title,
      link: item.link,
      description: item.description ?? null,
      publishedAt: item.pubDate,
      imageUrl: Array.isArray(item.enclosure)
        ? (item.enclosure.at(0)?.url ?? null)
        : (item.enclosure?.url ?? null),
    }));
  }
}
