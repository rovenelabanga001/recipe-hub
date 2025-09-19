<script setup lang="ts">
import type { NuxtError } from "#app";

const router = useRouter();

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => {
  navigateTo("/");
};
</script>
<template>
  <div class="min-h-screen flex flex-col justify-center items-center gap-3">
    <img
      src="/assets/images/error-image.png"
      alt="error image"
      class="h-32 w-32 object-cover"
    />
    <div class="flex flex-col justify-center items-center text-center gap-5">
      <h5 class="text-orange-500 font-bold text-2xl">Oops!</h5>
      <p class="text-gray-400 text-xl">{{ error?.statusMessage }}</p>
      <client-only>
        <button
          @click="handleError"
          class="bg-orange-500 px-4 py-2 text-white rounded-sm cursor-pointer"
        >
          Home
        </button>
      </client-only>
    </div>
  </div>
</template>
