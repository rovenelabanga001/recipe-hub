<script setup>
const router = useRouter();
</script>
<template>
  <button
    class="bg-[orangered] px-2 py-1 rounded-full cursor-pointer"
    @click="router.back"
  >
    <IconsBack color="white" />
  </button>
</template>
