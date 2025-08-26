<script setup>
import authImage from "~/assets/images/auth-image.png";
</script>
<template>
  <div class="flex items-center justify-center min-h-screen gap-5">
    <div
      class="flex flex-col-reverse items-center justify-around gap-10 bg-gradient-to-r from-[#FFFFFFCC] via-[#F5A380E6] to-[#EC4700] min-h-screen md:min-w-[100%] px-5 py-15 lg:flex-row"
    >
      <slot />
      <div class="max-w-[30%] md:max-w-[30%] lg:max-w-[25%] lg:max-h-[30%]">
        <img :src="authImage" alt="Image" />
      </div>
    </div>
  </div>
</template>
