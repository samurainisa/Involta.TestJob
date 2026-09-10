<script setup lang="ts">
import type { Pagination } from '~/shared/pagination';

const props = defineProps<{
  meta: Pagination;
}>();

const emit = defineEmits<{
  change: [page: number];
}>();

const items = computed(() => getPaginationItems(props.meta.page, props.meta.pageCount));

function onPageClick(item: number | 'ellipsis') {
  if (item === 'ellipsis') {
    return;
  }

  emit('change', item);
}
</script>

<template>
  <nav v-if="meta.total > 0" class="pagination" aria-label="Пагинация">
    <button
      v-for="(item, index) in items"
      :key="`${item}-${index}`"
      class="pagination__item"
      :class="{
        'is-active': item === meta.page,
        'is-ellipsis': item === 'ellipsis',
      }"
      type="button"
      :disabled="item === 'ellipsis'"
      @click="onPageClick(item)"
    >
      {{ item === 'ellipsis' ? '...' : item }}
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.pagination__item.is-active {
  color: var(--color-accent);
}
</style>
