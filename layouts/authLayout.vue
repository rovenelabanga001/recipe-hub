<script setup>
const isLoading = useState("isLoading");
</script>

<template>
  <div class="flex items-center justify-center min-h-screen gap-5 relative">
    <!-- Global loading overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-[#FDFAF5]/80 flex items-center justify-center z-[9999]"
    >
      <LoadingComponent class="w-10 h-10" />
    </div>

    <div
      class="flex flex-col-reverse items-center justify-around gap-10 bg-gradient-to-r from-[#FFFFFFCC] via-[#F5A380E6] to-[#EC4700] min-h-screen md:min-w-[100%] px-5 py-15 lg:flex-row"
    >
      <slot />
      <div class="max-w-[30%] md:max-w-[30%] lg:max-w-[25%] lg:max-h-[30%]">
        <img src="/public/images/auth-image.png" alt="Image" />
      </div>
    </div>
  </div>
</template>
