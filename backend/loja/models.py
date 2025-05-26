from django.db import models
from django.contrib.auth.models import AbstractUser
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

    def __str__(self):
        return self.email

class Loja(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True)
    whatsapp = models.CharField(max_length=20, help_text="Somente números, com DDD. Ex: 51999999999")
    email = models.EmailField(blank=True)
    telefone = models.CharField(max_length=20, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    estado = models.CharField(max_length=50, blank=True)
    cep = models.CharField(max_length=20, blank=True)
    horario_funcionamento = models.CharField(max_length=255, blank=True)
    instagram = models.URLField(blank=True)
    facebook = models.URLField(blank=True)

    def __str__(self):
        return self.nome

class ImagemProduto(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    produto = models.ForeignKey(Produto, related_name='imagens', on_delete=models.CASCADE)
    imagem = models.CharField(max_length=512)  # ou models.ImageField(upload_to='produtos/') se usar upload real
    descricao = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Imagem de {self.produto.titulo}"