from django.db import models
import json


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('usafiri', 'Usafiri'),
        ('ujenzi', 'Ujenzi'),
    ]
    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    description_en = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=12, decimal_places=0)
    emoji = models.CharField(max_length=10, blank=True)
    image = models.CharField(max_length=255, blank=True)
    badge = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('contacted', 'Contacted'),
        ('completed', 'Completed'),
    ]
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=1)
    message = models.TextField(blank=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=0, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.product_name} ({self.status})"


class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    product = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.product}"
