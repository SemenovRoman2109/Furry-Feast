"""Furry_Feast URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Catalog.views import *
from Cart.views import *
from UserPages.views import *
from .settings import *
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",show_main,name="main"),
    path("catalog/<page>/",show_catalog,name="catalog"),
    path("animal_selection/",show_animal_selection, name = 'animal_selection'),
    path("discount/<page>/",show_discount,name="discount"),
    path("product/<product_pk>",show_product,name="product"),
    path("product_review/<product_pk>",show_product_review,name="product_review"),
    path("contact/",show_contact,name="contact"),
    path("login/",show_login,name="login"),
    path("registration/",show_registration, name = 'registration'),
    path("logout/",logout_function, name = 'logout'),
    path("cart/",show_cart, name = 'cart'),
    path("order/",show_order, name = 'order'),
    path("add_cart/",add_cart, name = 'add_cart'),
]

if DEBUG:
    urlpatterns += static(MEDIA_URL,document_root = MEDIA_ROOT)

