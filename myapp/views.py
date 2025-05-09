from django.shortcuts import render
from django.http import HttpResponse
import requests

def index(request):
    a=9**0.5
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    bc={}
    bc['sqr']=a
    bc['ipp']=ip
    return render(request, 'index.html',bc) 