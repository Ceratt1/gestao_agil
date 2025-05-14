from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class Produto(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    caminho_imagem = models.CharField(max_length=512)
    valor = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.titulo

class Usuario(AbstractUser):
    class Regra(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        REGULAR = 'REGULAR', 'Regular'

    regra = models.CharField(max_length=10, choices=Regra.choices, default=Regra.REGULAR)
    contato_whatsapp = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.email