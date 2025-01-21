from django.urls import path
from .views import listar_professores

urlpatterns = [
    path('professores', listar_professores),
]


