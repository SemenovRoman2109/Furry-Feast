from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

# Create your views here.
def show_main(request):
    context={"products":Product.objects.all()}
    if request.method == 'POST':
        # Получаем данные
        kind = request.POST.get("kind")
        animal = request.POST.get("animal")
        text = request.POST.get("text")
        weight = request.POST.get("weight")


        # Проверка по поиковой строке
        filtered_products = Product.objects.filter(name__icontains=text)

        # Проверка по весу
        if weight != "":
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
            if filter != "":
                print(filter)
                filtered_products = filtered_products.filter(category__name=filter)
        
        # Получаем pk нужных обектов
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

