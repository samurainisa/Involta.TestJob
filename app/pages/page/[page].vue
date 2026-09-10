<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const page = Number(route.params.page);
    return Number.isInteger(page) && page > 1;
  },
});
</script>

<template>
  <NewsListPage />
</template>
