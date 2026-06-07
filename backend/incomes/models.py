from django.db import models
from django.conf import settings

# Create your models here.
class IncomeCategory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'Income Categories'

    def __str__(self):
        return self.name


class Income(models.Model):
    category = models.ForeignKey(IncomeCategory, on_delete=models.RESTRICT)
    title = models.CharField(max_length=50)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} -> {self.value} -> {self.date}"