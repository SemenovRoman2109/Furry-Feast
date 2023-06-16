from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from .telegram import bot_send
from Furry_Feast.settings import TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHAT_ID
import requests
import json

# Create your views here.

def show_cart(request):

    context = {
        "product_in_cart":ProductInCart.objects.filter(session_key=request.session.session_key),
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated,
        "empty_cart":True
        
    }
    if len(context["product_in_cart"]) == 0:
        context["empty_cart"] = False
    if request.method == 'POST':
        count_product = request.POST.get("count_product")
        delete_product = request.POST.get("delete_product")
        product_pk = request.POST.get("product_pk")
        if delete_product != "false":
            ProductInCart.objects.filter(session_key=request.session.session_key).filter(product_id = product_pk)[0].delete()
            return JsonResponse({"result":"delete"})
        else:
            product_in_cart = ProductInCart.objects.filter(session_key=request.session.session_key).filter(product_id = product_pk)[0]
            product_in_cart.count_product = count_product
            product_in_cart.save()
            return JsonResponse({"result":"change_count"})
    return render(request,"Cart/cart.html",context)

def show_order(request):

    key_np = ''
    url = 'https://api.novaposhta.ua/v2.0/json/'
    request_dict = {
        "apiKey": key_np,
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": {},
        "Limit":"60"
    }
    request_json = json.dumps(request_dict, indent = 5)
    request_response = requests.post(url, data = request_json)
    response = json.loads(request_response.text)
    data = response['data']
    
    list_city = []
    for i in data:
        list_city.append(i["Description"])

    context = {
        "products":ProductInCart.objects.filter(session_key=request.session.session_key),
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated,
        "list_city":list_city,
    }

    
    if request.method == 'POST':
        change_count = request.POST.get("change_count")
        select_city = request.POST.get("select_city")
        if select_city == "true":
            city = request.POST.get("city")

            key_np = ''
            url = 'https://api.novaposhta.ua/v2.0/json/'
            request_dict = {
            "apiKey": key_np,
            "modelName": "Address",
            "calledMethod": "getWarehouses",
            "methodProperties": {
                "CityName":city,
                "Page" : "1",
                "Language" : "UA",
                    }
                }
            request_json = json.dumps(request_dict, indent = 5)
            request = requests.post(url, data = request_json)
            response = json.loads(request.text)
            data = response['data']
            
            new_data = []
            for i in data:
                new_data.append(i['Description'])
                

            return JsonResponse({"list_branches":new_data})

        else:
            if change_count == "true":
                count_product = request.POST.get("count_product")
                product_pk = request.POST.get("product_pk")
                product_in_cart = ProductInCart.objects.filter(session_key=request.session.session_key).filter(product_id = product_pk)[0]
                product_in_cart.count_product = count_product
                product_in_cart.save()
                return JsonResponse({"result":"change_count"})
            else:
                phone_number = request.POST.get("phone_number")
                name_surname = request.POST.get("name_surname")
                city = request.POST.get("city")
                number_mail = request.POST.get("number_mail")
                payment_method = request.POST.get("payment_method")


                products = ProductInCart.objects.filter(session_key=request.session.session_key)

                order_text = ""
                full_price = 0

                count = 1

                

                for product_in_cart in products:
                    count_number = 1
                    for number in str(count):
                        list_symbol = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
                        order_text += list_symbol[int(number)]
                        if count_number == len(str(count)):
                            order_text += " - "
                        count_number += 1

                    count += 1 
                    order_text += f"{product_in_cart.product.name} - {product_in_cart.count_product} шт id товара:{product_in_cart.product.pk}; \n \n" 
                    full_price += product_in_cart.product.discount_price() * product_in_cart.count_product

                message = f"Замовлення вiд: {name_surname} \n \n Вiн замовив: \n \n{order_text} \n Номер телефону користувача: {phone_number} \n \n Мicто в якому мешкає користувач: {city} \n \n Вiддiлення нової пошти: {number_mail} \n \n Спосiб оплати: {payment_method}  \n \n \n Сумарна цiна: {full_price} грн"

                for product_in_cart in products:
                    product_in_cart.delete()

                bot_send(TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHAT_ID, message)
                return JsonResponse({"result":"Удачная отправка"})
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
