<script setup>
const props = defineProps({
  isPlaying: Boolean,
});

const emit = defineEmits(["toggle"]);
</script>
<template>
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-2xl font-bold">Under 20 minutes</h2>
    <!-- <button @click="emit('toggle')" class="flex flex-col items-center">
      <IconsPlay v-if="!isPlaying" /> <IconsPause v-else /><span
        class="text-sm text-gray-300"
        >{{ isPlaying ? "Pause" : "Play" }}</span
      >
    </button> -->
  </div>
</template>
