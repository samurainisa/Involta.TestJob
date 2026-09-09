export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

export type Paginated<T> = {
  items: T[];
  meta: Pagination;
};
