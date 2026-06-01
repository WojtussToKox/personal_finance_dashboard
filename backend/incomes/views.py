from rest_framework import viewsets
from .models import IncomeCategory, Income
from .serializers import IncomeCategorySerializer, DefaultIncomeSerializer, DynamicIncomeSerializer

# Create your views here.

class IncomeCategoryViewSet(viewsets.ModelViewSet):
    queryset = IncomeCategory.objects.all()
    serializer_class = IncomeCategorySerializer

class DefaultIncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = DefaultIncomeSerializer

class OnlyTitleIncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = DynamicIncomeSerializer

    def get_serializer(self, *args, **kwargs):
        kwargs['fields'] = ('id', 'title')
        return super().get_serializer(*args, **kwargs)
    

class CategoryIncomeViewSet(viewsets.ModelViewSet):
    serializer_class = DefaultIncomeSerializer

    def get_queryset(self):
        queryset = Income.objects.all()

        category_id = self.request.query_params.get('category')
        search_title = self.request.query_params.get('title')

        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)

        if search_title is not None:
            queryset = queryset.filter(title__icontains=search_title)

        return queryset