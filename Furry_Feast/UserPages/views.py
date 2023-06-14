from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse,HttpResponseGone
from Cart.telegram import bot_send
from Furry_Feast.settings import TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHAT_ID

# Create your views here.
def show_contact(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    if request.method =='POST':
        feedback_text = request.POST.get("feedback-text")
        message = f"Звертання користувача - {request.user.username}: \n \n {feedback_text}"
        print(message)
        bot_send(TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHAT_ID, message)
        return JsonResponse({"result":"true"})
    return render(request, 'UserPages/contact.html',context)

def logout_function(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    logout(request)
    print("logout")
    return render(request,'UserPages/base.html',context)



def show_login(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    if request.method =='POST':
        username = request.POST.get("username")
        password = request.POST.get('password')
        

        user = authenticate(request, username = username, password = password)
        
        if user != None:
            login(request,user)
            return JsonResponse({"text":"Натиснiть щоб перейти до каталогу!","result":True})
        else:
            return JsonResponse({"text":"Iм'я або пароль не спiвпадають!","result":False})
    return render(request, 'UserPages/login.html',context)


def show_registration(request):
    context = {
        "user_name":request.user.username,
        "is_authenticated":request.user.is_authenticated
    }
    if request.method =='POST':
        username = request.POST.get("username")
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')

        if password == confirm_password:
            if not User.objects.filter(username=username):
                if not User.objects.filter(email=email):
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
        
    return render(request, 'UserPages/registration.html',context)