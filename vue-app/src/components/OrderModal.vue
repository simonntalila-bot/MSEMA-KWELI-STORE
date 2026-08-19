<template>
    <div class="modal-overlay" :class="{ active: showModal }" @click.self="closeModal">
        <div class="modal order-modal">
            <button class="modal-close" @click="closeModal">&times;</button>

            <div v-if="!submitted" class="order-form-wrap">
                <h2 class="order-modal-title">{{ i18n.t('order_title') }}</h2>
                <p class="order-product-name">{{ productName }}</p>

                <form class="order-form" @submit.prevent="handleSubmit" novalidate>
                    <div class="form-group" :class="{ error: errors.name }">
                        <label>{{ i18n.t('form_name') }}</label>
                        <input type="text" v-model="form.name" :placeholder="i18n.t('form_name')">
                        <span class="error-msg">{{ i18n.t('err_name') }}</span>
                    </div>
                    <div class="form-group" :class="{ error: errors.phone }">
                        <label>{{ i18n.t('form_phone') }}</label>
                        <input type="tel" v-model="form.phone" placeholder="07XXXXXXXX">
                        <span class="error-msg">{{ i18n.t('err_phone') }}</span>
                    </div>
                    <div class="form-group" :class="{ error: errors.location }">
                        <label>{{ i18n.t('form_location') }}</label>
                        <input type="text" v-model="form.location" :placeholder="i18n.t('form_location_ph')">
                        <span class="error-msg">{{ i18n.t('err_location') }}</span>
                    </div>
                    <div class="form-group" :class="{ error: errors.quantity }">
                        <label>{{ i18n.t('form_quantity') }}</label>
                        <input type="number" v-model="form.quantity" min="1" max="100" placeholder="1">
                        <span class="error-msg">{{ i18n.t('err_quantity') }}</span>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block order-submit-btn" :disabled="loading">
                        <span v-if="loading" class="order-spinner"></span>
                        {{ loading ? i18n.t('order_sending') : i18n.t('order_submit') }}
                    </button>
                </form>
            </div>

            <div v-if="submitted" class="order-success">
                <div class="order-success-icon">✓</div>
                <h3>{{ i18n.t('order_success_title') }}</h3>
                <p>{{ i18n.t('order_success_desc') }}</p>
                <button class="btn btn-primary" @click="closeModal">{{ i18n.t('order_close') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { eventBus } from '../eventBus'
import { useToast } from '../composables/useToast'

const i18n = useI18n()
const { showToast } = useToast()

const showModal = ref(false)
const productName = ref('')
const submitted = ref(false)
const loading = ref(false)
const form = reactive({ name: '', phone: '', location: '', quantity: 1 })
const errors = reactive({ name: false, phone: false, location: false, quantity: false })

function openModal(name) {
    productName.value = name
    submitted.value = false
    loading.value = false
    form.name = ''
    form.phone = ''
    form.location = ''
    form.quantity = 1
    errors.name = false
    errors.phone = false
    errors.location = false
    errors.quantity = false
    showModal.value = true
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    showModal.value = false
    document.body.style.overflow = ''
}

async function handleSubmit() {
    errors.name = !form.name.trim()
    errors.phone = !form.phone.trim()
    errors.location = !form.location.trim()
    errors.quantity = !form.quantity || form.quantity < 1
    if (Object.values(errors).some(e => e)) return

    loading.value = true
    try {
        const resp = await fetch('http://localhost:8000/api/submit-order/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name.trim(),
                phone: form.phone.trim(),
                product_name: productName.value,
                quantity: Number(form.quantity),
                message: 'Location: ' + form.location.trim()
            })
        })
        const data = await resp.json()
        if (data.success) {
            submitted.value = true
            showToast(i18n.t('order_toast_success'))
        } else {
            showToast(i18n.t('order_toast_error'))
        }
    } catch (e) {
        submitted.value = true
        showToast(i18n.t('order_toast_offline'))
    } finally {
        loading.value = false
    }
}

function handleKeydown(e) {
    if (e.key === 'Escape') closeModal()
}

function onOrder(name) { openModal(name) }

onMounted(() => {
    eventBus.on('open-order', onOrder)
    document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
    eventBus.off('open-order', onOrder)
    document.removeEventListener('keydown', handleKeydown)
})
</script>
