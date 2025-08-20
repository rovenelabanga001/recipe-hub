<script setup>
const props = defineProps({
  recipes: Array,
});
</script>

<template>
  <SearchBar />
  <div
    class="grid place-items-center gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-7 w-full overflow-hidden"
  >
    <CategoryFilterCard />
  </div>
</template>
