import type { HttpClient } from '~/clients/HttpClient';
import type { NewsListResponse } from '~/shared/news';
import { httpClient } from '~/clients/HttpClient';
import type { NewsListQuery } from '~/shared/filter';

class NewsManager {
  constructor(private readonly http: HttpClient) {}

  list(query: NewsListQuery): Promise<NewsListResponse> {
    return this.http.get<NewsListResponse>('/api/news', query);
  }
}

export const newsManager = new NewsManager(httpClient);
