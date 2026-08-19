<template>
    <div>
        <div class="cart-overlay" :class="{ active: cart.isOpen.value }" @click="cart.closeCart()"></div>
        <div class="cart-drawer" :class="{ active: cart.isOpen.value }">
            <!-- STEP 1: CART ITEMS -->
            <template v-if="step === 'cart'">
                <div class="cart-drawer-header">
                    <h3>KIKAPU CHAKO</h3>
                    <button class="cart-close" @click="cart.closeCart()">&times;</button>
                </div>
                <div class="cart-items">
                    <p v-if="cart.cart.value.length === 0" class="cart-empty">Huna bidhaa yoyote kwenye kikapu.</p>
                    <div v-for="item in cart.cart.value" :key="item.product" class="cart-item">
                        <span class="cart-item-emoji">{{ cart.getEmoji(item.product) }}</span>
                        <div class="cart-item-info">
                            <div class="cart-item-name">{{ item.product }}</div>
                            <div class="cart-item-price">{{ cart.formatPrice(item.price) }}</div>
                        </div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" @click="cart.changeQty(item.product, -1)">-</button>
                            <span class="qty-val">{{ item.qty }}</span>
                            <button class="qty-btn" @click="cart.changeQty(item.product, 1)">+</button>
                        </div>
                        <button class="cart-item-remove" @click="handleRemove(item.product)">&#x2715;</button>
                    </div>
                </div>
                <div class="cart-drawer-footer" v-if="cart.cart.value.length > 0">
                    <div class="cart-total">
                        <span>Jumla</span>
                        <strong>{{ cart.formatPrice(cart.totalPrice.value) }}</strong>
                    </div>
                    <button class="btn btn-pay-now btn-block" @click="goToPay">LIPA SASA</button>
                </div>
            </template>

            <!-- STEP 2: PAYMENT FORM -->
            <template v-if="step === 'pay'">
                <div class="cart-drawer-header pay-header">
                    <button class="back-btn" @click="step = 'cart'">&#x2190;</button>
                    <h3>MALIPO</h3>
                    <button class="cart-close" @click="resetCheckout">&times;</button>
                </div>
                <div class="pay-form-body">
                    <div class="pay-total-bar">
                        <span>Jumla ya Kulipa</span>
                        <strong>{{ cart.formatPrice(cart.totalPrice.value) }}</strong>
                    </div>

                    <form @submit.prevent="processPayment" novalidate>
                        <div class="form-group" :class="{ error: pErrors.fullName }">
                            <label>Jina Kamili</label>
                            <input type="text" v-model="payForm.fullName" placeholder="Andika jina lako kamili">
                            <span class="error-msg">Tafadhali weka jina lako kamili.</span>
                        </div>

                        <div class="form-group" :class="{ error: pErrors.payMethod }">
                            <label>Njia ya Malipo</label>
                            <select v-model="payForm.payMethod">
                                <option value="">Chagua njia ya malipo</option>
                                <option value="M-Pesa">M-Pesa</option>
                                <option value="Halo Pesa">Halo Pesa</option>
                                <option value="Mix by Yas">Mix by Yas</option>
                                <option value="Airtel Money">Airtel Money</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank">Benki (Bank)</option>
                            </select>
                            <span class="error-msg">Tafadhali chagua njia ya malipo.</span>
                        </div>

                        <div v-if="payForm.payMethod === 'Bank'" class="form-group" :class="{ error: pErrors.bankName }">
                            <label>Chagua Benki</label>
                            <select v-model="payForm.bankName">
                                <option value="">Chagua benki yako</option>
                                <option value="CRDB Bank">CRDB Bank</option>
                                <option value="NMB Bank">NMB Bank</option>
                                <option value="NBC Bank">NBC Bank</option>
                                <option value="Stanbic Bank">Stanbic Bank</option>
                                <option value="Exim Bank">Exim Bank</option>
                                <option value="TIB Bank">TIB Bank</option>
                                <option value="Azania Bank">Azania Bank</option>
                                <option value="DCB Bank">DCB Bank</option>
                            </select>
                            <span class="error-msg">Tafadhali chagua benki.</span>
                        </div>

                        <div class="form-group">
                            <label>Kiasi (Tsh)</label>
                            <input type="text" :value="cart.formatPrice(cart.totalPrice.value)" readonly class="amount-field">
                        </div>

                        <div class="form-group" :class="{ error: pErrors.phone }">
                            <label>Namba ya Simu</label>
                            <input type="tel" v-model="payForm.phone" placeholder="07XXXXXXXX">
                            <span class="error-msg">Tafadhali weka namba sahihi ya simu.</span>
                        </div>

                        <button type="submit" class="btn btn-pay-now btn-block">THIBITISHA MALIPO</button>
                    </form>
                </div>
            </template>

            <!-- STEP 3: LOADING -->
            <template v-if="step === 'loading'">
                <div class="cart-drawer-header">
                    <h3>INASHUGHULIKIA...</h3>
                </div>
                <div class="loading-body">
                    <div class="spinner"></div>
                    <p class="loading-text">Tafadhali subiri... Muamala wako unashughulikiwa.</p>
                    <p class="loading-sub">{{ payForm.payMethod }} - {{ payForm.phone }}</p>
                </div>
            </template>

            <!-- STEP 4: SUCCESS -->
            <template v-if="step === 'success'">
                <div class="success-body">
                    <div class="success-circle">
                        <div class="success-check">&#x2713;</div>
                    </div>
                    <h2>Muamala Umekamilika!</h2>
                    <p class="success-msg">Muamala wako umekamilika kwenda kwa <strong>MSEMA KWEL STORE</strong></p>
                    <div class="success-details">
                        <div class="success-row"><span>Jina</span><span>{{ payForm.fullName }}</span></div>
                        <div class="success-row"><span>Njia</span><span>{{ payForm.payMethod }}{{ payForm.payMethod === 'Bank' ? ' - ' + payForm.bankName : '' }}</span></div>
                        <div class="success-row"><span>Simu</span><span>{{ payForm.phone }}</span></div>
                        <div class="success-row"><span>Kiasi</span><span>{{ cart.formatPrice(cart.totalPrice.value) }}</span></div>
                    </div>
                    <button class="btn btn-primary btn-block" @click="resetCheckout">Funga</button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCart } from '../composables/useCart'
