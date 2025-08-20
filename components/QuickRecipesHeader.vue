<script setup>
const props = defineProps({
  isPlaying: Boolean,
});

const emit = defineEmits(["toggle"]);
</script>
<template>
  <div class="flex items-center justify-between mb-8">
    <h2 class="md:text-2xl text-lg font-bold">Under 20 minutes</h2>
  </div>
</template>
