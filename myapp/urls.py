from django.contrib import admin
from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path(r'', views.index, name='index'),
] 