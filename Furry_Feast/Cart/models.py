from django.db import models
from Catalog.models import *

# Create your models here.
class ProductInCart(models.Model):
    session_key = models.CharField(max_length=32)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count_product = models.IntegerField(default=1)