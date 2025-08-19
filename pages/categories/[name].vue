<script setup>
definePageMeta({
  layout: "no-navbar-layout",
});

const route = useRoute();
const config = useRuntimeConfig();

const category = route.params.name;
console.log(category);

const {
  data: categoryRecipes,
  error,
  pending,
} = await useFetch(`${config.public.baseUrl}/recipes?category=${category}`);

if (error.value) {
  showError({
    statusMessage: "Something went wrong, try again later",
  });
}
</script>
<template>
  <div>
    <h1>single categories</h1>
  </div>
</template>
