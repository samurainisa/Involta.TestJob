<script setup lang="ts">
import type { NewsItem } from '~/shared/news';

defineProps<{
  item: NewsItem;
}>();
</script>

<template>
  <article class="card news-tile">
    <h2>{{ item.title }}</h2>
    <p v-if="item.description" class="card__description line-clamp line-clamp-3">
      {{ item.description }}
    </p>
    <a class="news-more card__more" :href="item.link" target="_blank" rel="noopener noreferrer">
      Подробнее
    </a>
    <footer class="news-footer">
      <a
        class="news-muted"
        :href="`https://www.${item.sourceDomain}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.{{ item.sourceDomain }}
      </a>
      <time class="news-muted" :datetime="item.publishedAt">
        {{ formatNewsDate(item.publishedAt) }}
      </time>
    </footer>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 520px;
  min-height: 256px;
}

.card__description {
  margin-top: 25px;
}

.card__more {
  margin-top: 20px;
}
</style>
