<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
import Return from '~/Icons/Return.vue'
import Footer from '~/components/Footer.vue';
import CristalInput from '~/components/Form/CristalInput.vue';
import NormalInput from '~/components/Form/NormalInput.vue';
import Carousel from '~/components/Carousel/Carousel.vue';
const { id, token } = useRoute().params
const initValues = {
    value: { password: '', confirPassword: '' },
    errors: { password: null, confirPassword: null, message: null },
    isLoading: false
}
const form = reactive({ ...initValues })
async function submit() {
    form.isLoading = true
    try {
        await $fetch('/recoverPass/resetPass', {
            method: 'POST',
            params: { id, token },
            body: { ...form.value }
        })
    } catch (err: any) {
        if (err.statusCode === 400 || err.statusCode === 498) form.errors = { ...initValues.errors, ...err.data.data }
    } finally {
        form.isLoading = false
    }
}
</script>
<template>
    <NuxtLayout name="header">
        <ul class="h-full flex items-center justify-between desktop:flex-row-reverse  w-full ">
            <NuxtLink to="/" class="mx-4 text-primary-color">
                <Return />
            </NuxtLink>
            <img class="object-cover size-16" src="/public/img/Logo Hidrofalcon.png" />
        </ul>
    </NuxtLayout>
    <section class="h-screen flex flex-col">
        <div class="desktop:hidden flex flex-1 flex-col justify-between">
            <SectionTitle title="Reiniciar Contraseña" />
            <NuxtLayout name="normal-from">
                <img class="size-[100px] object-cover" src="/public/img/Reiniciar_pass.png" alt="Imagen de Inventario">
                <NormalInput type="password" v-model:value="form.value" v-model:errors="form.errors"
                    help-message="Este campo debe de tener al menos 8 caracteres, entre letras mayusculas, letras minusculas y caracteres especiales (#@$%&*.)"
                    required id-help-message="helpPasswordPhone" label-name="Nueva constraseña" id="password" />
                <NormalInput type="password" v-model:value="form.value" v-model:errors="form.errors"
                    help-message="Este campo debe de tener al menos 8 caracteres, entre letras mayusculas, letras minusculas y caracteres especiales (#@$%&*.)"
                    required id-help-message="helpConfirmPassPhone" label-name="Confirmar constraseña"
                    id="confirPassword" />
                <button type="button" @click="submit"
                    class="py-4 px-16 text-normal text-white rounded-lg bg-primary-color">
                    Restaurar contraseña
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
                <NuxtLayout class="h-[588px] w-[654px]" name="cristal-form">
                    <SectionTitle cristal title="Recuperar Contraseña" />
                    <img class="size-[200px] self-center object-cover" src="/public/img/Reiniciar_pass.png"
                        alt="Imagen de Inventario">
                    <div class='flex flex-col gap-4 justify-center items-center'>
                        <div class="w-1/2 flex flex-col gap-4">
                            <CristalInput type="password" v-model:value="form.value" v-model:errors="form.errors"
                                help-message="Este campo debe de tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un numero y un caracter especial (@$!%?&)"
                                required id-help-message="helpPasswordDesktop" label-name="Nueva constraseña"
                                id="password" />
                            <CristalInput type="password" v-model:value="form.value" v-model:errors="form.errors"
                                help-message="Este campo debe de tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un numero y un caracter especial (@$!%?&)"
                                required id-help-message="helpConfirmPassDesktop" label-name="Confirmar constraseña"
                                id="confirPassword" />
                        </div>
                        <button type="button" @click="submit"
                            class="py-4 px-16 text-normal text-white rounded-lg bg-primary-color">
                            Restaurar contraseña
                        </button>
                    </div>
                </NuxtLayout>
            </Carousel>
            <div class="pb-16 desktop:pb-0">
                <Footer />
            </div>
        </div>
    </section>
</template>