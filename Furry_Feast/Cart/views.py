from django.shortcuts import render

# Create your views here.

def show_cart(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    return render(request,"Cart/cart.html",context)

def show_order(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    return render(request,"Cart/order.html",context)