<template>
    <section class="pk-section">
        <div class="container">
            <div class="pk-header">
                <h1 class="pk-title">{{ catData.emoji }} {{ catData.title }}</h1>
                <p class="pk-subtitle">{{ catData.subtitle }}</p>
                <div class="pk-divider"></div>
            </div>

            <div class="brand-selector">
                <button
                    v-for="(brand, key) in catData.brands"
                    :key="key"
                    class="brand-card"
                    :class="{ active: activeBrand === key }"
                    @click="activeBrand = key"
                >
                    <div class="brand-logo" :style="activeBrand === key ? { background: brand.color, color: '#fff' } : {}">{{ brand.name.charAt(0) }}</div>
                    <span>{{ brand.name }}</span>
                </button>
            </div>

            <div v-if="activeBrandData" class="brand-section">
                <div class="brand-section-header">
                    <div class="brand-section-name">
                        <span class="dot" :style="{ background: activeBrandData.color }"></span>
                        {{ activeBrandData.name }}
                    </div>
                    <span class="brand-section-link">{{ i18n.t('view_all') }} →</span>
                </div>
                <div class="models-grid">
                    <div v-for="model in activeBrandData.models" :key="model.name" class="model-card-wrap">
                        <div class="model-card">
                            <div class="model-img">
                                <img :src="model.img" :alt="activeBrandData.name + ' ' + model.name" loading="lazy">
                            </div>
                            <div class="model-body">
                                <span class="model-brand-tag">{{ activeBrandData.name }}</span>
                                <h3 class="model-name">{{ model.name }}</h3>
                                <p class="model-price">Tsh {{ model.price.toLocaleString('en-US') }}</p>
                            </div>
                        </div>
                        <div class="model-card-actions">
                            <a class="view-more-link" @click.prevent="openDetail(model)">{{ i18n.t('view_more_details') }}</a>
                            <button class="btn btn-sm btn-primary" @click="orderNow(model)">{{ i18n.t('order_now') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories } from '../data/categories'
import { useI18n } from '../composables/useI18n'
import { eventBus } from '../eventBus'

const i18n = useI18n()
const route = useRoute()
const router = useRouter()
const activeBrand = ref('')

const catData = computed(() => categories[route.params.category] || categories.pikipiki)

watch(catData, (data) => {
    const keys = Object.keys(data.brands)
    if (keys.length && !keys.includes(activeBrand.value)) {
        activeBrand.value = keys[0]
    }
}, { immediate: true })

const activeBrandData = computed(() => catData.value.brands[activeBrand.value] || null)

function openDetail(model) {
    router.push('/product/' + model.id)
}

function orderNow(model) {
    eventBus.emit('open-order', model.name)
}
</script>
