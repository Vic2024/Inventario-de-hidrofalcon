<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
</script>
<template>
    <NuxtLayout name="section" id="Ideales">
        <SectionTitle title="Nuestro Ideales" />
        <div class="px-4 w-full grid justify-center grid-cols-1 gap-4 desktop:p-8 desktop:grid-cols-3">
            <div class="flex flex-col gap-4">
                <h3 class="text-h3 text-title-color font-bold text-center">Objetivos</h3>
                <ul class="list-disc pl-8 text-start text-normal text-pretty break-words font-medium flex flex-col gap-4">
                    <li>Garantizar la prestación del servicio de Agua Potable y
                        Saneamiento, mediante el cumplimiento de los requisitos del cliente,
                        los legales y reglamentarios aplicables.</li>
                    <li>Asegurar la eficacia de los procesos mediante el logro de los
                        resultados planificados.</li>
                    <li>Contar con un personal competente mediante el desarrollo de sus
                        habilidades, formación y experiencia apropiada.</li>
                    <li>Asegurar los recursos para el mantenimiento del Sistema de Gestión
                        de la Calidad, de acuerdo a la planificación de la calidad.</li>
                </ul>
            </div>
            <div class="flex flex-col gap-4 pb-4">
                <h3 class="text-h3 text-title-color font-bold text-center">Misión</h3>
                <p class="text-normal text-pretty break-words text-black-color font-medium text-center">Prestar los servicios de agua potable y
                    saneamiento para satisfacer las necesidades de nuestras comunidades
                    en armonía con el ambiente, mediante
                    una gestión basada en la optimización de procesos y el uso de tecnología
                    adecuada, que aseguren la sustentabilidad financiera con un personal competente, proveedores
                    confiables y
                    comunidad organizada.</p>
            </div>
            <div class="flex flex-col gap-4 pb-4">
                <h3 class="text-h3 text-title-color font-bold text-center">Visión</h3>
                <p class="text-normal text-pretty break-words text-black-color font-medium text-center">Organización líder en innovación y
                    gestión
                    sustentable de servicios
                    públicos, reconocida mundialmente como modelo de eficiencia, vinculada al
                    mejoramiento de la calidad de vida, respaldada por el compromiso y la
                    responsabilidad de su gente, que labora con sensibilidad social y vocación de servicio.</p>
            </div>
        </div>

    </NuxtLayout>
</template>
