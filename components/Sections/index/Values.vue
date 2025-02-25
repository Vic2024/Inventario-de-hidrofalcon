<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
</script>
<template>
    <NuxtLayout name="section" id="Valores">
        <SectionTitle title="Nuestros valores" />
        <div class="px-4 desktop:p-6 ">
            <ul
                class="list-disc pl-8 text-start text-normal font-medium flex flex-col gap-4 desktop:grid desktop:grid-cols-2">
                <div class="flex flex-col justify-center items-center gap-4">
                    <li>Sensibilidad Social: Habilidad de reconocer, comprender y apreciar el
                        sentir del colectivo, para responder efectivamente a sus necesidades
                        con sentido ambientalista.
                    </li>
                    <li>Compromiso: Apropiarse de las obligaciones de la empresa y su
                        función social, yendo más allá de lo que supone el deber contraído, para
                        ofrecer un servicio de calidad a nuestros usuarios, fortaleciendo la
                        credibilidad en la organización.
                    </li>
                    <img class="object-cover w-4/5 h-4/5" src="/public/img/valores_fundamentales.png" />
                </div>
                <div class="flex flex-col gap-4 justify-center items-center">
                    <li>Responsabilidad: Cumplimiento del deber y las normas de la
                        organización, con integridad, justicia y sentido de propósito, asumiendo
                        las consecuencias de nuestra acciones y decisiones.</li>
                    <li>Vocación de Servicio: entendimiento y generación de acciones
                        permanentes orientadas a satisfacer las necesidades del ser humano
                        como ente individual y social, origen y fin de la organización, bajo
                        principios de igualdad y justicia.
                    </li>
                    <img class="object-cover w-4/5 h-4/5" src="/public/img/valores_2.png" />
                </div>
            </ul>
        </div>
    </NuxtLayout>
</template>