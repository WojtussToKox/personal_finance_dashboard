from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Category, Expense
from .serializers import CategorySerializer, ExpenseSerializer
from django.db.models import Sum, F
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExpenseViewSet(viewsets.ModelViewSet):
    
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user).order_by('-date')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExpenseSummaryView(APIView):
    def get(self, request):
        summary = Expense.objects.filter(user=request.user) \
            .values('category__name') \
            .annotate(value=Sum(F('price')*F('count')))
        chart_data = [
            {"name": item['category__name'], "value": item['value']}
            for item in summary
        ]
        return Response(chart_data)

class HighValueExpenseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Expense.objects.filter(price__gt=1000)
    serializer_class = ExpenseSerializer