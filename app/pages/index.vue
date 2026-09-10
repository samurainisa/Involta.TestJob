<script setup lang="ts">
const newsStore = useNewsStore();
const viewStore = useViewStore();
const route = useRoute();
const router = useRouter();

const searchText = ref(toQueryString(route.query.q) ?? '');
const selectedSource = computed(() => toQueryString(route.query.source));

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

async function setSource(source: string | undefined) {
  await router.push({
    query: {
      ...route.query,
      source,
      page: undefined,
    },
  });
}

async function setPage(page: number) {
  await router.push({
    query: {
      ...route.query,
      page: page === 1 ? undefined : String(page),
    },
  });
}
</script>

<template>
  <div class="page">
    <NewsHeader v-model:search="searchText" :loading="pending" @refresh="resetFilters" />
    <NewsToolbar
      class="page__toolbar"
      :source="selectedSource"
      :view-mode="viewStore.mode"
      @update:source="setSource"
      @update:view-mode="viewStore.setMode"
    />
    <NewsFeed class="page__feed" :items="newsStore.items" :view-mode="viewStore.mode" />
    <NewsPaginationBar
      v-if="newsStore.meta"
      class="page__pagination"
      :meta="newsStore.meta"
      @change="setPage"
    />
  </div>
</template>

<style scoped>
.page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 20px;
  padding-top: 40px;
  padding-bottom: 50px;
}

.page > * {
  grid-column: 1 / -1;
  min-width: 0;
}

.page__toolbar {
  margin-top: 28px;
}

.page__feed {
  margin-top: 27px;
}

.page__pagination {
  margin-top: 50px;
}

@media (max-width: 767px) {
  .page {
    padding-top: 36px;
  }
}
</style>
