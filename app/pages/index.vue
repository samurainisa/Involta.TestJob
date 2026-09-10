<script setup lang="ts">
const newsStore = useNewsStore();
const route = useRoute();
const router = useRouter();

const searchText = ref(toQueryString(route.query.q) ?? '');

const { refresh, pending } = await useAsyncData(
  'news',
  () =>
    newsStore.fetchList({
      source: toQueryString(route.query.source),
      q: toQueryString(route.query.q),
      page: toQueryString(route.query.page),
    }),
  { watch: [() => route.query] },
);

watch(searchText, (value, _oldValue, onCleanup) => {
  const timer = setTimeout(() => {
    const q = value.trim() || undefined;

    if (q === toQueryString(route.query.q)) {
      return;
    }

    router.push({
      query: {
        ...route.query,
        q,
        page: undefined,
      },
    });
  }, 300);

  onCleanup(() => clearTimeout(timer));
});

async function resetFilters() {
  searchText.value = '';
  if (Object.keys(route.query).length) {
    await router.push({ query: {} });
    return;
  }
  await refresh();
}
</script>

<template>
  <div class="page">
    <NewsHeader v-model:search="searchText" :loading="pending" @refresh="resetFilters" />
    <pre class="page__debug">{{ newsStore.items }}</pre>
  </div>
</template>

<style scoped>
.page {
  padding-top: 40px;
}

.page__debug {
  margin-top: 24px;
  overflow: auto;
  font-size: 12px;
}
</style>
