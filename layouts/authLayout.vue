<script setup></script>
<template>
  <div
    class="flex items-center justify-center min-h-screen lg:px-10 lg:py-25 gap-5"
  >
    <div
      class="flex flex-col items-center justify-around gap-10 bg-gradient-to-r from-[#FFFFFFCC] via-[#F5A380E6] to-[#EC4700] min-h-screen md:min-w-[100%] px-5 py-15 lg:rounded-2xl lg:flex-row"
    >
      <slot />
      <div class="max-w-[60%] md:max-w-[50%] lg:max-w-[30%] lg:max-h-[30%]">
        <img src="/assets/images/auth-image.png" />
      </div>
    </div>
  </div>
</template>
