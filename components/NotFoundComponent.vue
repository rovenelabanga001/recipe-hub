<script setup>
const props = defineProps({
  searchTerm: String,
  selectedCategory: String,
  hasResults: Boolean,
});
</script>
<template>
  <div class="flex flex-col items-center" v-if="!hasResults">
    <p class="text-center">
      No results found
      <template v-if="searchTerm"> for "{{ searchTerm }}"</template>
      <template v-if="selectedCategory && selectedCategory !== 'All'"
        >in category "{{ selectedCategory }}"</template
      >
      .Try something else
    </p>
  </div>
</template>
