from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "Categories" # Wymuszamy poprawną liczbę mnogą

    def __str__(self):
        return self.name
    

class Expense(models.Model):
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    title = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    count = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"{self.title} -> {self.price}PLN x {self.count} -> {self.date}"