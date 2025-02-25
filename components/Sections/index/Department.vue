<script setup lang="ts">
import SectionTitle from '~/components/SectionTitle.vue';
import Footer from '~/components/Footer.vue'
</script>
<template>
    <NuxtLayout name="section" id="Departamento">
        <SectionTitle title="Departamento en cuestión" />
        <div class="px-4 desktop:p-8 desktop:grid desktop:grid-cols-2">
            <p class="text-normal text-black-color font-medium text-center flex justify-center items-center">
                El departamento es la gerencia de tecnología de información y
                comunicación el cual se encuentra conformado por el área de informática y
                servicio técnico el cual se encargar de la reparación, restauración y
                mantenimiento de los equipos tecnológicos de la organización, por otra parte,
                se encuentra el área de telecomunicaciones los cuales se encarga de la
                reparación y mantenimientos de las líneas telefónicas que constituyen la
                institución, el manejo de servidores y la comunicación de redes de la institución Por otro lado, se
                encuentra
                el área de sistemas los cuales están
                encargados de administrar y respaldar todas las acciones correspondientes a
                los sistemas informáticos de la empresa y por último se encuentra la gerencia encargada de la
                administración
                del departamento el cual tiene la función de
                llevar a cabo todas las solicitudes que se generan dentro de la empresa en
                relación a los equipos, sistemas tecnológicos, con el fin de que todas las
                demás áreas ejerzan su función de manera eficiente.
            </p>
            <div class="py-4 flex flex-col gap-4 items-center justify-center">
                <h3 class="text-h3 font-bold text-title-color text-center w-1/2">¿Que función tiene el departamento?
                </h3>
                <ul class="list-disc pl-8 text-start text-normal font-medium flex flex-col gap-4">
                    <li>Sensibilidad Social: Habilidad de reconocer, comprender y apreciar el
                        sentir del colectivo, para responder efectivamente a sus necesidades
                        con sentido ambientalista.</li>
                    <li>Compromiso: Apropiarse de las obligaciones de la empresa y su
                        función social, yendo más allá de lo que supone el deber contraído, para
                        ofrecer un servicio de calidad a nuestros usuarios, fortaleciendo la
                        credibilidad en la organización.</li>
                    <li>Responsabilidad: Cumplimiento del deber y las normas de la
                        organización, con integridad, justicia y sentido de propósito, asumiendo
                        las consecuencias de nuestra acciones y decisiones.</li>
                    <li>Vocación de Servicio: entendimiento y generación de acciones
                        permanentes orientadas a satisfacer las necesidades del ser humano
                        como ente individual y social, origen y fin de la organización, bajo
                        principios de igualdad y justicia.</li>
                </ul>
            </div>

        </div>
        <div class="pt-8 pb-16 desktop:pt-0 desktop:pb-0">
            <Footer />
        </div>
    </NuxtLayout>
</template>