<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  submit: [value: string];
}>();

const field = ref<HTMLInputElement | null>(null);
const hasValue = computed(() => props.modelValue.length > 0);

function onSubmit() {
  emit('submit', props.modelValue.trim());
}

function clear() {
  emit('update:modelValue', '');
  field.value?.focus();
}
</script>

<template>
  <form class="search" @submit.prevent="onSubmit">
    <input
      ref="field"
      class="search__field"
      :class="{ 'has-value': hasValue }"
      type="search"
      :value="modelValue"
      aria-label="Поиск по новостям"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="hasValue"
      class="search__clear"
      type="button"
      aria-label="Очистить поиск"
      @click="clear"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1L11 11M11 1L1 11"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <button class="search__button" type="submit" aria-label="Искать">
      <img src="~/assets/lupa-icon.svg" alt="" width="20" height="20" />
    </button>
  </form>
</template>

<style scoped>
.search {
  position: relative;
  width: 321px;
  height: 40px;
}

.search__field {
  width: 100%;
  height: 100%;
  padding: 0 40px 0 12px;
  border: none;
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--shadow);
}

.search__field.has-value {
  padding-right: 72px;
}

.search__field::-webkit-search-decoration,
.search__field::-webkit-search-cancel-button {
  appearance: none;
}

.search__field:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 0;
}

.search__clear,
.search__button {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.search__clear {
  right: 40px;
  width: 32px;
  color: var(--color-muted);
}

.search__clear:hover {
  color: var(--color-text);
}

.search__button {
  right: 0;
  width: 40px;
}
</style>
