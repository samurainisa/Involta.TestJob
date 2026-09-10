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
  padding: 0;
  border: none;
  border-radius: 100%;
  background: #fff;
  box-shadow:
    0 1px 4px 0 rgba(0, 0, 0, 0.05),
    0 2px 4px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.reload-button:hover {
  box-shadow:
    0 1px 4px 0 rgba(0, 0, 0, 0.08),
    0 2px 6px 0 rgba(0, 0, 0, 0.08);
}

.reload-button:focus-visible {
  outline: 2px solid #0029ff;
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

.reload-button:disabled {
  cursor: default;
}
</style>
