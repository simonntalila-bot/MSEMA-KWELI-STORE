<template>
    <section class="section why-us">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">{{ i18n.t('why_title') }}</h2>
            </div>
            <div class="why-grid">
                <div class="why-card">
                    <div class="why-icon-wrap"><span class="why-icon">✓</span></div>
                    <h3>{{ i18n.t('why_trust_title') }}</h3>
                    <p>{{ i18n.t('why_trust_desc') }}</p>
                </div>
                <div class="why-card">
                    <div class="why-icon-wrap"><span class="why-icon">⚡</span></div>
                    <h3>{{ i18n.t('why_fast_title') }}</h3>
                    <p>{{ i18n.t('why_fast_desc') }}</p>
                </div>
                <div class="why-card">
                    <div class="why-icon-wrap"><span class="why-icon">🤝</span></div>
                    <h3>{{ i18n.t('why_service_title') }}</h3>
                    <p>{{ i18n.t('why_service_desc') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
const i18n = useI18n()
</script>
