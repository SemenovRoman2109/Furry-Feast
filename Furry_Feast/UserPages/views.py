from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse

# Create your views here.
def show_contact(request):
    return render(request, 'UserPages/contact.html')


def show_login(request):
    if request.method =='POST':
        username = request.POST.get("username")
        password = request.POST.get('password')

        user = authenticate(request, username = username, password = password)
        
        if user != None:
            login(request,user)
            return JsonResponse({"text":"Натиснiть щоб перейти до каталогу!","result":True})
        else:
            return JsonResponse({"text":"Iм'я або пароль не спiвпадають!","result":False})
    return render(request, 'UserPages/login.html')


def show_registration(request):
    
    if request.method =='POST':
        username = request.POST.get("username")
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')

        if password == confirm_password:
            if not User.objects.filter(username=username):
                if not User.objects.filter(email=email):
                    print("Успешная регистрация")
                    User.objects.create_user(username = username, password = password, email = email)
                    user = authenticate(request, username = username, password = password)
                    login(request,user)
                    return JsonResponse({"text":"Натиснiть щоб перейти до каталогу!","result":True})
                else:
                    return JsonResponse({"text":"Користувач з такою електронною адрессою вже iснує!","result":False})
            else:
                return JsonResponse({"text":"Користувач з таким ім'ям вже iснує!","result":False})
        else:
            return JsonResponse({"text":"Паролi не спiвпадають!","result":False})
        
    return render(request, 'UserPages/registration.html')