<script setup lang="ts" >
import Instagram from '~/Icons/Instagram.vue';
import Portfolio from '~/Icons/Portfolio.vue';
import Linkedin from '~/Icons/Linkedin.vue'
import X from '~/Icons/X.vue'
</script>
<template>
    <footer
        class="h-[76px] bg-primary-color flex flex-col desktop:flex-row-reverse desktop:justify-between desktop:px-4 justify-center items-center gap-2 text-white">
        <div class="flex gap-2">
            <a href="https://www.instagram.com/vicdev2023/">
                <Instagram />
            </a>
            <a href="https://portafolio-psi-gray.vercel.app/">
                <Portfolio />
            </a>
            <a href="www.linkedin.com/in/victor-bermudez-3760782a8">
                <Linkedin />
            </a>
            <a href="https://x.com/vicbruiz">
                <X />
            </a>
        </div>
        <p class="text-small font-medium">🔒 Copyright por Victor Bermudez 🔒</p>
    </footer>
</template>