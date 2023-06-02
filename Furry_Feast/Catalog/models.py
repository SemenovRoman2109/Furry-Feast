from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Review(models.Model):
    date = models.DateField()
    grade = models.FloatField()
    autor_name = models.CharField(max_length=50)
    content = models.TextField(blank=True)


class Product(models.Model):
    short_name = models.CharField(max_length=15,null=True)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    info = models.TextField()
    grade = models.FloatField(default=0.0)
    image = models.ImageField(upload_to="product",null=True)

    reviews = models.ManyToManyField(Review, blank=True)
    category = models.ManyToManyField(Category)
    
    def __str__(self):
        return self.name
