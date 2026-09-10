import { newsManager } from '~/managers/NewsManager';
import type { NewsListQuery } from '~/shared/filter';
import type { NewsItem } from '~/shared/news';
import type { Pagination } from '~/shared/pagination';

export const useNewsStore = defineStore('news', () => {
  const items = ref<NewsItem[]>([]);
  const meta = ref<Pagination | null>(null);

  async function fetchList(query: NewsListQuery) {
    const result = await newsManager.list(query);
    items.value = result.items;
    meta.value = result.meta;
    return result;
  }

  return {
    items,
    meta,
    fetchList,
  };
});
