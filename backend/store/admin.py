from django.contrib import admin
from .models import Product, Order, Contact


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'badge', 'is_active')
    list_filter = ('category', 'is_active')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'product_name', 'quantity', 'total_price', 'status', 'created_at')
    list_filter = ('status',)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'product', 'created_at')
