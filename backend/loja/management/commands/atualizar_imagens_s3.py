from django.core.management.base import BaseCommand
from django.conf import settings
from loja.models import ImagemProduto

class Command(BaseCommand):
    help = 'Atualiza imagens antigas para URL completa do S3'

    def handle(self, *args, **kwargs):
        bucket_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/"
        atualizados = 0
        for img in ImagemProduto.objects.all():
            if img.imagem and not img.imagem.startswith("http"):
                path = img.imagem.lstrip("/")
                img.imagem = bucket_url + path
                img.save()
                atualizados += 1
        self.stdout.write(self.style.SUCCESS(f"{atualizados} imagens atualizadas para URL do S3."))