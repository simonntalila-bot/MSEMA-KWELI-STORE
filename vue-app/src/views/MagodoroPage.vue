<template>
    <div class="magodoro-page">
        <div class="magodoro-hero">
            <div class="container">
                <h1>MAGODOLO TZ</h1>
                <p>Godoro bora kwa usingizi wako — Tanfoam, Banco, Dodoma Comfort, na zaidi</p>
            </div>
        </div>

        <div class="container">
            <div class="magodoro-filters">
                <div class="filter-group">
                    <label>Chagua Brand</label>
                    <select v-model="filterBrand">
                        <option value="all">Brand Zote</option>
                        <option v-for="b in allBrands" :key="b" :value="b">{{ b }}</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Aina ya Godoro</label>
                    <select v-model="filterType">
                        <option value="all">Aina Zote</option>
                        <option v-for="t in allTypes" :key="t" :value="t">{{ t }}</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Ukubwa</label>
                    <select v-model="filterSize">
                        <option value="all">Ukubwa Wote</option>
                        <option v-for="s in allSizes" :key="s" :value="s">{{ s }}</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Unene</label>
                    <select v-model="filterThickness">
                        <option value="all">Yote</option>
                        <option v-for="t in allThickness" :key="t" :value="t">{{ t }}</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Tafuta</label>
                    <input type="text" v-model="searchQuery" placeholder="Andika jina la bidhaa...">
                </div>
            </div>

            <div class="results-count" v-if="filteredProducts.length > 0">
                Bidhaa {{ filteredProducts.length }} zimepatikana
            </div>

            <div class="magodoro-grid">
                <div v-for="item in filteredProducts" :key="item.id" class="magodoro-card">
                    <div class="card-image">
                        <img :src="item.image" :alt="item.name" loading="lazy">
                        <span class="card-type-badge">{{ item.type }}</span>
                        <span v-if="item.stock === 'few_left'" class="stock-badge few">Few Left</span>
                        <span v-if="item.stock === 'out'" class="stock-badge out">Out of Stock</span>
                    </div>
                    <div class="card-body">
                        <div class="card-brand" :style="{ color: getBrandColor(item.brand) }">{{ item.brand }}</div>
                        <h3 class="card-name">{{ item.name }}</h3>
                        <div class="card-type-line">Type: {{ item.type }}</div>
                        <div class="card-specs">
                            <div class="spec-row">
                                <span class="spec-label">Ukubwa</span>
                                <div class="spec-options">
                                    <button v-for="s in item.sizes" :key="s" class="spec-btn" :class="{ active: selections[item.id]?.size === s }" @click="setSize(item.id, s)">{{ s }}</button>
                                </div>
                            </div>
                            <div class="spec-row">
                                <span class="spec-label">Unene</span>
                                <div class="spec-options">
                                    <button v-for="t in item.thickness" :key="t" class="spec-btn" :class="{ active: selections[item.id]?.thickness === t }" @click="setThickness(item.id, t)">{{ t }}</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-price">Tsh {{ getCurrentPrice(item).toLocaleString() }}</div>
                        <div class="card-actions">
                            <button class="btn btn-details" @click="openDetails(item)">View Details</button>
                            <button class="btn btn-buy" :disabled="item.stock === 'out' || !selections[item.id]?.size || !selections[item.id]?.thickness" @click="buyNow(item)">LIPA SASA</button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredProducts.length === 0" class="no-results">
                <p>Hakuna magodoro yanayolingana na utafutaji wako.</p>
                <button class="btn btn-primary" @click="clearFilters">Futa Vichujio</button>
            </div>
        </div>

        <!-- DETAIL MODAL -->
        <div v-if="showDetail" class="detail-overlay" @click.self="showDetail = false">
            <div class="detail-modal">
                <button class="detail-close" @click="showDetail = false">&times;</button>
                <div class="detail-image">
                    <img :src="detailProduct.image" :alt="detailProduct.name">
                </div>
                <div class="detail-info">
                    <div class="detail-brand" :style="{ color: getBrandColor(detailProduct.brand) }">{{ detailProduct.brand }}</div>
                    <h2>{{ detailProduct.name }}</h2>

                    <div class="detail-meta">
                        <div class="meta-item"><span class="meta-label">Brand</span><span class="meta-val">{{ detailProduct.brand }}</span></div>
                        <div class="meta-item"><span class="meta-label">Product</span><span class="meta-val">{{ detailProduct.name }}</span></div>
                        <div class="meta-item"><span class="meta-label">Type</span><span class="meta-val">{{ detailProduct.type }}</span></div>
                        <div class="meta-item"><span class="meta-label">Country</span><span class="meta-val">{{ detailProduct.country }}</span></div>
                    </div>

                    <div class="detail-selector">
                        <div class="spec-row">
                            <span class="spec-label">Ukubwa (Size)</span>
                            <div class="spec-options">
                                <button v-for="s in detailProduct.sizes" :key="s" class="spec-btn" :class="{ active: detailSelection.size === s }" @click="detailSelection.size = s">{{ s }}</button>
                            </div>
                        </div>
                        <div class="spec-row">
                            <span class="spec-label">Unene (Thickness)</span>
                            <div class="spec-options">
                                <button v-for="t in detailProduct.thickness" :key="t" class="spec-btn" :class="{ active: detailSelection.thickness === t }" @click="detailSelection.thickness = t">{{ t }}</button>
                            </div>
                        </div>
                    </div>

                    <div class="detail-price">Tsh {{ getDetailPrice().toLocaleString() }}</div>

                    <div class="detail-features" v-if="detailProduct.features">
                        <h4>PRODUCT DESCRIPTION</h4>
                        <ul><li v-for="f in detailProduct.features" :key="f">{{ f }}</li></ul>
                    </div>

                    <div class="detail-specs" v-if="detailProduct.specs">
                        <h4>PRODUCT SPECIFICATIONS</h4>
                        <div v-for="group in detailProduct.specs" :key="group.group" class="spec-group">
                            <div class="spec-group-title" :style="{ borderColor: getBrandColor(detailProduct.brand) }">{{ group.group }}</div>
                            <div v-for="item in group.items" :key="item.label" class="spec-line">
                                <span class="spec-key">{{ item.label }}</span>
                                <span class="spec-val">{{ item.value }}</span>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-buy btn-block" :disabled="detailProduct.stock === 'out' || !detailSelection.size || !detailSelection.thickness" @click="buyDetailNow">LIPA SASA</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { magodoro } from '../data/magodoro'