import { useToast } from '../composables/useToast'

const cart = useCart()
const { showToast } = useToast()

const step = ref('cart')

const payForm = reactive({ fullName: '', payMethod: '', bankName: '', phone: '' })
const pErrors = reactive({ fullName: false, payMethod: false, bankName: false, phone: false })

function goToPay() {
    if (cart.cart.value.length === 0) return
    step.value = 'pay'
}

function processPayment() {
    pErrors.fullName = !payForm.fullName.trim()
    pErrors.payMethod = !payForm.payMethod.trim()
    pErrors.bankName = payForm.payMethod === 'Bank' && !payForm.bankName.trim()
    pErrors.phone = !payForm.phone.trim() || payForm.phone.length < 10

    if (Object.values(pErrors).some(e => e)) return

    step.value = 'loading'

    setTimeout(() => {
        step.value = 'success'
    }, 3000)
}

function handleRemove(product) {
    cart.removeFromCart(product)
    showToast(product + ' imeondolewa.')
}

function resetCheckout() {
    cart.closeCart()
    setTimeout(() => {
        step.value = 'cart'
        payForm.fullName = ''
        payForm.payMethod = ''
        payForm.bankName = ''
        payForm.phone = ''
        Object.keys(pErrors).forEach(k => pErrors[k] = false)
    }, 300)
}
</script>

<style scoped>
.cart-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    z-index: 200; display: none; backdrop-filter: blur(2px);
}
.cart-overlay.active { display: block; }
.cart-drawer {
    position: fixed; top: 0; right: -420px; bottom: 0;
    width: 400px; max-width: 100vw;
    background: #fff; z-index: 210;
    display: flex; flex-direction: column;
    box-shadow: -4px 0 24px rgba(0,0,0,0.15);
    transition: right 0.3s ease;
}
.cart-drawer.active { right: 0; }

