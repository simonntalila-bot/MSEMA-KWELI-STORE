<template>
    <div class="modal-overlay" :class="{ active: showModal }" @click.self="closeModal">
        <div class="modal detail-modal">
            <button class="modal-close" @click="closeModal">&times;</button>
            <div class="detail-content" v-if="product">
                <div class="detail-img">
                    <img :src="product.img" :alt="product.brand + ' ' + product.name">
                </div>
                <div class="detail-info">
                    <span class="detail-brand-tag" :style="{ color: product.brandColor, background: product.brandColor + '12' }">{{ product.brand }}</span>
                    <h2 class="detail-name">{{ product.name }}</h2>
                    <p class="detail-price">Tsh {{ product.price.toLocaleString('en-US') }}</p>
                    <div class="detail-desc">
                        <h4>{{ i18n.t('detail_about') }}</h4>
                        <p>{{ i18n.t('detail_desc_prefix') }} {{ product.name }} {{ i18n.t('detail_desc_suffix') }}</p>
                        <ul class="detail-features">
                            <li>{{ i18n.t('detail_brand') }}: {{ product.brand }}</li>
                            <li>{{ i18n.t('detail_category') }}: {{ product.category }}</li>
                            <li>{{ i18n.t('detail_price') }}: Tsh {{ product.price.toLocaleString('en-US') }}</li>
                            <li>{{ i18n.t('detail_warranty') }}</li>
                            <li>{{ i18n.t('detail_support') }}</li>
                        </ul>
                    </div>
                    <div class="detail-actions">
                        <button class="btn btn-primary btn-block" @click="orderNow">{{ i18n.t('order_now') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { eventBus } from '../eventBus'

const i18n = useI18n()
const showModal = ref(false)
const product = ref(null)

function openModal(data) {
    product.value = data
    showModal.value = true
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    showModal.value = false
    product.value = null
    document.body.style.overflow = ''
}

function orderNow() {
    if (product.value) {
        eventBus.emit('open-inquiry', product.value.name)
        closeModal()
    }
}

function handleKeydown(e) {
    if (e.key === 'Escape') closeModal()
}

onMounted(() => {
    eventBus.on('open-detail', openModal)
    document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
    eventBus.off('open-detail', openModal)
    document.removeEventListener('keydown', handleKeydown)
})
</script>