import { useCart } from '../composables/useCart'
import { useToast } from '../composables/useToast'

const cart = useCart()
const { showToast } = useToast()

const filterBrand = ref('all')
const filterType = ref('all')
const filterSize = ref('all')
const filterThickness = ref('all')
const searchQuery = ref('')
const showDetail = ref(false)
const detailProduct = ref(null)
const detailSelection = reactive({ size: '', thickness: '' })

const selections = reactive({})
magodoro.forEach(item => {
    selections[item.id] = { size: item.sizes[0], thickness: item.thickness[0] }
})

const allBrands = computed(() => [...new Set(magodoro.map(m => m.brand))])
const allTypes = computed(() => [...new Set(magodoro.map(m => m.type))])
const allSizes = computed(() => [...new Set(magodoro.flatMap(m => m.sizes))])
const allThickness = computed(() => [...new Set(magodoro.flatMap(m => m.thickness))])

const filteredProducts = computed(() => {
    return magodoro.filter(item => {
        if (filterBrand.value !== 'all' && item.brand !== filterBrand.value) return false
        if (filterType.value !== 'all' && item.type !== filterType.value) return false
        if (filterSize.value !== 'all' && !item.sizes.includes(filterSize.value)) return false
        if (filterThickness.value !== 'all' && !item.thickness.includes(filterThickness.value)) return false
        if (searchQuery.value) {
            const q = searchQuery.value.toLowerCase()
            if (!item.name.toLowerCase().includes(q) && !item.brand.toLowerCase().includes(q) && !item.type.toLowerCase().includes(q)) return false
        }
        return true
    })
})

const brandColors = {
    'Tanfoam': '#006D3B', 'Banco': '#1565C0', 'Dodoma Comfort': '#7C3AED',
    'VitaFoam': '#E53935', 'QFL': '#F59E0B', 'GSM': '#00A86B',
    'Comfy': '#E91E63', 'Tuffoam': '#FF6A00', 'Goldsun': '#FFD700'
}

function getBrandColor(brand) { return brandColors[brand] || '#006D3B' }
function setSize(id, size) { selections[id].size = size }
function setThickness(id, thickness) { selections[id].thickness = thickness }

