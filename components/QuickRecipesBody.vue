<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const showTags = ref(false);

const { $authApi } = useNuxtApp();

const { data: quickRecipes } = await useAsyncData("quickRecipes", async () =>{
 const res = await $authApi("/recipes/quick-meals/20")
 return res.data
}
);
</script>
<template>
  <Swiper
    :modules="[Navigation, Pagination, Autoplay]"
    :slides-per-view="4"
    :space-between="20"
    navigation
    pagination
    :autoplay="{
      delay: 1500,
      disableOnInteraction: false,
      reverseDirection: true,
    }"
    class="my-6"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }"
  >
    <SwiperSlide v-for="recipe in quickRecipes" :key="recipe.id">
      <RecipeCard :recipe="recipe" :show-tags="showTags" />
    </SwiperSlide>
  </Swiper>
</template>

<style>
.swiper-pagination-bullet-active {
  background: linear-gradient(to right, #f59e0b, #ef4444);
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.7);
}
.swiper-button-next,
.swiper-button-prev {
  color: #ef4444;
  font-size: 20px;
}
</style>
