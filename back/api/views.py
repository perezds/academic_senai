from django.shortcuts import render
from .models import Cadastro, Disciplina, Turma, Curso, Ambiente
from .serializer import CadastroSerializer, TurmasSerializer, CursoSerializer, AmbienteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework import status,viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny  
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .models import Disciplina
from .serializer import DisciplinaSerializer




@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Cadastro.objects.all()
        serializer = CadastroSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CadastroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def buscar_nome_professor(request):
    termo = request.query_params.get('nome', '')  
    if termo:
        professores = Cadastro.objects.filter(nome__icontains=termo)  
        professores = Cadastro.objects.all()
    
    serializer = CadastroSerializer(professores, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class ProfessoresView(ListCreateAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]


class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]


class ProfessoresSearchView(ListAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['nome']

class DisciplinasView(ListCreateAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]


class DisciplinasDetailView(ListAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]


class DisciplinasSearchView(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]

class TurmasDetailView(ListCreateAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmasSerializer
    permission_classes = [IsAuthenticated]


class TurmasSearchView(RetrieveUpdateDestroyAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmasSerializer
    permission_classes = [IsAuthenticated]

class CursosView(ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]


class CursosDetailView(ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]


class CursosSearchView(RetrieveUpdateDestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

class AmbienteView(ListCreateAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]


class AmbienteDetailView(ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]


class AmbienteSearchView(RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]