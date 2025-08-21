<script setup>
const props = defineProps({
  searchTerm: String,
});
</script>
<template>
  <div class="flex flex-col items-center">
    <p class="text-center">
      No results found for "{{ searchTerm }}". Try something else
    </p>
  </div>
</template>
