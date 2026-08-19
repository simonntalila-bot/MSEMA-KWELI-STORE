<template>
    <section class="pd-section" v-if="product">
        <div class="container pd-container">
            <nav class="pd-breadcrumb">
                <router-link to="/">{{ i18n.t('nav_home') }}</router-link>
                <span class="bc-sep">/</span>
                <router-link :to="'/' + product.categorySlug">{{ product.category }}</router-link>
                <span class="bc-sep">/</span>
                <span class="bc-current">{{ product.brand }} {{ product.name }}</span>
            </nav>

            <div class="pd-hero-img">
                <img :src="product.img" :alt="product.brand + ' ' + product.name">
            </div>

            <div class="pd-info">
                <span class="pd-brand" :style="{ color: product.brandColor }">{{ product.brand }}</span>
                <h1 class="pd-name">{{ product.name }}</h1>
                <p class="pd-price">Tsh {{ product.price.toLocaleString('en-US') }}</p>
                <p class="pd-desc">{{ i18n.t('detail_desc_prefix') }} {{ product.name }} {{ i18n.t('detail_desc_suffix') }}</p>
                <div class="pd-btns">
                    <button class="btn btn-primary" @click="orderNow">{{ i18n.t('order_now') }}</button>
                    <a class="btn btn-whatsapp" :href="whatsappLink" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {{ i18n.t('chat_whatsapp') }}
                    </a>
                </div>
            </div>

            <div class="pd-card pd-features-card" :style="{ borderTopColor: product.brandColor }">
                <h2 class="pd-card-title" :style="{ color: product.brandColor }">{{ i18n.t('detail_about') }}</h2>
                <div class="pd-features">
                    <div class="pd-feature">
                        <span class="pd-feat-check" :style="{ color: product.brandColor }">✓</span>
                        <span><strong>{{ i18n.t('detail_brand') }}:</strong> {{ product.brand }}</span>
                    </div>
                    <div class="pd-feature">
                        <span class="pd-feat-check" :style="{ color: product.brandColor }">✓</span>
                        <span><strong>{{ i18n.t('detail_category') }}:</strong> {{ product.category }}</span>
                    </div>
                    <div class="pd-feature">
                        <span class="pd-feat-check" :style="{ color: product.brandColor }">✓</span>
                        <span><strong>{{ i18n.t('detail_price') }}:</strong> Tsh {{ product.price.toLocaleString('en-US') }}</span>
                    </div>
                    <div class="pd-feature">
                        <span class="pd-feat-check" :style="{ color: product.brandColor }">✓</span>
                        <span>{{ i18n.t('detail_warranty') }}</span>
                    </div>
                    <div class="pd-feature">
                        <span class="pd-feat-check" :style="{ color: product.brandColor }">✓</span>
                        <span>{{ i18n.t('detail_support') }}</span>
                    </div>
                    <div class="pd-feature">
                        <span class="pd-feat-check" :style="{ color: product.brandColor }">✓</span>
                        <span>{{ i18n.t('detail_quality') }}</span>
                    </div>
                    <div class="pd-feature">
                        <span class="pd-feat-check" :style="{ color: product.brandColor }">✓</span>
                        <span>{{ i18n.t('detail_affordable') }}</span>
                    </div>
                </div>
            </div>

            <div class="pd-card pd-desc-card" :style="{ borderTopColor: '#006D3B' }">
                <h2 class="pd-card-title" style="color: var(--primary)">{{ i18n.t('pd_description') }}</h2>
                <p class="pd-block-text">{{ i18n.t('detail_desc_prefix') }} {{ product.brand }} {{ product.name }} {{ i18n.t('detail_desc_suffix') }}</p>
            </div>

            <div class="pd-card pd-specs-card" :style="{ borderTopColor: '#FF6A00' }">
                <h2 class="pd-card-title" style="color: var(--secondary)">{{ i18n.t('pd_specifications') }}</h2>
                <template v-if="product.specs && product.specs.length">
                    <div v-for="group in product.specs" :key="group.group" class="pd-spec-group">
                        <h3 class="pd-spec-group-title" :style="{ color: product.brandColor }">{{ group.group }}</h3>
                        <div class="pd-specs">
                            <div v-for="item in group.items" :key="item.label" class="pd-spec-row">
                                <span class="pd-spec-label">{{ item.label }}</span>
                                <span class="pd-spec-value">{{ item.value }}</span>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="pd-specs">
                        <div class="pd-spec-row">
                            <span class="pd-spec-label">{{ i18n.t('detail_brand') }}</span>
                            <span class="pd-spec-value">{{ product.brand }}</span>
                        </div>
                        <div class="pd-spec-row">
                            <span class="pd-spec-label">{{ i18n.t('detail_category') }}</span>
                            <span class="pd-spec-value">{{ product.category }}</span>
                        </div>
                        <div class="pd-spec-row">
                            <span class="pd-spec-label">{{ i18n.t('detail_price') }}</span>
                            <span class="pd-spec-value">Tsh {{ product.price.toLocaleString('en-US') }}</span>
                        </div>
                        <div class="pd-spec-row">
                            <span class="pd-spec-label">{{ i18n.t('pd_warranty') }}</span>
                            <span class="pd-spec-value">{{ i18n.t('pd_included') }}</span>
                        </div>
                        <div class="pd-spec-row">
                            <span class="pd-spec-label">{{ i18n.t('pd_condition') }}</span>
                            <span class="pd-spec-value">{{ i18n.t('pd_new') }}</span>
                        </div>
                    </div>
                </template>
            </div>

            <div class="pd-back">
                <router-link :to="'/' + product.categorySlug" class="btn btn-outline-dark">← {{ i18n.t('pd_back_shop') }}</router-link>
            </div>
        </div>
    </section>

    <section class="pd-section" v-else>
        <div class="container pd-not-found">
            <h2>{{ i18n.t('pd_not_found') }}</h2>
            <router-link to="/" class="btn btn-primary">{{ i18n.t('nav_home') }}</router-link>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findProduct } from '../data/categories'
import { useI18n } from '../composables/useI18n'
import { eventBus } from '../eventBus'

const i18n = useI18n()
const route = useRoute()

const product = computed(() => findProduct(route.params.id))

const whatsappLink = computed(() => {
    if (!product.value) return '#'
    const msg = encodeURIComponent('Habari, nina maswali kuhusu ' + product.value.brand + ' ' + product.value.name + ' (Tsh ' + product.value.price.toLocaleString('en-US') + ')')
    return 'https://wa.me/255700000000?text=' + msg
})

function orderNow() {
    if (product.value) {
        eventBus.emit('open-order', product.value.name)
    }
}
</script>
