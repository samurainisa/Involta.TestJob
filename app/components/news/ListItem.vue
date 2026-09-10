<script setup lang="ts">
import type { NewsItem } from '~/shared/news';

defineProps<{
  item: NewsItem;
}>();
</script>

<template>
  <article class="row news-tile">
    <img
      v-if="item.imageUrl"
      class="row__image"
      :src="item.imageUrl"
      :alt="item.title"
      width="200"
      height="100"
    />
    <div v-else class="row__image row__image--empty" />
    <div class="row__content">
      <h2>{{ item.title }}</h2>
      <p v-if="item.description" class="row__description line-clamp line-clamp-2">
        {{ item.description }}
      </p>
      <a class="news-more row__more" :href="item.link" target="_blank" rel="noopener noreferrer">
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
    </div>
  </article>
</template>

<style scoped>
.row {
  display: flex;
  gap: 30px;
  width: 100%;
  min-height: 189px;
}

.row__image {
  flex-shrink: 0;
  width: 200px;
  height: 100px;
  object-fit: cover;
}

.row__image--empty {
  background: #f0f0f0;
}

.row__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.row__description {
  margin-top: 12px;
}

.row__more {
  margin-top: 12px;
}

@media (max-width: 767px) {
  .row {
    flex-direction: column;
    gap: 20px;
    min-height: 435px;
  }

  .row__image {
    width: 100%;
    height: 166px;
  }
}
</style>
