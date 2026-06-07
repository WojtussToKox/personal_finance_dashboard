from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ExpenseViewSet, HighValueExpenseViewSet

router = DefaultRouter()

router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'high-value-expenses', HighValueExpenseViewSet, basename='high-value-expense')

urlpatterns = [
    path('', include(router.urls))
]
