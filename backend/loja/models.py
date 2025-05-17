from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
class Produto(models.Model):
    class Categoria(models.TextChoices):
        BOLSO = 'Bolso', 'Bolso'
        MESA = 'Mesa', 'Mesa'
        PAREDE = 'Parede', 'Parede'
        PULSO = 'Pulso', 'Pulso'
        TORRE = 'Torre', 'Torre'
        TODAS = 'Todas', 'Todas'
        CORDA = 'Corda', 'Corda'
        MECANICO_AUTOMATICO = 'Automatico', 'Automatico'
        MECANICO_BATERIA = 'Bateria', 'Bateria'
        SOLAR = 'Solar', 'Solar'
        QUARTZO = 'Quartzo', 'Quartzo'

    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    caminho_imagem = models.CharField(max_length=512)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(
        max_length=20,
        choices=Categoria.choices,
        default=Categoria.TODAS
    )

    def __str__(self):
        return self.titulo

class Usuario(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    class Regra(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        REGULAR = 'REGULAR', 'Regular'

    regra = models.CharField(max_length=10, choices=Regra.choices, default=Regra.REGULAR)
    contato_whatsapp = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.email