import type { NewsViewMode } from '~/shared/viewMode';

const VIEW_STORAGE_KEY = 'news-view-mode';
const DEFAULT_MODE: NewsViewMode = 'cards';

export class ViewModeStorage {
  read(): NewsViewMode {
    const saved = this.readRaw();

    if (saved === 'cards' || saved === 'lines') {
      return saved;
    }

    return DEFAULT_MODE;
  }

  write(mode: NewsViewMode): void {
    if (!this.canUseStorage()) {
      return;
    }

    localStorage.setItem(VIEW_STORAGE_KEY, mode);
  }

  private readRaw(): string | null {
    if (!this.canUseStorage()) {
      return null;
    }

    return localStorage.getItem(VIEW_STORAGE_KEY);
  }

  private canUseStorage(): boolean {
    return typeof localStorage !== 'undefined';
  }
}

export const viewModeStorage = new ViewModeStorage();
