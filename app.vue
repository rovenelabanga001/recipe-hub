<script setup>
import { ref, onMounted } from "vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

const hydrated = ref(false);

onMounted(() => {
  hydrated.value = true;
});

const viewUserProfile = (username) => {
  navigateTo(`/profile/${username}`);
};

const slugifyCategory = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
}

provide("viewUserProfile", viewUserProfile);
provide("slugifyCategory" ,slugifyCategory)
</script>

<template>
  <div class="bg-[#FDFAF5] relative w-full min-h-screen">
    <!-- Always render NuxtLayout + NuxtPage -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Overlay loader while not hydrated -->
    <div
      v-if="!hydrated"
      class="fixed inset-0 bg-[#FDFAF5] flex items-center justify-center z-[9999] overflow-y-hidden"
    >
      <LoadingComponent />
    </div>
  </div>
</template>
