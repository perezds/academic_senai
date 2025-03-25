from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('id/<int:pk>', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('buscar/nome/', buscar_nome_professor),
    path('search/', ProfessoresSearchView.as_view()),
    path('disciplinas', DisciplinasView.as_view()),
    path('disciplina', DisciplinasDetailView.as_view()),
    path('disciplina/<int:pk>', DisciplinasSearchView.as_view()),
    path('turmas', TurmasDetailView.as_view()),
    path('turmas/<int:pk>', TurmasSearchView.as_view()),
]