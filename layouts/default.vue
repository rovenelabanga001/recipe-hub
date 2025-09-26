<script setup>
const isLoading = useState("isLoading");
</script>

<template>
  <div
    class="container flex-column mx-auto px-8 pb-20 md:px-15 text-xs min-h-screen md:text-lg relative"
  >
    <Navbar />

    <!-- Global loading overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-[#FDFAF5]/80 flex items-center justify-center z-[9999]"
    >
      <LoadingComponent class="w-10 h-10" />
    </div>

    <!-- Page content -->
    <div class="flex-column mx-auto mt-4 mb-6">
      <slot />
    </div>
  </div>
</template>
