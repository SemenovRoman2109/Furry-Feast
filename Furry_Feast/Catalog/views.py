from django.shortcuts import render

# Create your views here.
def show_main(request):
    return render(request,"Catalog/main.html")

def show_product(request):
    return render(request,"Catalog/product.html")

def show_product_review(request):
    return render(request,"Catalog/product-review.html")