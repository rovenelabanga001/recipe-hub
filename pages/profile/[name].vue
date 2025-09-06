<script setup>
const route = useRoute();
</script>
<template>
  <div class="p-2 space-y-10">
    <BackBtn />
    <ProfilePageHeader mode="other" :username="route.params.name" />
    <ProfilePageBody mode="other" :username="route.params.name" />
  </div>
</template>
