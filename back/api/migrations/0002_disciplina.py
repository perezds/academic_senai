# Generated by Django 5.1.7 on 2025-03-17 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Disciplina',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('disciplina', models.CharField(max_length=50)),
                ('sigla', models.CharField(max_length=5)),
                ('curso', models.CharField(max_length=50)),
                ('semestre', models.CharField(max_length=1)),
                ('carga_horaria', models.FloatField()),
            ],
        ),
    ]
