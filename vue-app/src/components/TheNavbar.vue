<template>
    <header class="navbar" :class="{ scrolled: isScrolled }">
        <div class="container navbar-inner">
            <a href="/" class="navbar-brand">
                <span class="brand-icon">🏪</span>
                <div class="brand-text">
                    <span class="brand-name">MSEMA KWEL STORE</span>
                    <span class="brand-tagline">{{ i18n.t('tagline') }}</span>
                </div>
            </a>

            <nav class="navbar-links" :class="{ active: mobileOpen }">
                <router-link to="/" class="nav-link" @click="mobileOpen = false">{{ i18n.t('nav_home') }}</router-link>

                <div class="nav-dropdown" :class="{ open: dropdownOpen }">
                    <button class="nav-link nav-link-dropdown" @click="toggleDropdown">
                        {{ i18n.t('nav_products') }}
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div class="dropdown-menu">
                        <div class="dropdown-col">
                            <h4 class="dropdown-title">{{ i18n.t('cat_vehicles') }}</h4>
                            <router-link to="/pikipiki" class="dropdown-item" @click="closeMenus">
                                <span>🏍️</span> Pikipiki
                            </router-link>
                            <router-link to="/bajaji" class="dropdown-item" @click="closeMenus">
                                <span>🛺</span> Bajaji
                            </router-link>
                            <router-link to="/guta" class="dropdown-item" @click="closeMenus">
                                <span>🚜</span> Guta
                            </router-link>
                        </div>
                        <div class="dropdown-col">
                            <h4 class="dropdown-title">{{ i18n.t('cat_materials') }}</h4>
                            <router-link to="/magodoro" class="dropdown-item" @click="closeMenus">
                                <span>🛏️</span> Magodoro
                            </router-link>
                            <router-link to="/mabati" class="dropdown-item" @click="closeMenus">
                                <span>🏠</span> Mabati
                            </router-link>
                        </div>
                    </div>
                </div>

                <router-link to="/#kuhusu" class="nav-link" @click="mobileOpen = false">{{ i18n.t('nav_about') }}</router-link>
            </nav>

            <div class="navbar-actions">
                <router-link to="/login" class="nav-link btn-login-nav" @click="mobileOpen = false">Ingia</router-link>
                <button class="lang-switch" @click="i18n.toggleLang()">
                    <span>{{ i18n.langFlag.value }}</span>
                    <span>{{ i18n.langLabel.value }}</span>
                </button>
                <button class="hamburger" :class="{ active: mobileOpen }" @click="mobileOpen = !mobileOpen">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const i18n = useI18n()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const dropdownOpen = ref(false)

function handleScroll() {
    isScrolled.value = window.scrollY > 10
}

function toggleDropdown() {
    if (window.innerWidth <= 768) {
        dropdownOpen.value = !dropdownOpen.value
    }
}

function closeMenus() {
    mobileOpen.value = false
    dropdownOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
