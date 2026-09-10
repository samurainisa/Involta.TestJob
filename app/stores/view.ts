import type { NewsViewMode } from '~/shared/viewMode';

const VIEW_STORAGE_KEY = 'news-view-mode';

function readSavedMode(): NewsViewMode {
  const saved = localStorage.getItem(VIEW_STORAGE_KEY);

  if (saved === 'cards' || saved === 'lines') {
    return saved;
  }

  return 'cards';
}

export const useViewStore = defineStore('view', () => {
  const mode = ref<NewsViewMode>(readSavedMode());

  function setMode(next: NewsViewMode) {
    mode.value = next;
    localStorage.setItem(VIEW_STORAGE_KEY, next);
  }

  return {
    mode,
    setMode,
  };
});
