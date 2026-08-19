import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import LoginPage from './views/LoginPage.vue'
import CategoryPage from './views/CategoryPage.vue'
import ProductDetailPage from './views/ProductDetailPage.vue'
import './styles.css'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage },
        { path: '/product/:id', component: ProductDetailPage },
        { path: '/:category(pikipiki|bajaji|guta|magodolo|mabati)', component: CategoryPage }
    ],
    scrollBehavior() { return { top: 0 } }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
