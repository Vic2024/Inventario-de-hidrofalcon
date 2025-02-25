<script setup lang="ts">
const attrs = useAttrs()
</script>
<template>
    <section :id="($attrs.id as string)" class="desktop:pt-20" >
        <slot/>
    </section>
</template>