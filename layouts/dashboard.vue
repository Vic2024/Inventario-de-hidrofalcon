<script setup lang="ts">
import Aside from '../components/Aside.vue';
import Footer from '../components/Footer.vue';
import HeaderDashboard from '../components/HeaderDashboard.vue';
import Connection from '~/components/Connection.client.vue'

</script>
<template>
    <Connection>
        <main class="dashboard min-h-screen relative">
            <Aside />
            <HeaderDashboard />
            <section id="dashboard-section" class="[grid-area:section] flex-1 desktop:p-8 ">
                <slot />
            </section>
            <div class="[grid-area:footer] h-auto desktop:pl-0 ">
                <Footer />
            </div>
        </main>
    </Connection>
</template>
<style>
.dashboard {
    display: grid;
    grid-template-areas:
        'section'
        'footer'
        'aside '
    ;
    grid-template-columns: auto;
    grid-template-rows: auto 5rem 64px;
}

@media (width >=834px) {
    .dashboard {
        grid-template-areas:
            'header header header'
            'aside section section'
            'footer footer footer'
        ;
        grid-template-columns: 200px auto auto;
        grid-template-rows: 64px auto 76px;
    }

}
</style>