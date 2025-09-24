<script setup>
import ErrorPage from "~/components/ErrorPage.vue";

const hydrated = ref(false);
const serverError = ref(null);
const pending = ref(true);

const config = useRuntimeConfig();

onMounted(async () => {
  hydrated.value = true;
  pending.value = true;

  try {
    await $fetch(`${config.public.baseUrl}`);
  } catch (err) {
    serverError.value = {
      statusCode: err?.response?.status || 500,
      statusMessage: "Server is unreachable. Please try again later.",
    };
  } finally {
    pending.value = false;
  }
});
const viewUserProfile = (username) => {
  navigateTo(`/profile/${username}`);
};
const slugifyCategory = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};
provide("viewUserProfile", viewUserProfile);
provide("slugifyCategory", slugifyCategory);
</script>

<template>
  <div class="bg-[#FDFAF5] relative w-full min-h-screen">
    <div
      v-if="!hydrated || pending"
      class="fixed inset-0 bg-[#FDFAF5] flex items-center justify-center z-[9999] overflow-y-hidden"
    >
      <LoadingComponent />
    </div>

    <ErrorPage v-else-if="serverError" :error="serverError" />

    <template v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>
  </div>
</template>
