from rest_framework import serializers
from .models import Produto, Usuario

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'is_superuser', 'regra']


from rest_framework import serializers
from .models import Loja

class LojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loja
        fields = '__all__'