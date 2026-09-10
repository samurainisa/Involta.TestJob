<script setup lang="ts">
import type { NewsViewMode } from '~/shared/viewMode';

defineProps<{
  modelValue: NewsViewMode;
}>();

defineEmits<{
  'update:modelValue': [value: NewsViewMode];
}>();
</script>

<template>
  <div class="view-toggle">
    <button
      class="view-toggle__button"
      :class="{ 'is-active': modelValue === 'lines' }"
      type="button"
      aria-label="Вид списком"
      @click="$emit('update:modelValue', 'lines')"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="18" height="8" fill="currentColor" />
        <rect y="10" width="18" height="8" fill="currentColor" />
      </svg>
    </button>
    <button
      class="view-toggle__button"
      :class="{ 'is-active': modelValue === 'cards' }"
      type="button"
      aria-label="Вид карточками"
      @click="$emit('update:modelValue', 'cards')"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="8" height="8" fill="currentColor" />
        <rect y="10" width="8" height="8" fill="currentColor" />
        <rect x="10" width="8" height="8" fill="currentColor" />
        <rect x="10" y="10" width="8" height="8" fill="currentColor" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.view-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.view-toggle__button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-icon);
}

.view-toggle__button.is-active {
  color: var(--color-accent);
}
</style>
