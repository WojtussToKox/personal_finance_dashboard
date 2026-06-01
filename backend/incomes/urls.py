from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DefaultIncomeViewSet, CategoryIncomeViewSet, IncomeCategoryViewSet, OnlyTitleIncomeViewSet

router = DefaultRouter()

router.register(r'Incomes', DefaultIncomeViewSet)
router.register(r'IncomesByCategory',CategoryIncomeViewSet, basename='IncomesByCategory')
router.register(r'Categories',IncomeCategoryViewSet)
router.register(r'TitleIncomes',OnlyTitleIncomeViewSet, basename='TitleIncomes')

urlpatterns = [
    path('', include(router.urls))
]