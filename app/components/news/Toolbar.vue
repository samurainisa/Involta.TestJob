<script setup lang="ts">
import type { NewsViewMode } from '~/shared/viewMode';

defineProps<{
  source: string | undefined;
  viewMode: NewsViewMode;
}>();

defineEmits<{
  'update:source': [value: string | undefined];
  'update:viewMode': [value: NewsViewMode];
}>();
</script>

<template>
  <div class="toolbar">
    <NewsSourceTabs :model-value="source" @update:model-value="$emit('update:source', $event)" />
    <NewsViewToggle
      :model-value="viewMode"
      @update:model-value="$emit('update:viewMode', $event)"
    />
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
</style>
