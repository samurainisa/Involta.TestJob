<script setup lang="ts">
import type { NewsListResponse } from '~/shared/news';

const route = useRoute();

const { data } = await useAsyncData(
  'news',
  () =>
    $fetch<NewsListResponse>('/api/news', {
      query: {
        source: route.query.source,
        q: route.query.q,
        page: route.query.page,
      },
    }),
  { watch: [() => route.query] },
);
</script>

<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>
