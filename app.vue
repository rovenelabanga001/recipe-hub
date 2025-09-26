<script setup>
const hydrated = ref(false);
const { serverError, pending } = useServerHealth();

onMounted(() => {
  hydrated.value = true;
});

const viewUserProfile = (username) => navigateTo(`/profile/${username}`);
const slugifyCategory = (name) => name.toLowerCase().replace(/\s+/g, "-");

provide("viewUserProfile", viewUserProfile);
provide("slugifyCategory", slugifyCategory);
</script>

<template>
  <div class="bg-[#FDFAF5] relative w-full min-h-screen">
    <!-- Global fullscreen loading -->
    <!-- <div
      v-if="!hydrated || pending"
      class="fixed inset-0 bg-[#FDFAF5] flex items-center justify-center z-[9999]"
    >
      <LoadingComponent class="w-10 h-10" />
    </div> -->

    <!-- Server error -->
    <ErrorPage v-if="serverError" :error="serverError" />

    <!-- Main app -->
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
