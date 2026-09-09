export type RawRssEnclosure = {
  url: string;
  type: string;
};

export type RawRssItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string | null;
  enclosure?: RawRssEnclosure | RawRssEnclosure[];
};
