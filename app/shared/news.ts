export type NewsItem = {
  id: string;
  title: string;
  link: string;
  description: string | null;
  publishedAt: string;
  imageUrl: string | null;
  sourceId: string;
  sourceLabel: string;
  sourceDomain: string;
};

export type RssSource = {
  id: string;
  label: string;
  domain: string;
  feedUrl: string;
};
