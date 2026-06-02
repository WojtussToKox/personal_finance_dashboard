from rest_framework import serializers
from .models import IncomeCategory, Income

class IncomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeCategory
        fields = ['id', 'name']

class DefaultIncomeSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.name', read_only = True)

    class Meta:
        model = Income
        fields = ['id', 'category', 'category_name', 'title', 'value', 'date']

class DynamicIncomeSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)

        super().__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    class Meta:
        model = Income
        fields = '__all__'