function getCurrentPrice(item) {
    const sel = selections[item.id]
    if (!sel || !sel.size || !sel.thickness) return 0
    return item.prices[sel.size + '-' + sel.thickness] || 0
}

function getDetailPrice() {
    if (!detailProduct.value || !detailSelection.size || !detailSelection.thickness) return 0
    return detailProduct.value.prices[detailSelection.size + '-' + detailSelection.thickness] || 0
}

function openDetails(item) {
    detailProduct.value = item
    detailSelection.size = selections[item.id]?.size || item.sizes[0]
    detailSelection.thickness = selections[item.id]?.thickness || item.thickness[0]
    showDetail.value = true
}

function clearFilters() {
    filterBrand.value = 'all'; filterType.value = 'all'
    filterSize.value = 'all'; filterThickness.value = 'all'
    searchQuery.value = ''
}

function buyNow(item) {
    const sel = selections[item.id]
    if (!sel?.size) { showToast('Tafadhali chagua ukubwa.'); return }
    if (!sel?.thickness) { showToast('Tafadhali chagua unene.'); return }
    const price = getCurrentPrice(item)
    const label = item.brand + ' ' + item.name + ' (' + sel.size + ', ' + sel.thickness + ')'
    cart.addToCart(label, price)
    cart.openCart()
    showToast(label + ' imeongezwa kwenye kikapu!')
}

function buyDetailNow() {
    if (!detailProduct.value || !detailSelection.size || !detailSelection.thickness) return
    const price = getDetailPrice()
    const label = detailProduct.value.brand + ' ' + detailProduct.value.name + ' (' + detailSelection.size + ', ' + detailSelection.thickness + ')'
    cart.addToCart(label, price)
    showDetail.value = false
    cart.openCart()
    showToast(label + ' imeongezwa kwenye kikapu!')
}
</script>

