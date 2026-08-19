import { ref, computed } from 'vue'

const cart = ref(JSON.parse(localStorage.getItem('msemakwel_cart') || '[]'))
const isOpen = ref(false)

const productEmojis = {
    Pikipiki: '\uD83C\uDFCD\uFE0F',
    Bajaji: '\uD83D\uDEBA',
    Guta: '\uD83D\uDE9C',
    Magodolo: '\uD83E\uDEB5',
    Mabati: '\uD83C\uDFE0'
}

function saveCart() {
    localStorage.setItem('msemakwel_cart', JSON.stringify(cart.value))
}

function formatPrice(n) {
    return 'Tsh ' + Number(n).toLocaleString('en-US')
}

export function useCart() {
    const totalItems = computed(() => cart.value.reduce((s, c) => s + c.qty, 0))
    const totalPrice = computed(() => cart.value.reduce((s, c) => s + c.price * c.qty, 0))

    function addToCart(product, price) {
        const existing = cart.value.find(c => c.product === product)
        if (existing) {
            existing.qty += 1
        } else {
            cart.value.push({ product, price, qty: 1 })
        }
        saveCart()
    }

    function removeFromCart(product) {
        cart.value = cart.value.filter(c => c.product !== product)
        saveCart()
    }

    function changeQty(product, delta) {
        const item = cart.value.find(c => c.product === product)
        if (!item) return
        item.qty += delta
        if (item.qty <= 0) {
            removeFromCart(product)
            return
        }
        saveCart()
    }

    function openCart() { isOpen.value = true }
    function closeCart() { isOpen.value = false }
    function getEmoji(product) { return productEmojis[product] || '\uD83D\uDCE6' }

    return {
        cart, isOpen, totalItems, totalPrice,
        addToCart, removeFromCart, changeQty,
        openCart, closeCart, getEmoji, formatPrice
    }
}