.cart-drawer-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 20px; border-bottom: 1px solid #E5E5E5;
    background: #fff;
}
.cart-drawer-header h3 { font-size: 1rem; font-weight: 800; color: #17231F; }
.cart-close {
    background: none; border: none; font-size: 1.5rem; color: #999;
    padding: 4px; transition: color 0.2s; cursor: pointer;
}
.cart-close:hover { color: #333; }

.pay-header { gap: 10px; }
.back-btn {
    background: none; border: none; font-size: 1.2rem; color: #00C853;
    cursor: pointer; font-weight: 700; padding: 4px 8px; border-radius: 6px;
    transition: background 0.2s;
}
.back-btn:hover { background: #E6F5ED; }

.cart-items { flex: 1; overflow-y: auto; padding: 12px 20px; }
.cart-empty { text-align: center; color: #999; font-size: 0.88rem; padding: 40px 0; }
.cart-item {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 0; border-bottom: 1px solid #E5E5E5;
}
.cart-item-emoji { font-size: 1.4rem; }
.cart-item-info { flex: 1; }
.cart-item-name { font-size: 0.82rem; font-weight: 600; color: #17231F; }
.cart-item-price { font-size: 0.75rem; color: #00C853; font-weight: 600; }
.cart-item-qty { display: flex; align-items: center; gap: 6px; }
.qty-btn {
    width: 26px; height: 26px;
    border: 1px solid #E5E5E5; border-radius: 4px;
    background: #F5F5F5; font-size: 0.85rem; font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.2s;
}
.qty-btn:hover { background: #E6F5ED; border-color: #00C853; }
.qty-val { font-size: 0.85rem; font-weight: 600; min-width: 20px; text-align: center; }
.cart-item-remove {
    background: none; border: none; color: #ccc; font-size: 0.8rem;
    cursor: pointer; transition: color 0.2s; padding: 4px;
}
.cart-item-remove:hover { color: #E53935; }

.cart-drawer-footer {
    padding: 16px 20px; border-top: 1px solid #E5E5E5;
    background: #fff;
}
.cart-total {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 12px; font-size: 0.95rem; color: #17231F;
}
.cart-total strong { font-size: 1.1rem; color: #00C853; }
.btn-pay-now {
    width: 100%; padding: 13px; font-size: 0.95rem; font-weight: 700;
    border: none; border-radius: 8px; cursor: pointer;
    background: #00C853; color: #fff; letter-spacing: 0.5px;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}
.btn-pay-now:hover { background: #00A844; box-shadow: 0 4px 14px rgba(0,200,83,0.3); }
.btn-pay-now:active { transform: scale(0.98); }
.btn-pay-now:disabled { background: #ccc; cursor: not-allowed; }
.btn-block { width: 100%; display: block; }
.btn-primary { background: #00C853; color: #fff; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: background 0.2s; }
.btn-primary:hover { background: #00A844; }

/* PAY FORM */
.pay-form-body {
    flex: 1; overflow-y: auto; padding: 0 20px 20px;
}
.pay-total-bar {
    display: flex; justify-content: space-between; align-items: center;
    background: #17231F; color: #fff;
    padding: 14px 16px; border-radius: 10px; margin: 16px 0;
}
.pay-total-bar span { font-size: 0.82rem; font-weight: 500; opacity: 0.8; }
.pay-total-bar strong { font-size: 1.15rem; font-weight: 800; color: #00C853; }

.pay-form-body .form-group {
    margin-bottom: 14px;
}
.pay-form-body label {
    display: block; font-size: 0.75rem; font-weight: 700; color: #17231F;
    margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.3px;
}
.pay-form-body input, .pay-form-body select {
    width: 100%; padding: 11px 14px; font-size: 0.88rem; font-family: inherit;
    border: 1.5px solid #E5E5E5; border-radius: 8px;
    background: #FAFAFA; color: #17231F; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.pay-form-body input:focus, .pay-form-body select:focus {
    border-color: #00C853; box-shadow: 0 0 0 3px rgba(0,200,83,0.1);
}
.pay-form-body input::placeholder { color: #bbb; }
.amount-field { background: #E6F5ED !important; color: #00A844 !important; font-weight: 700 !important; border-color: #00C853 !important; cursor: default; }
.error-msg { display: none; font-size: 0.7rem; color: #E53935; margin-top: 4px; }
.form-group.error input, .form-group.error select { border-color: #E53935; }
.form-group.error .error-msg { display: block; }

/* LOADING */
.loading-body {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 40px 20px; text-align: center;
}
.spinner {
    width: 48px; height: 48px; border: 4px solid #E5E5E5;
    border-top-color: #00C853; border-radius: 50%;
    animation: spin 0.8s linear infinite; margin-bottom: 20px;
}
@keyframes spin { to { transform: rotate(360deg); } }
.loading-text { font-size: 0.9rem; font-weight: 600; color: #17231F; margin-bottom: 6px; }
.loading-sub { font-size: 0.78rem; color: #999; }

/* SUCCESS */
.success-body {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 32px 24px; text-align: center;
}
.success-circle {
    width: 90px; height: 90px; border-radius: 50%;
    background: #00C853; display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
    animation: popIn 0.5s cubic-bezier(0.17, 0.67, 0.21, 1.69);
    box-shadow: 0 8px 32px rgba(0,200,83,0.35);
}
.success-check {
    font-size: 2.8rem; color: #fff; font-weight: 900; line-height: 1;
}
@keyframes popIn {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
.success-body h2 {
    font-size: 1.2rem; font-weight: 800; color: #17231F; margin-bottom: 8px;
}
.success-msg {
    font-size: 0.85rem; color: #666; margin-bottom: 20px; line-height: 1.5;
}
.success-msg strong { color: #00C853; }
.success-details {
    width: 100%; background: #F8FFF8; border: 1px solid #C8E6C9;
    border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;
}
.success-row {
    display: flex; justify-content: space-between; padding: 6px 0;
    font-size: 0.82rem; border-bottom: 1px solid #E8F5E9;
}
.success-row:last-child { border-bottom: none; }
.success-row span:first-child { color: #999; font-weight: 500; }
.success-row span:last-child { color: #17231F; font-weight: 700; }

@media (max-width: 480px) {
    .cart-drawer { width: 100vw; }
    .pay-form-body { padding: 0 14px 14px; }
    .success-body { padding: 24px 16px; }
    .success-circle { width: 72px; height: 72px; }
    .success-check { font-size: 2.2rem; }
}
</style>
