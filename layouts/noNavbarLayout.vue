<script setup>
const router = useRouter();
</script>
<template>
  <div
    class="flex flex-col items-start justify-start py-8 px-5 gap-5"
  >
    <button @click="router.back" class="bg-[orangered] px-4 py-2 mb-12">
      <IconsBack />
    </button>
    <slot />
  </div>
</template>
