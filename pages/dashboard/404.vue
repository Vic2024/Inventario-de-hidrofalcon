<script setup lang="ts">
definePageMeta({
   middleware: 'is-login'
})
useHead(() => ({
   title: "Pagina no encontrada",
}));
</script>
<template>
   <NuxtLayout name="dashboard">
      <NuxtLayout name="404" />
   </NuxtLayout>
</template>