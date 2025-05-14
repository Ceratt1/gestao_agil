from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Produto
from .serializers import ProdutoSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db.models import Q
import json


# View para registrar um novo usuário via API (para frontend React/Next.js)
@csrf_exempt
def registro_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username') or data.get('email')
        email = data.get('email')
        password = data.get('password')
        if not username or not email or not password:
            return JsonResponse({'error': 'Preencha todos os campos.'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Usuário já existe.'}, status=400)
        User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'success': 'Usuário registrado com sucesso!'})
    return JsonResponse({'error': 'Método não permitido.'}, status=405)



# View para login de usuário via API (para frontend React/Next.js)
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username') or data.get('email')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': 'Login realizado com sucesso!'})
        else:
            return JsonResponse({'error': 'Usuário ou senha inválidos.'}, status=400)
    return JsonResponse({'error': 'Método não permitido.'}, status=405)



# View para logout de usuário via API
@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': 'Logout realizado com sucesso!'})
    return JsonResponse({'error': 'Método não permitido.'}, status=405)



# API REST para produtos usando Django REST Framework
class ProdutoViewSet(ModelViewSet):
    queryset = Produto.objects.all().order_by('-id')  # Produtos mais recentes primeiro
    serializer_class = ProdutoSerializer



# Endpoint para buscar produtos por nome ou descrição
# Exemplo de uso no frontend: /api/search_products/?search=nome
def search_products(request):
    query = request.GET.get('search', '')
    if query:
        products = Produto.objects.filter(
            Q(titulo__icontains=query) | Q(descricao__icontains=query)
        )
    else:
        products = Produto.objects.none()
    data = [
        {
            'id': p.id,
            'titulo': p.titulo,
            'descricao': p.descricao,
            'caminho_imagem': p.caminho_imagem,
            'valor': str(p.valor),
        }
        for p in products
    ]
    return JsonResponse({'produtos': data})