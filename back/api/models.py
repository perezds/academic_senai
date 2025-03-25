from django.db import models

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()

class Disciplina(models.Model):
    disciplina = models.CharField(max_length=50)
    sigla = models.CharField(max_length=5)
    curso = models.CharField(max_length=50)
    semestre = models.CharField(max_length=1)
    carga_horaria = models.FloatField()

class Turma(models.Model):
    codigo = models.CharField(max_length=10)
    turma = models.CharField(max_length=10)

    
class Turma(models.Model):
    codigo = models.CharField(max_length=10)
    curso = models.CharField(max_length=10)

    def __str__(self):
        return self.nome