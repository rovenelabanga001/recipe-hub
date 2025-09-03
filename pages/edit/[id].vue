<script setup>
const route = useRoute();
</script>

<template>
  <RecipeForm mode="edit" :recipe-id="route.params.id" />
</template>
