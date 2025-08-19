<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const modules = [Navigation, Pagination, Autoplay];
const config = useRuntimeConfig();

const showTags = ref(false);

const { data: quickRecipes } = await useSafeFetch(
  `${config.public.baseUrl}/recipes?prepTime_lte=20`,
  {
    key: "quick-recipes",
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
    autoplay
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
      <RecipeCard :recipes="[recipe]" :show-tags="showTags" />
    </SwiperSlide>
  </Swiper>
</template>
