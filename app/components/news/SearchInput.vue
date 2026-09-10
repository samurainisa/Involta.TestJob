<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  submit: [value: string];
}>();

function onSubmit() {
  emit('submit', props.modelValue.trim());
}
</script>

<template>
  <form class="search" @submit.prevent="onSubmit">
    <input
      class="search__field"
      type="search"
      :value="modelValue"
      aria-label="Поиск по новостям"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
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
  border-radius: 3px;
  background: #fff;
  box-shadow:
    0 1px 4px 0 rgba(0, 0, 0, 0.05),
    0 2px 4px 0 rgba(0, 0, 0, 0.05);
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #000;
}

.search__field::-webkit-search-decoration,
.search__field::-webkit-search-cancel-button {
  appearance: none;
}

.search__field:focus {
  outline: 2px solid #0029ff;
  outline-offset: 0;
}

.search__button {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>
