from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'contacts', views.ContactViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/submit-order/', views.submit_order, name='submit-order'),
    path('api/submit-contact/', views.submit_contact, name='submit-contact'),
    path('api/dashboard/', views.dashboard_stats, name='dashboard-stats'),
]
