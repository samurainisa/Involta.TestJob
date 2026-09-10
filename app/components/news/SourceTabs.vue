<script setup lang="ts">
import { newsSourceFilters } from '~/constants/newsFilters';

const props = defineProps<{
  modelValue: string | undefined;
}>();

defineEmits<{
  'update:modelValue': [value: string | undefined];
}>();

function isActive(filterId: string | undefined) {
  if (props.modelValue === undefined) {
    return true;
  }

  return props.modelValue === filterId;
}
</script>

<template>
  <div class="source-tabs">
    <button
      v-for="filter in newsSourceFilters"
      :key="filter.label"
      class="source-tabs__item"
      :class="{ 'is-active': isActive(filter.id) }"
      type="button"
      @click="$emit('update:modelValue', filter.id)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<style scoped>
.source-tabs {
  display: flex;
  align-items: center;
  gap: 24px;
}

.source-tabs__item {
  color: var(--color-muted);
}

.source-tabs__item.is-active {
  color: var(--color-accent);
}
</style>
