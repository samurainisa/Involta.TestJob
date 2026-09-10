import { viewModeStorage } from '~/storages/ViewModeStorage';
import type { NewsViewMode } from '~/shared/viewMode';

export const useViewStore = defineStore('view', () => {
  const mode = ref<NewsViewMode>('cards');

  function restore(): void {
    mode.value = viewModeStorage.read();
  }

  function setMode(next: NewsViewMode) {
    mode.value = next;
    viewModeStorage.write(next);
  }

  if (import.meta.client) {
    onNuxtReady(restore);
  }

  return {
    mode,
    setMode,
  };
});
