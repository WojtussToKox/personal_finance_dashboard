from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DefaultIncomeViewSet, CategoryIncomeViewSet, IncomeCategoryViewSet, OnlyTitleIncomeViewSet

router = DefaultRouter()

router.register(r'Incomes', DefaultIncomeViewSet, basename='Incomes')
router.register(r'IncomesByCategory',CategoryIncomeViewSet, basename='IncomesByCategory')
router.register(r'Categories',IncomeCategoryViewSet, basename='categories')
router.register(r'TitleIncomes',OnlyTitleIncomeViewSet, basename='TitleIncomes')

urlpatterns = [
    path('', include(router.urls))
]