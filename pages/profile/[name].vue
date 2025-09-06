<script setup>
const route = useRoute();
</script>
<template>
  <div>{{ route.params.name }}</div>
</template>
