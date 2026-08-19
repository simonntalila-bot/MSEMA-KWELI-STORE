<template>
    <section class="section about" id="kuhusu">
        <div class="container about-inner">
            <div class="about-content">
                <h2 class="section-title">{{ i18n.t('about_title') }}</h2>
                <p class="about-text">{{ i18n.t('about_desc') }}</p>
                <a href="#wasiliana" class="btn btn-primary">{{ i18n.t('cta_contact2') }}</a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
const i18n = useI18n()
</script>
