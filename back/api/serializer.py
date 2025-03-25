from rest_framework import serializers
from .models import Cadastro
from .models import Disciplina
from .models import Turma

class CadastroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadastro
        fields = '__all__'
        
class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class TurmasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = '__all__'