from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Product(models.Model):
    display_name = models.CharField(max_length=65,blank=True)
    name = models.CharField(max_length=255)
    weight = models.FloatField(null=True)
    price = models.IntegerField()
    info = models.TextField()
    grade = models.FloatField(default=0.0)
    image = models.ImageField(upload_to="product",null=True)

    
    category = models.ManyToManyField(Category)
    
    promotion = models.IntegerField(default=0)
    def discount_price(self):
        return (int(self.price-(self.price*self.promotion/100))) #self.price-(self.price*self.promotion/100)-0.01
    def __str__(self):
        return self.name

class Review(models.Model):
    date = models.DateField()
    grade = models.IntegerField()
    autor_name = models.CharField(max_length=50)
    content = models.TextField(blank=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,null=True)
