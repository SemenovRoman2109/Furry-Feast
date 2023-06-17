from django.shortcuts import render
from .models import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.template.loader import render_to_string
from datetime import date

PRODUCT_IN_ONE_PAGE = 20

def filter_product_function(filter_text,filter_max_price,filter_min_price,filter_weight,filter_kind,filter_animal,filtered_products):
    # Проверка по поиковой строке
    if filter_text != None:
        filtered_products = filtered_products.filter(name__icontains=filter_text)

    # Фильтр по цене
    if filter_max_price != None and filter_min_price != None:
        for product in filtered_products:
            if product.discount_price() < int(filter_min_price) or product.discount_price() > int(filter_max_price):
                filtered_products = filtered_products.exclude(id=product.id)

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
            filtered_products = filtered_products.filter(category__name=filter)
    return filtered_products

def show_main(request):
    context={
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }
    return render(request,"Catalog/main.html", context)

def show_catalog(request,page):
    context={
        "products":Product.objects.all(),
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }

    max_price = 0 
    min_price = 99999999
    for product in context["products"]:
        if product.discount_price() > max_price:
            max_price = product.discount_price()
        if product.discount_price() < min_price:
            min_price = product.discount_price()
    context["max_price"] = max_price
    context["min_price"] = min_price

    if len(context["products"]) // PRODUCT_IN_ONE_PAGE < len(context["products"]) / PRODUCT_IN_ONE_PAGE:
        context["count_page"] = len(context["products"]) // PRODUCT_IN_ONE_PAGE + 1
    else:
        context["count_page"] = len(context["products"]) // PRODUCT_IN_ONE_PAGE


    new_products = []
    for index in range(PRODUCT_IN_ONE_PAGE):
        if len(context["products"]) > index + PRODUCT_IN_ONE_PAGE*(int(page)-1):
            new_products.append(context["products"][index + PRODUCT_IN_ONE_PAGE*(int(page)-1)])
        
    context["products"] = new_products
    for product in context["products"]:
        list_reviws_product = Review.objects.filter(product_id = product.pk)
        if len(list_reviws_product) > 0:
            final_grade = 0
            for reviw in list_reviws_product:
             final_grade += reviw.grade
            final_grade = final_grade/len(list_reviws_product)
            product.grade = round(final_grade)
        else:
            product.grade = len(list_reviws_product)
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
        
        for product in filtered_products:
            list_reviws_product = Review.objects.filter(product_id = product.pk)
            if len(list_reviws_product) > 0:
                final_grade = 0
                for reviw in list_reviws_product:
                    final_grade += reviw.grade
                final_grade = final_grade/len(list_reviws_product)
                product.grade = round(final_grade)
            else:
                product.grade = len(list_reviws_product)

        result = []
        for i in range(0, len(filtered_products), PRODUCT_IN_ONE_PAGE): 
            chunk = filtered_products[i:i + PRODUCT_IN_ONE_PAGE]
            result.append(chunk)

        index_page = int(page)-1
        if len(result) < index_page+1:
            index_page = 0

        
        context_product_list = {'products_filter': None,}
        zero_product = False                        
        if len(result) == 0:
            zero_product = True
            context_product_list['products_filter'] = []
        else:
            context_product_list['products_filter'] = result[index_page]

        data = {
            'html_product_list': render_to_string("Catalog/list_product_filtrer.html",context_product_list),
            "count_page":len(result),
            "zero_product":zero_product
        }

        return JsonResponse(data)
    

    return render(request,"Catalog/catalog.html", context)

