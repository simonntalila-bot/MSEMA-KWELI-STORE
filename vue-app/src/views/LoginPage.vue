<template>
    <div>
        <div class="top-banner">
            <h1>WELCOME TO MSEMA KWEL STORE</h1>
        </div>

        <div class="login-wrapper">
            <div class="login-card">
                <div class="login-header">
                    <span class="store-icon">🏪</span>
                    <h2>Ingia kwenye Akaunti</h2>
                    <p>Weka taarifa zako kuingia</p>
                </div>

                <div class="login-body">
                    <form v-if="!success" @submit.prevent="handleLogin" novalidate>
                        <div class="form-group" :class="{ error: errors.email }">
                            <label>Barua Pepe (Email)</label>
                            <div class="input-icon-wrap">
                                <span class="input-icon">📧</span>
                                <input type="email" v-model="form.email" placeholder="Andika barua pepe yako">
                            </div>
                            <span class="error-msg">Tafadhali weka barua pepe sahihi.</span>
                        </div>

                        <div class="form-group" :class="{ error: errors.password }">
                            <label>Nenosiri (Password)</label>
                            <div class="input-icon-wrap">
                                <span class="input-icon">🔒</span>
                                <input type="password" v-model="form.password" placeholder="Andika nenosiri lako">
                            </div>
                            <span class="error-msg">Tafadhali weka nenosiri lako.</span>
                        </div>

                        <div class="form-options">
                            <label class="remember-me">
                                <input type="checkbox" v-model="form.remember"> Nikumbuke
                            </label>
                            <a href="#" class="forgot-link" @click.prevent="alert('Wasiliana na admin kwa msaada.')">Umesahau nenosiri?</a>
                        </div>

                        <button type="submit" class="btn-login">INGIA</button>
                    </form>

                    <template v-if="!success">
                        <div class="divider">au</div>
                        <div class="social-login">
                            <button class="btn-social" @click="alert('Kipengele hiki kinakaribishwa hivi karibuni!')">
                                <span class="social-icon">📱</span> WhatsApp
                            </button>
                            <button class="btn-social" @click="alert('Kipengele hiki kinakaribishwa hivi karibuni!')">
                                <span class="social-icon">🌐</span> Google
                            </button>
                        </div>
                    </template>

                    <div v-if="success" class="success-msg active">
                        <span class="check-icon">✓</span>
                        <h3>Umefanikiwa Kuingia!</h3>
                        <p>Karibu MSEMA KWEL STORE. Utaelekezwa hivi karibuni...</p>
                    </div>
                </div>

                <div class="login-footer">
                    Huna akaunti? <a href="#" @click.prevent="alert('Wasiliana na admin kuunda akaunti mpya.')">Jiunge Sasa</a>
                </div>
            </div>
        </div>

        <div class="store-footer">
            &copy; 2026 MSEMA KWEL STORE. All Rights Reserved.
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ email: '', password: '', remember: false })
const errors = reactive({ email: false, password: false })
const success = ref(false)

function handleLogin() {
    errors.email = !form.email.trim() || !form.email.includes('@')
    errors.password = !form.password.trim()
    if (errors.email || errors.password) return

    success.value = true
    setTimeout(() => router.push('/'), 2000)
}
</script>

<style scoped>
.top-banner {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: #fff;
    text-align: center;
    padding: 14px 0;
}
.top-banner h1 {
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.login-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;
    min-height: calc(100vh - 200px);
}

.login-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 420px;
    overflow: hidden;
}

.login-header {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: #fff;
    text-align: center;
    padding: 32px 24px 28px;
}
.login-header .store-icon {
    font-size: 3rem;
    margin-bottom: 10px;
    display: block;
}
.login-header h2 {
    font-size: 1.3rem;
    font-weight: 800;
    margin-bottom: 4px;
}
.login-header p {
    font-size: 0.82rem;
    opacity: 0.85;
}

.login-body {
    padding: 28px 24px 24px;
}

.form-group {
    margin-bottom: 16px;
}
.form-group label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 6px;
}
.form-group input {
    width: 100%;
    padding: 12px 14px;
    font-size: 0.9rem;
    font-family: inherit;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-xs);
    background: var(--bg);
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.form-group input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37,167,119,0.1);
}
.form-group input::placeholder { color: var(--text3); }

.input-icon-wrap {
    position: relative;
}
.input-icon-wrap .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    pointer-events: none;
}
.input-icon-wrap input {
    padding-left: 42px;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 0.78rem;
}
.remember-me {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: var(--text2);
}
.remember-me input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--primary);
    cursor: pointer;
}
.forgot-link {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
}
.forgot-link:hover { color: var(--primary-dark); }

.btn-login {
    width: 100%;
    padding: 13px;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: inherit;
    border: none;
    border-radius: var(--radius-sm);
    background: var(--primary);
    color: #fff;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
    letter-spacing: 0.3px;
}
.btn-login:hover {
    background: var(--primary-dark);
    box-shadow: 0 4px 14px rgba(37,167,119,0.3);
}
.btn-login:active { transform: scale(0.98); }

.divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    font-size: 0.75rem;
    color: var(--text3);
}
.divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
}

.social-login {
    display: flex;
    gap: 10px;
}
.btn-social {
    flex: 1;
    padding: 11px;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: inherit;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--card);
    color: var(--text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: border-color 0.2s, background 0.2s;
}
.btn-social:hover {
    border-color: var(--primary);
    background: var(--primary-light);
}
.btn-social .social-icon { font-size: 1.1rem; }

.login-footer {
    text-align: center;
    padding: 16px 24px 24px;
    font-size: 0.82rem;
    color: var(--text2);
}
.login-footer a {
    color: var(--primary);
    font-weight: 700;
    text-decoration: none;
}
.login-footer a:hover { color: var(--primary-dark); }

.error-msg {
    display: none;
    font-size: 0.72rem;
    color: var(--primary);
    margin-top: 4px;
}
.form-group.error input { border-color: var(--primary); }
.form-group.error .error-msg { display: block; }

.success-msg {
    display: none;
    text-align: center;
    padding: 20px 0 0;
}
.success-msg.active { display: block; }
.success-msg .check-icon {
    font-size: 2.5rem;
    color: var(--success);
    display: block;
    margin-bottom: 8px;
}
.success-msg h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
}
.success-msg p {
    font-size: 0.82rem;
    color: var(--text2);
}

.store-footer {
    text-align: center;
    padding: 16px;
    font-size: 0.7rem;
    color: var(--text3);
    border-top: 1px solid var(--border);
    background: var(--card);
}

@media (max-width: 480px) {
    .top-banner h1 { font-size: 0.9rem; letter-spacing: 1px; }
    .login-header { padding: 24px 16px 20px; }
    .login-body { padding: 20px 16px 16px; }
    .social-login { flex-direction: column; }
}
</style>
