<script setup lang="ts">
import useCarousel from './useCarousel';
import CarouselLeft from '~/Icons/CarouselLeft.vue';
import CarouselRight from '~/Icons/CarouselRight.vue';
import Slide from './Slide.vue';
interface Props{
   navigation: boolean;
   pagination: boolean;
   startAutoPlay: boolean;
   timeout: number;
   isContenido: boolean;
   carouselSlides: string[];
}
const { navigation, pagination, startAutoPlay, timeout, carouselSlides } = defineProps<Props>()
const {
   getSlideCount,
   currentSlide,
   paginationEnable,
   navEnabled,
   nextSlide,
   prevSlide,
   goToSlide
} = useCarousel({ navigation, pagination, startAutoPlay, timeout })

</script>
<template>
   <article class="relative max-h-screen h-screen">
      <Slide v-for="(slide, index) in carouselSlides" :key="index">
         <div v-show="currentSlide === index + 1" class="absolute z-0 top-0 left-0 w-full max-h-full h-full">
            <NuxtImg class="object-cover min-w-full h-full " :src="`/img/${slide}`" />
         </div>
      </Slide>
      <div v-if="navEnabled" class="py-0 px-4 size-full absolute flex justify-center items-center">
         <div class="flex flex-1 text-primary-color">
            <CarouselLeft class="cursor-pointer" @click="prevSlide" />
         </div>
         <div class="flex flex-1 justify-end text-primary-color">
            <CarouselRight class="cursor-pointer" @click="nextSlide" />
         </div>
      </div>
      <div v-if="paginationEnable" class="absolute bottom-6 w-full flex gap-4 justify-center items-center">
         <span
            class="cursor-pointer size-5 rounded-[50%] bg-white [box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)]"
            @click="goToSlide(index)" v-for="(slide, index) in getSlideCount" :key="index"
            :class="{ active: index + 1 === currentSlide }" />
      </div>
      <aside v-if="isContenido"
         class="absolute z-0 w-full min-h-screen flex justify-center items-center text-center bg-black/50">
         <slot />
      </aside>
   </article>
</template>
<style>
.active {
   background-color: #042b82;
}
</style>