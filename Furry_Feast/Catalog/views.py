from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

def filter_product_function(filter_text,filter_max_price,filter_min_price,filter_weight,filter_kind,filter_animal,filtered_products):
    # Проверка по поиковой строке
    if filter_text != None:
        filtered_products = filtered_products.filter(name__icontains=filter_text)

    # Фильтр по цене
    if filter_max_price != None and filter_min_price != None:
        filtered_products = filtered_products.filter(price__gte=filter_min_price, price__lte=filter_max_price)

    # Проверка по весу
    if filter_weight != "" and filter_weight != None:
        # Если минимальный вес
        if "Менше" in filter_weight:
            number = float(filter_weight.split(" ")[-1].split("г")[0]) * 0.001
            filtered_products = filtered_products.filter(weight__lte=number)
        # Если максимальный вес
        elif "Більше" in filter_weight:
            number = float(filter_weight.split(" ")[-1].split("к")[0])
            filtered_products = filtered_products.filter(weight__gte=number)
        # Остальной вес
        else:
            range_values = filter_weight.split(' - ') 
            min_max_weight = []
            for value in range_values:
                value = value.split("кг")[0]
                if "г" in value:
                    value = float(value.split("г")[0])
                    value = value* 0.001
                if value != "":
                    min_max_weight.append(float(value))
            filtered_products = filtered_products.filter(weight__gte=min_max_weight[0], weight__lte=min_max_weight[1])

    # Проверка по категориям
    list_filters_category = [filter_kind,filter_animal]
    for filter in list_filters_category:
        if filter != "" and filter != None:
            print(filter)
            filtered_products = filtered_products.filter(category__name=filter)
    return filtered_products

def show_main(request):
    context={
        "products":Product.objects.all(),
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }
    return render(request,"Catalog/main.html", context)

def show_catalog(request,page):
    print(request.GET)
    print(page)
    context={
        "products":Product.objects.all(),
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }


    max_price = 0 
    min_price = 99999999
    for product in context["products"]:
        if product.price > max_price:
            max_price = product.price
        if product.price < min_price:
            min_price = product.price
    context["max_price"] = max_price
    context["min_price"] = min_price

    new_products = []
    for index in range(20):
        if len(context["products"]) > index + 20*(int(page)-1):
            new_products.append(context["products"][index + 20*(int(page)-1)])
        
    context["products"] = new_products
    if request.method == 'POST':

        # Получаем данные
        kind = request.POST.get("kind")
        animal = request.POST.get("animal")
        text = request.POST.get("text")
        weight = request.POST.get("weight")
        max_price = request.POST.get("maxPrice")
        min_price = request.POST.get("minPrice")


        filtered_products = Product.objects.all()
        
        
        filtered_products = filter_product_function(filter_text=text,filter_max_price=max_price,filter_min_price=min_price,filter_weight=weight,filter_kind=kind,filter_animal=animal,filtered_products=filtered_products)
        
        # Получаем pk нужных обектов
        products_list = []
        for product in filtered_products:
            products_list.append(product.pk)
        print(products_list)
        return JsonResponse({"products": products_list})
    

    return render(request,"Catalog/catalog.html", context)

def show_product(request, product_pk):
    context = {
        'product': get_object_or_404(Product, pk=product_pk),
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }
    return render(request,"Catalog/product.html",context)

def show_product_review(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    return render(request,"Catalog/product-review.html",context)

