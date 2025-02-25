<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
import Return from '~/Icons/Return.vue'
import Footer from '~/components/Footer.vue';
import NormalInput from '~/components/Form/NormalInput.vue';
import CristalInput from '~/components/Form/CristalInput.vue';
import Carousel from '~/components/Carousel/Carousel.vue';
useHead(() => ({
    title: 'Recuperar contraseña - inventario del area de informatica',
}))
const form = reactive({
    value: { email: '' },
    errors: { email: null, message: null },
    isLoading: false
})
async function submit() {
    form.errors = { email: null, message: null }
    form.isLoading = true
    try {
        await $fetch('/recoverPass', {
            method: 'POST',
            body: { ...form.value }
        })

    } catch (err: any) {
        if (err.statusCode === 400) form.errors.email = err.data.data.email
        if (err.statusCode === 401) form.errors.message = err.data.data
    } finally {
        form.isLoading = false
    }
}
</script>
<template>
    <ClientOnly>
        <section class="h-screen flex flex-col">
            <NuxtLayout name="header">
                <ul class="h-full flex items-center justify-between desktop:flex-row-reverse  w-full ">
                    <NuxtLink to="/" class="mx-4 text-primary-color">
                        <Return />
                    </NuxtLink>
                    <img class="object-cover size-16" src="/public/img/Logo Hidrofalcon.png" />
                </ul>
            </NuxtLayout>
            <div class="desktop:hidden flex flex-1 flex-col justify-between">
                <SectionTitle title="Recuperar Contraseña" />
                <NuxtLayout name="normal-from">
                    <img class="size-[50%] w-auto object-cover" src="/public/img/Recover_pass.png"
                        alt="Imagen de Inventario">
                    <NormalInput v-model:value="form.value" v-model:errors="form.errors"
                        help-message="Este campo tienen que tener @ para validar el correo " required
                        id-help-message="helpEmailPhone" label-name="Direccion email" id="email" />
                    <button @click="submit" type="button"
                        class="py-4 px-16 text-normal text-white rounded-lg bg-primary-color">
                        Enviar correo
                    </button>
                </NuxtLayout>
                <div class="pb-16 desktop:pb-0">
                    <Footer />
                </div>
            </div>
            <div class="hidden desktop:flex flex-1 flex-col justify-between">
                <Carousel
                    :carousel-slides="['Hidrofalcon.png', 'hidrofalcon_2.jpg', 'hidrofalcon_3.jpg', 'hidrofalcon_4.jpg']"
                    :navigation="false" :pagination="false" :start-auto-play="true" :timeout="5000" :isContenido="true">
                    <NuxtLayout class="h-[537px] w-[653px]" name="cristal-form">
                        <SectionTitle cristal title="Recuperar Contraseña" />
                        <img class="size-[200px] self-center object-cover" src="/public/img/Recover_pass.png"
                            alt="Imagen de Inventario">
                        <div class='flex flex-col gap-4 justify-center items-center'>
                            <div class="w-1/2">
                                <CristalInput v-model:value="form.value" v-model:errors="form.errors"
                                    help-message="Este campo tienen que tener @ para validar el correo " required
                                    id-help-message="helpEmailDesktop" label-name="Direccion email" id="email" />
                            </div>
                            <span v-if="form.errors.message" id="error" class="text-small font-bold pl-4 text-red-500">
                                {{ form.errors.message }}
                            </span>
                            <button type="button" @click="submit"
                                class="py-4 px-16 text-normal text-white rounded-lg bg-primary-color">
                                Enviar correo
                            </button>
                        </div>
                    </NuxtLayout>
                </Carousel>
                <div class="pb-16 desktop:pb-0">
                    <Footer />
                </div>
            </div>
        </section>
    </ClientOnly>
</template>