from django.shortcuts import render

# Create your views here.
def show_contact(request):
    return render(request, 'UserPages/contact.html')


def show_login(request):
    return render(request, 'UserPages/login.html')


def show_registration(request):
    return render(request, 'UserPages/registration.html')