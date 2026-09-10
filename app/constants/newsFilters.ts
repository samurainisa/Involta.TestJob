export type NewsSourceFilter = {
  id: string | undefined;
  label: string;
};

export const newsSourceFilters: NewsSourceFilter[] = [
  { id: undefined, label: 'Все' },
  { id: 'lenta', label: 'Lenta.ru' },
  { id: 'mos', label: 'Mos.ru' },
];
