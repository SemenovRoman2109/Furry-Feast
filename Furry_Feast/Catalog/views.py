from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

# Create your views here.
def show_main(request):
    context={"products":Product.objects.all()}
    if request.method == 'POST':
        kind = request.POST.get("kind")
        animal = request.POST.get("animal")
        text = request.POST.get("text")
        if text != "none":
            filtered_products = Product.objects.filter(name__icontains=text)
        else:
            if kind != None and animal == None:
                filtered_products = Product.objects.filter(category__name=kind)
            elif animal != None and kind == None:
                filtered_products = Product.objects.filter(category__name=animal)
            elif animal != None and kind != None:
                filtered_products = Product.objects.filter(category__name=animal).filter(category__name=kind)
            elif animal == None and kind == None:
                filtered_products = Product.objects.all()


        products_list = []
        
        for product in filtered_products:
            products_list.append(product.pk)
        
        return JsonResponse({"products": products_list})
    

    return render(request,"Catalog/main.html", context)

def show_product(request, product_pk):
    context = {'product': get_object_or_404(Product, pk=product_pk)}
    return render(request,"Catalog/product.html",context)

def show_product_review(request):
    return render(request,"Catalog/product-review.html")

