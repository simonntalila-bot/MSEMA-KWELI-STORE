<template>
    <footer class="footer">
        <div class="container footer-inner">
            <div class="footer-col footer-about">
                <h3 class="footer-brand">🏪 MSEMA KWEL STORE</h3>
                <p class="footer-tagline">{{ i18n.t('footer_tagline') }}</p>
            </div>
            <div class="footer-col">
                <h4>{{ i18n.t('footer_menu') }}</h4>
                <ul>
                    <li><router-link to="/">{{ i18n.t('nav_home') }}</router-link></li>
                    <li><router-link to="/#kuhusu">{{ i18n.t('nav_about') }}</router-link></li>
                    <li><router-link to="/login">Ingia</router-link></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>{{ i18n.t('footer_products') }}</h4>
                <ul>
                    <li><router-link to="/pikipiki">🏍️ Pikipiki</router-link></li>
                    <li><router-link to="/bajaji">🛺 Bajaji</router-link></li>
                    <li><router-link to="/guta">🚜 Guta</router-link></li>
                    <li><router-link to="/magodoro">Magodoro</router-link></li>
                    <li><router-link to="/mabati">🏠 Mabati</router-link></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 MSEMA KWEL STORE. All Rights Reserved.</p>
        </div>
    </footer>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
const i18n = useI18n()
</script>
