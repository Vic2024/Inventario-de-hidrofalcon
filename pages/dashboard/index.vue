<script setup lant="ts">
import { useAuthUser } from '~/composable/useAuthUser';
definePageMeta({
    middleware: 'is-login'
})
useHead(() => ({
    title: 'Dashboard - inventario del area de informatica',
}))
const user = useAuthUser()
</script>
<template>
    <NuxtLayout name="dashboard">
        <section class="flex flex-col p-4 w-full h-full gap-4">
            <h1 class=" text-center text-h1 drop-shadow-2xl filter-none font-bold text-title-color">
                ¡ Bienvenido {{ user?.name }} {{ user?.lastname }} !</h1>
            <div class=" p-4 grid grid-rows-4 grid-cols-1 desktop:grid-cols-2 flex-1 gap-8 ">
                <div class="p-4 row-span-4 drop-shadow-2xl bg-white rounded-2xl">
                    <h2 class="text-center text-h3 font-bold drop-shadow-2xl text-title-color">
                        ¿ Donde has ingresado ?
                    </h2>
                    <p class="text-pretty font-medium p-4 text-center break-words text-[1.02rem] text-text-color">
                        Has ingresado al sistema de inventario del área de tecnología de Hidrofalcon cuya finalidad
                        tener un registro de todos lo equipos pertenecientes al área ya mencionada, esta aplicación
                        permite controlar a los usuarios que tienen acceso a este módulo, además de ingresar nuevos
                        equipos si la situación lo amerita y registrar los datos correspondiente a la ubicación y
                        especificaciones relacionado al equipamiento técnico en cuestión.
                    </p>
                </div>
                <div class="p-4 row-span-4 drop-shadow-2xl bg-white rounded-2xl">
                    <h2 class="text-center text-h4 font-bold drop-shadow-2xl text-title-color">¿ Cosas que deberias
                        saber ?</h2>
                    <ul
                        class="text-pretty mx-8 list-disc font-medium p-4 text-start break-words text-[.9rem] text-text-color">
                        <li>EL sistema funciona por medio de roles, los cuales dependiendo del mismo se limitara las
                            acciones que puede realizar dentro de la aplicación</li>
                        <li>Los usuarios con los roles correspondientes pueden editar más no eliminar los datos
                            relacionados con los equipos tecnológicos, con el fin de garantizar la estadía del equipo en
                            la institución</li>
                        <li>Los usuarios con los roles correspondientes pueden crear nuevas secciones relacionadas a
                            nuevos equipos, con el fin de registrar sus datos correspondiente para el control del mismo
                            y minimizar los posibles hurtos</li>
                    </ul>
                </div>
                <div class="p-4 row-span-2 desktop:col-span-2  drop-shadow-2xl bg-white rounded-2xl">
                    <h2 class="text-center text-h4 font-bold drop-shadow-2xl text-title-color">
                        ¿ En casos de emergancias ?
                    </h2>
                    <p class="text-pretty font-medium p-4 text-center break-word text-[.9rem] text-text-color">
                        En caso de querer modificar datos relacionados a la edición de sus datos como usuario consultar
                        con el administrador del sistema y en casos mayores hablar con el encargado del área en cuestión
                    </p>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>