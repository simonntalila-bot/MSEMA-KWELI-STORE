<template>
    <div class="modal-overlay" :class="{ active: showModal }" @click.self="closeModal">
        <div class="modal">
            <button class="modal-close" @click="closeModal">&times;</button>
            <h2 class="modal-title">{{ i18n.t('modal_title') }} {{ productName }}</h2>
            <form v-if="!submitted" class="modal-form" @submit.prevent="handleSubmit" novalidate>
                <div class="form-group" :class="{ error: errors.fname }">
                    <label>{{ i18n.t('form_name') }}</label>
                    <input type="text" v-model="form.fname" :placeholder="i18n.t('form_name')">
                    <span class="error-msg">{{ i18n.t('err_name') }}</span>
                </div>
                <div class="form-group" :class="{ error: errors.phone }">
                    <label>{{ i18n.t('form_phone') }}</label>
                    <input type="tel" v-model="form.phone" placeholder="07XXXXXXXX">
                    <span class="error-msg">{{ i18n.t('err_phone') }}</span>
                </div>
                <div class="form-group">
                    <label>{{ i18n.t('form_product') }}</label>
                    <input type="text" :value="productName" readonly>
                </div>
                <div class="form-group" :class="{ error: errors.message }">
                    <label>{{ i18n.t('form_message') }}</label>
                    <textarea v-model="form.message" rows="3" :placeholder="i18n.t('form_message')"></textarea>
                    <span class="error-msg">{{ i18n.t('err_message') }}</span>
                </div>
                <button type="submit" class="btn btn-primary btn-block">{{ i18n.t('btn_submit') }}</button>
            </form>
            <div v-if="submitted" class="form-success active">
                <span class="success-check">✓</span>
                <h3>{{ i18n.t('success_title') }}</h3>
                <p>{{ i18n.t('success_desc') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { eventBus } from '../eventBus'

const i18n = useI18n()

const showModal = ref(false)
const productName = ref('')
const submitted = ref(false)
const form = reactive({ fname: '', phone: '', message: '' })
const errors = reactive({ fname: false, phone: false, message: false })

function openModal(name) {
    productName.value = name
    submitted.value = false
    form.fname = ''
    form.phone = ''
    form.message = ''
    errors.fname = false
    errors.phone = false
    errors.message = false
    showModal.value = true
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    showModal.value = false
    document.body.style.overflow = ''
}

function handleSubmit() {
    errors.fname = !form.fname.trim()
    errors.phone = !form.phone.trim()
    errors.message = !form.message.trim()
    if (Object.values(errors).some(e => e)) return
    submitted.value = true
}

function handleKeydown(e) {
    if (e.key === 'Escape') closeModal()
}

function onInquiry(name) { openModal(name) }

onMounted(() => {
    eventBus.on('open-inquiry', onInquiry)
    document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
    eventBus.off('open-inquiry', onInquiry)
    document.removeEventListener('keydown', handleKeydown)
})
</script>
