from django.shortcuts import render

# Create your views here.

def show_cart(request):
    return render(request,"Cart/cart.html")

def show_order(request):
    return render(request,"Cart/order.html")