def show_discount(request,page):
    context={
        "products":Product.objects.filter(promotion__gt = 0),
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }

    max_price = 0 
    min_price = 99999999
    for product in context["products"]:
        if product.discount_price() > max_price:
            max_price = product.discount_price()
        if product.discount_price() < min_price:
            min_price = product.discount_price()
    context["max_price"] = max_price
    context["min_price"] = min_price

    if len(context["products"]) // PRODUCT_IN_ONE_PAGE < len(context["products"]) / PRODUCT_IN_ONE_PAGE:
        context["count_page"] = len(context["products"]) // PRODUCT_IN_ONE_PAGE + 1
    else:
        context["count_page"] = len(context["products"]) // PRODUCT_IN_ONE_PAGE


    new_products = []
    for index in range(PRODUCT_IN_ONE_PAGE):
        if len(context["products"]) > index + PRODUCT_IN_ONE_PAGE*(int(page)-1):
            new_products.append(context["products"][index + PRODUCT_IN_ONE_PAGE*(int(page)-1)])
        
    context["products"] = new_products
    for product in context["products"]:
        list_reviws_product = Review.objects.filter(product_id = product.pk)
        if len(list_reviws_product) > 0:
            final_grade = 0
            for reviw in list_reviws_product:
             final_grade += reviw.grade
            final_grade = final_grade/len(list_reviws_product)
            product.grade = round(final_grade)
        else:
            product.grade = len(list_reviws_product)
    if request.method == 'POST':

        # Получаем данные
        kind = request.POST.get("kind")
        animal = request.POST.get("animal")
        text = request.POST.get("text")
        weight = request.POST.get("weight")
        max_price = request.POST.get("maxPrice")
        min_price = request.POST.get("minPrice")
        


        filtered_products = Product.objects.filter(promotion__gt = 0)
        
        
        filtered_products = filter_product_function(filter_text=text,filter_max_price=max_price,filter_min_price=min_price,filter_weight=weight,filter_kind=kind,filter_animal=animal,filtered_products=filtered_products)
        
        for product in filtered_products:
            list_reviws_product = Review.objects.filter(product_id = product.pk)
            if len(list_reviws_product) > 0:
                final_grade = 0
                for reviw in list_reviws_product:
                    final_grade += reviw.grade
                final_grade = final_grade/len(list_reviws_product)
                product.grade = round(final_grade)
            else:
                product.grade = len(list_reviws_product)

        result = []
        for i in range(0, len(filtered_products), PRODUCT_IN_ONE_PAGE): 
            chunk = filtered_products[i:i + PRODUCT_IN_ONE_PAGE]
            result.append(chunk)

        index_page = int(page)-1
        if len(result) < index_page+1:
            index_page = 0

        
        context_product_list = {'products_filter': None,}
        zero_product = False                        
        if len(result) == 0:
            zero_product = True
            context_product_list['products_filter'] = []
        else:
            context_product_list['products_filter'] = result[index_page]

        data = {
            'html_product_list': render_to_string("Catalog/list_product_filtrer.html",context_product_list),
            "count_page":len(result),
            "zero_product":zero_product
        }

        return JsonResponse(data)
    

    return render(request,"Catalog/catalog.html", context)

def show_product(request, product_pk):
    context = {
        'product': get_object_or_404(Product, pk=product_pk),
        "is_authenticated":request.user.is_authenticated,
        "product_pk":product_pk,
        "user_name":request.user.username,
    }
    
    list_reviws_product = Review.objects.filter(product_id = context["product"].pk)
    if len(list_reviws_product) > 0:
        final_grade = 0
        for reviw in list_reviws_product:
            final_grade += reviw.grade
        final_grade = final_grade/len(list_reviws_product)
        context["product"].grade = round(final_grade)
    else:
        context["product"].grade = len(list_reviws_product)
    return render(request,"Catalog/product.html",context)

def show_product_review(request, product_pk):
    context = {
        "product_pk":product_pk,
        "reviews":Review.objects.filter(product_id = product_pk),
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    if request.method == 'POST':
        content = request.POST.get("content")
        count_star = request.POST.get("count_star")
        review = Review.objects.create(product_id=product_pk, grade=count_star, content=content, autor_name=request.user.username, date=date.today())
        review.save()

    return render(request,"Catalog/product-review.html",context)

def show_animal_selection(request):
    context={
        "is_authenticated":request.user.is_authenticated,
        "user_name":request.user.username,
    }
    return render(request,"Catalog/animal_selection.html", context)



