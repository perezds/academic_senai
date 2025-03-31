from django.db import models

class Disciplina(models.Model):
    nome_completo = models.CharField(max_length=100)
    sigla = models.CharField(max_length=10)

    def __str__(self):
        return self.nome_completo

    def __str__(self):
        return self.Código