<template>
    <section class="section contact" id="wasiliana">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">{{ i18n.t('contact_title') }}</h2>
                <p class="section-subtitle">{{ i18n.t('contact_subtitle') }}</p>
            </div>
            <div class="contact-layout">
                <div class="contact-info">
                    <div class="contact-item">
                        <div class="contact-icon-wrap"><span>📞</span></div>
                        <div>
                            <h3>{{ i18n.t('contact_phone') }}</h3>
                            <p>{{ i18n.t('contact_phone_val') }}</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon-wrap"><span>💬</span></div>
                        <div>
                            <h3>WhatsApp</h3>
                            <p>{{ i18n.t('contact_whatsapp') }}</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon-wrap"><span>📍</span></div>
                        <div>
                            <h3>{{ i18n.t('contact_location') }}</h3>
                            <p>{{ i18n.t('contact_location_val') }}</p>
                        </div>
                    </div>
                </div>
                <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
                    <div class="form-row">
                        <div class="form-group" :class="{ error: errors.cName }">
                            <label>{{ i18n.t('form_name') }}</label>
                            <input type="text" v-model="form.cName" :placeholder="i18n.t('form_name')">
                            <span class="error-msg">{{ i18n.t('err_name') }}</span>
                        </div>
                        <div class="form-group" :class="{ error: errors.cPhone }">
                            <label>{{ i18n.t('form_phone') }}</label>
                            <input type="tel" v-model="form.cPhone" placeholder="07XXXXXXXX">
                            <span class="error-msg">{{ i18n.t('err_phone') }}</span>
                        </div>
                    </div>
                    <div class="form-group" :class="{ error: errors.cProduct }">
                        <label>{{ i18n.t('form_product') }}</label>
                        <select v-model="form.cProduct">
                            <option value="">{{ i18n.t('form_select') }}</option>
                            <option value="Pikipiki">Pikipiki</option>
                            <option value="Bajaji">Bajaji</option>
                            <option value="Guta">Guta</option>
                            <option value="Magodolo">Magodolo</option>
                            <option value="Mabati">Mabati</option>
                        </select>
                        <span class="error-msg">{{ i18n.t('err_product') }}</span>
                    </div>
                    <div class="form-group" :class="{ error: errors.cMessage }">
                        <label>{{ i18n.t('form_message') }}</label>
                        <textarea v-model="form.cMessage" rows="4" :placeholder="i18n.t('form_message')"></textarea>
                        <span class="error-msg">{{ i18n.t('err_message') }}</span>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">{{ i18n.t('btn_submit') }}</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'

const i18n = useI18n()
const { showToast } = useToast()

const form = reactive({ cName: '', cPhone: '', cProduct: '', cMessage: '' })
const errors = reactive({ cName: false, cPhone: false, cProduct: false, cMessage: false })

function handleSubmit() {
    errors.cName = !form.cName.trim()
    errors.cPhone = !form.cPhone.trim()
    errors.cProduct = !form.cProduct.trim()
    errors.cMessage = !form.cMessage.trim()

    if (Object.values(errors).some(e => e)) return

    showToast(i18n.currentLang.value === 'sw' ? 'Maombi yako yametumwa!' : 'Your inquiry has been sent!')
    form.cName = ''
    form.cPhone = ''
    form.cProduct = ''
    form.cMessage = ''
}
</script>
