<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button class="reload-button" :disabled="loading" @click="$emit('click')">
    <img
      class="reload-button__icon"
      :class="{ 'is-spinning': loading }"
      src="~/assets/reload-icon.svg"
    />
  </button>
</template>

<style scoped>
.reload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: var(--color-surface);
  box-shadow: var(--shadow);
}

.reload-button:hover {
  box-shadow: var(--shadow-hover);
}

.reload-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.reload-button__icon {
  display: block;
}

.reload-button__icon.is-spinning {
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
