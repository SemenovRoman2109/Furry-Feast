from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)

class Review(models.Model):
    date = models.DateField()
    grade = models.FloatField()
    autor_name = models.CharField(max_length=50)
    content = models.TextField()


class Product(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    info = models.TextField()
    grade = models.FloatField()

    reviews = models.ManyToManyField(Review)
    category = models.ManyToManyField(Category)
    
    def __str__(self):
        return self.name
