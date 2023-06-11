from django.shortcuts import render
from .models import *
from django.http import JsonResponse

# Create your views here.

def show_cart(request):
    context = {
        "product_in_cart":ProductInCart.objects.filter(session_key=request.session.session_key),
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    if request.method == 'POST':
        count_product = request.POST.get("count_product")
        delete_product = request.POST.get("delete_product")
        product_pk = request.POST.get("product_pk")
        print("count_product=",count_product)
        print("delete_product=",delete_product)
        print("product_pk=",product_pk)
    return render(request,"Cart/cart.html",context)

def show_order(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    return render(request,"Cart/order.html",context)

def add_cart(request):
    if request.method == 'POST':
        product_pk = request.POST.get("product_pk")
        # Получаем ключ сессии
        session_key = request.session.session_key
        # Если ключ сессии не существует
        if not session_key:
            # Создаем ключ сессии
            request.session.cycle_key()
            # Задаем значение ключ сессии в переменную
            session_key = request.session.session_key
        # Создаем продукт в корзине
        if len(ProductInCart.objects.filter(session_key=session_key).filter(product_id=product_pk)) == 0:
            product_in_cart = ProductInCart.objects.create(
                session_key=session_key, product_id=product_pk, count_product=1)
        else:
            product_in_cart = (ProductInCart.objects.filter(session_key=session_key).filter(product_id=product_pk))[0]
            product_in_cart.count_product = product_in_cart.count_product+1
        # Сохраняем запись продукта в корзину
        product_in_cart.save()
        return JsonResponse({"result":True})