<script setup>
const isPlaying = ref(true);

const togglePlaying = () => {
  isPlaying.value = !isPlaying.value;
};
</script>
<template>
  <div class="w-full max-w-7xl mx-auto">
    <QuickRecipesHeader :isPlaying="isPlaying" @toggle="togglePlaying" />
    <QuickRecipesBody />
  </div>
</template>
