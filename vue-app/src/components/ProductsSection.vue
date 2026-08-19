<template>
    <section class="section products" id="bidhaa">
        <div class="container">
            <div class="products-grid">
                <div
                    v-for="product in products"
                    :key="product.name"
                    class="product-card"
                    :data-category="product.category"
                >
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { products } from '../data/products'
</script>
