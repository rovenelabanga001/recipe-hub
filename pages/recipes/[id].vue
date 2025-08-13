<script setup>
const route = useRoute();
</script>
<template>
  <div>Recipe Id {{ route.params.id }}</div>
</template>
