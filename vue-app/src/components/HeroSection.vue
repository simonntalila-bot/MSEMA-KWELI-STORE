<template>
    <section class="hero" id="home">
        <div class="hero-slide active">
            <img src="/hero.jpg" alt="MSEMA KWEL STORE" class="hero-bg-img">
            <div class="hero-overlay"></div>
            <div class="container hero-inner">
                <p class="hero-subtitle">{{ i18n.t('hero_subtitle') }}</p>
                <div class="hero-categories">
                    <router-link
                        v-for="cat in categoryList"
                        :key="cat.slug"
                        :to="'/' + cat.slug"
                        :class="['hero-cat-card', cat.color]"
                    >
                        <span class="cat-name">{{ cat.name }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { categoryList } from '../data/categories'
const i18n = useI18n()
</script>
