<script setup lang="ts">
defineProps<{
  search: string;
  loading: boolean;
}>();

defineEmits<{
  'update:search': [value: string];
  search: [value: string];
  refresh: [];
}>();
</script>

<template>
  <header class="header">
    <div class="header__bar">
      <div class="header__title-row">
        <h1 class="header__title">Список новостей</h1>
        <NewsReloadButton :loading="loading" @click="$emit('refresh')" />
      </div>
      <NewsSearchInput
        :model-value="search"
        @update:model-value="$emit('update:search', $event)"
        @submit="$emit('search', $event)"
      />
    </div>
    <hr class="header__divider" />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 34px;
}

.header__divider {
  width: 1060px;
  max-width: 100%;
  height: 1px;
  margin: 0;
  border: none;
  background: var(--color-line);
}

.header__title-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__title {
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
}
</style>
