from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import IncomeCategory, Income
from .serializers import IncomeCategorySerializer, DefaultIncomeSerializer, DynamicIncomeSerializer

from django.db.models import Sum, F
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class IncomeCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeCategorySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return IncomeCategory.objects.filter(user=self.request.user)

    # Kiedy użytkownik dodaje nową kategorię, przypisujemy mu ją
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DefaultIncomeViewSet(viewsets.ModelViewSet):
    serializer_class = DefaultIncomeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IncomeSummaryView(APIView):
    def get(self, request):
        summary = Income.objects.filter(user=request.user) \
            .values('category__name') \
            .annotate(value=Sum('value'))
        chart_data = [
            {"name": item['category__name'], "value": item['value']}
            for item in summary
        ]
        return Response(chart_data)

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