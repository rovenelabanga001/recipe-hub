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
  <NuxtLayout>
    <!-- Always include NuxtPage at top level -->
    <NuxtPage v-slot="{ Component }">
      <div class="relative w-full min-h-screen">
        <!-- Loader -->
        <div v-if="!hydrated || pending" class="fixed inset-0 flex items-center justify-center z-[9999]">
          <LoadingComponent />
        </div>

        <!-- Server error -->
        <ErrorPage v-else-if="serverError" :error="serverError" />

        <!-- Actual page content -->
        <component :is="Component" v-else />
      </div>
    </NuxtPage>
  </NuxtLayout>
</template>