<style scoped>
.magodoro-page { padding-bottom: 40px; }
.magodoro-hero { background: linear-gradient(135deg, #17231F, #00C853); color: #fff; text-align: center; padding: 60px 16px 40px; }
.magodoro-hero h1 { font-size: 2rem; font-weight: 900; margin-bottom: 8px; }
.magodoro-hero p { font-size: 0.95rem; opacity: 0.9; max-width: 600px; margin: 0 auto; }

.magodoro-filters { display: flex; gap: 10px; flex-wrap: wrap; padding: 20px 0; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px; }
.filter-group { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 130px; }
.filter-group label { font-size: 0.68rem; font-weight: 700; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
.filter-group select, .filter-group input { padding: 8px 10px; font-size: 0.82rem; border: 1px solid #e0e0e0; border-radius: 6px; background: #fff; color: #1a1a1a; outline: none; transition: border-color 0.2s; }
.filter-group select:focus, .filter-group input:focus { border-color: #00C853; }

.results-count { font-size: 0.82rem; color: #999; margin-bottom: 16px; font-weight: 600; }

.magodoro-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.magodoro-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; transition: box-shadow 0.2s, transform 0.2s; }
.magodoro-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
.card-image { position: relative; height: 170px; background: #f5f5f5; overflow: hidden; }
.card-image img { width: 100%; height: 100%; object-fit: contain; padding: 10px; }
.card-type-badge { position: absolute; top: 8px; left: 8px; font-size: 0.6rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; background: #17231F; color: #fff; text-transform: uppercase; letter-spacing: 0.3px; }
.stock-badge { position: absolute; top: 8px; right: 8px; font-size: 0.6rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; color: #fff; text-transform: uppercase; }
.stock-badge.few { background: #F59E0B; }
.stock-badge.out { background: #EF4444; }

.card-body { padding: 12px; }
.card-brand { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
.card-name { font-size: 0.9rem; font-weight: 800; color: #1a1a1a; margin-bottom: 2px; }
.card-type-line { font-size: 0.68rem; color: #999; margin-bottom: 8px; font-style: italic; }
.card-specs { margin-bottom: 10px; }
.spec-row { margin-bottom: 6px; }
.spec-label { display: block; font-size: 0.6rem; font-weight: 700; color: #999; text-transform: uppercase; margin-bottom: 3px; }
.spec-options { display: flex; gap: 4px; flex-wrap: wrap; }
.spec-btn { padding: 3px 8px; font-size: 0.68rem; font-weight: 600; border: 1px solid #e0e0e0; border-radius: 5px; background: #f5f5f5; color: #333; cursor: pointer; transition: all 0.2s; }
.spec-btn.active { background: #00C853; color: #fff; border-color: #00C853; }
.spec-btn:hover { border-color: #00C853; }
.card-price { font-size: 1rem; font-weight: 900; color: #17231F; margin-bottom: 10px; }
.card-actions { display: flex; gap: 6px; }
.btn-details { flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 600; border: 1px solid #e0e0e0; border-radius: 8px; background: #fff; color: #333; cursor: pointer; transition: all 0.2s; }
.btn-details:hover { border-color: #00C853; color: #00C853; }
.btn-buy { flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; border: none; border-radius: 8px; background: #00C853; color: #fff; cursor: pointer; transition: all 0.2s; }
.btn-buy:hover { background: #00A844; }
.btn-buy:disabled { background: #ccc; cursor: not-allowed; }
.btn-block { width: 100%; }
.btn-primary { background: #00C853; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; }
.no-results { text-align: center; padding: 60px 0; color: #999; font-size: 1rem; }

/* DETAIL MODAL */
.detail-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 300; padding: 16px; backdrop-filter: blur(4px); }
.detail-modal { background: #fff; border-radius: 14px; max-width: 620px; width: 100%; max-height: 92vh; overflow-y: auto; position: relative; box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
.detail-close { position: absolute; top: 12px; right: 14px; background: rgba(255,255,255,0.9); border: none; font-size: 1.4rem; color: #666; cursor: pointer; z-index: 2; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.detail-close:hover { background: #fff; color: #333; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.detail-image { height: 260px; background: #f9f9f9; display: flex; align-items: center; justify-content: center; }
.detail-image img { max-height: 100%; object-fit: contain; padding: 16px; }
.detail-info { padding: 20px 24px 24px; }
.detail-brand { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.detail-info h2 { font-size: 1.3rem; font-weight: 900; color: #17231F; margin-bottom: 12px; }
.detail-meta { background: #F8F9FA; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; }
.meta-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #E8E8E8; }
.meta-item:last-child { border-bottom: none; }
.meta-label { font-size: 0.78rem; color: #999; font-weight: 500; }
.meta-val { font-size: 0.78rem; font-weight: 700; color: #17231F; }
.detail-selector { margin-bottom: 14px; }
.detail-selector .spec-row { margin-bottom: 8px; }
.detail-selector .spec-label { font-size: 0.7rem; margin-bottom: 4px; }
.detail-selector .spec-btn { padding: 5px 12px; font-size: 0.75rem; }
.detail-price { font-size: 1.4rem; font-weight: 900; color: #00C853; margin-bottom: 16px; }
.detail-features { margin-bottom: 16px; }
.detail-features h4, .detail-specs h4 { font-size: 0.82rem; font-weight: 800; color: #17231F; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
.detail-features ul { list-style: none; padding: 0; }
.detail-features li { font-size: 0.8rem; color: #555; padding: 3px 0; }
.detail-features li::before { content: '\2713 '; color: #00C853; font-weight: 700; }
.detail-specs { margin-bottom: 20px; }
.spec-group { margin-bottom: 12px; }
.spec-group-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #17231F; padding-bottom: 4px; border-bottom: 2px solid #e0e0e0; margin-bottom: 6px; }
.spec-line { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #F0F0F0; }
.spec-line:last-child { border-bottom: none; }
.spec-key { font-size: 0.78rem; color: #888; font-weight: 500; }
.spec-val { font-size: 0.78rem; font-weight: 700; color: #17231F; text-align: right; }

@media (max-width: 1024px) { .magodoro-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
    .magodoro-hero { padding: 40px 16px 32px; }
    .magodoro-hero h1 { font-size: 1.5rem; }
    .magodoro-filters { flex-direction: column; gap: 8px; }
    .magodoro-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .card-image { height: 140px; }
    .card-actions { flex-direction: column; }
    .detail-modal { max-width: 95vw; }
    .detail-image { height: 200px; }
}
@media (max-width: 580px) {
    .magodoro-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .card-body { padding: 10px; }
    .card-name { font-size: 0.82rem; }
    .spec-btn { padding: 2px 6px; font-size: 0.65rem; }
}
@media (max-width: 480px) {
    .magodoro-grid { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; }
    .card-image { height: 200px; }
}
</style>
