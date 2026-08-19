<template>
    <div class="app">
        <TheNavbar v-if="!isLoginPage" />
        <router-view />
        <TheFooter v-if="!isLoginPage" />
        <CartDrawer v-if="!isLoginPage" />
        <OrderModal />
        <TheToast />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import CartDrawer from './components/CartDrawer.vue'
import OrderModal from './components/OrderModal.vue'
import TheToast from './components/TheToast.vue'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
</script>
