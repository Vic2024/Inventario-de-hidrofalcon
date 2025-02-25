interface args {
  navigation: boolean;
  pagination: boolean;
  startAutoPlay: boolean;
  timeout: number;
}
export default function useCarousel({ navigation, pagination, startAutoPlay, timeout, }: args) {
  const currentSlide = ref(1);
  const getSlideCount = ref<null | number>(null);
  const autoPlayEnabled = ref(startAutoPlay ?? true);
  const timeoutDuration = ref(timeout ?? 5000);
  const paginationEnable = ref(pagination ?? true);
  const navEnabled = ref(navigation ?? true);

  const nextSlide = () => {
    if (currentSlide.value === getSlideCount.value) {
      currentSlide.value = 1;
      return;
    }
    currentSlide.value += 1;
  };

  const prevSlide = () => {
    if (currentSlide.value === 1) {
      currentSlide.value = 1;
      return;
    }
    currentSlide.value -= 1;
  };

  const goToSlide = (index: number) => {
    currentSlide.value = index + 1;
  };

  const autoPlay = () => {
    setInterval(() => {
      nextSlide();
    }, timeoutDuration.value);
  };

  onMounted(() => {
    if (autoPlayEnabled.value) {
      autoPlay();
    }
  });

  onMounted(() => {
    getSlideCount.value = document.querySelectorAll(".slide").length;
  });

  return {
    getSlideCount,
    currentSlide,
    paginationEnable,
    navEnabled,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
