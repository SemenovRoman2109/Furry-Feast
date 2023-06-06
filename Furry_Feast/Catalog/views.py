from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


def show_animal_selection(request):
    context={
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }
    return render(request,"Catalog/animal_selection.html",context)

def show_catalog(request):
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
    if request.method == 'POST':
        start_animal = request.POST.get("start-animal")
        if start_animal != "":
            context["products"] = Product.objects.filter(category__name=start_animal)
        else:
            # Получаем данные
            kind = request.POST.get("kind")
            animal = request.POST.get("animal")
            text = request.POST.get("text")
            weight = request.POST.get("weight")
            max_price = request.POST.get("maxPrice")
            min_price = request.POST.get("minPrice")


            filtered_products = context["products"]
            # Проверка по поиковой строке
            if text != None:
                filtered_products = Product.objects.filter(name__icontains=text)

            # Фильтр по цене
            print(max_price,min_price)
            if max_price != None and min_price != None:
                filtered_products = filtered_products.filter(price__gte=min_price, price__lte=max_price)

            # Проверка по весу
            if weight != "" and weight != None:
                # Если минимальный вес
                if "Менше" in weight:
                    number = float(weight.split(" ")[-1].split("г")[0]) * 0.001
                    filtered_products = filtered_products.filter(weight__lte=number)
                # Если максимальный вес
                elif "Більше" in weight:
                    number = float(weight.split(" ")[-1].split("к")[0])
                    filtered_products = filtered_products.filter(weight__gte=number)
                # Остальной вес
                else:
                    # 1.5кг - 2кг
                    range_values = weight.split(' - ') 
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
            list_filters_category = [kind,animal]
            for filter in list_filters_category:
                if filter != "" and filter != None:
                    print(filter)
                    filtered_products = filtered_products.filter(category__name=filter)

            # Получаем pk нужных обектов
            products_list = []
            for product in filtered_products:
                products_list.append(product.pk)

            return JsonResponse({"products": products_list})
    

    return render(request,"Catalog/main.html", context)

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

