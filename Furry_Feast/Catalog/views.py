from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404

# Create your views here.
def show_main(request):
    context={"products":Product.objects.all()}
    if request.method == 'POST':
        kind = request.POST.get("kind")
        animal = request.POST.get("animal")
        
        print(kind, animal)
    return render(request,"Catalog/main.html", context)

def show_product(request, product_pk):
    context = {'product': get_object_or_404(Product, pk=product_pk)}
    return render(request,"Catalog/product.html",context)

def show_product_review(request):
    return render(request,"Catalog/product-review.html")

