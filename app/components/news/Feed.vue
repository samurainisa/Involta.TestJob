<script setup lang="ts">
import type { NewsItem } from '~/shared/news';
import type { NewsViewMode } from '~/shared/viewMode';

defineProps<{
  items: NewsItem[];
  viewMode: NewsViewMode;
}>();
</script>

<template>
  <div v-if="items.length === 0" class="feed__empty">Ничего не найдено</div>
  <div v-else-if="viewMode === 'cards'" class="feed feed--cards">
    <NewsCard v-for="item in items" :key="item.id" :item="item" />
  </div>
  <div v-else class="feed feed--lines">
    <NewsListItem v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<style scoped>
.feed {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.feed > * {
  grid-column: span 12;
  min-width: 0;
}

@media (min-width: 768px) {
  .feed--cards > * {
    grid-column: span 6;
  }
}

.feed__empty {
  min-height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-muted);
}
</style>
