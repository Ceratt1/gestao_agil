from rest_framework import serializers
from .models import Produto, Usuario

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Usuario
        fields = ['uuid', 'username', 'email', 'is_superuser', 'contato_whatsapp']