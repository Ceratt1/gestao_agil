from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import Produto
from .serializers import ProdutoSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework import status, permissions
from django.db.models import Q
import json
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model
from urllib.parse import quote



User = get_user_model()
# -----------------------------------------------
# View para registrar um novo usuário via API (para frontend React/Next.js)
# -----------------------------------------------
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
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email já cadastrado.'}, status=400)
        User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'success': 'Usuário registrado com sucesso!'})
    return JsonResponse({'error': 'Método não permitido.'}, status=405)

# -----------------------------------------------
# View para login de usuário via API (para frontend React/Next.js)
# -----------------------------------------------
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

# -----------------------------------------------
# View para logout de usuário via API
# -----------------------------------------------
@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': 'Logout realizado com sucesso!'})
    return JsonResponse({'error': 'Método não permitido.'}, status=405)

# -----------------------------------------------
# API REST para produtos usando Django REST Framework
# -----------------------------------------------
class ProdutoViewSet(ModelViewSet):
    queryset = Produto.objects.all().order_by('-id')  # Produtos mais recentes primeiro
    serializer_class = ProdutoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Só autenticados podem criar/editar/deletar

# -----------------------------------------------
# Endpoint para buscar produtos por nome ou descrição
# Exemplo de uso no frontend: /search_products/?search=nome
# -----------------------------------------------
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

# -----------------------------------------------
# Endpoint para buscar produtos por ID
# -----------------------------------------------
@api_view(['GET'])
def get_produto(request, id):
    try:
        produto = Produto.objects.get(id=id)
        serializer = ProdutoSerializer(produto)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado'}, status=404)

# -----------------------------------------------
#  API REST para usuarios usando Django REST Framework
# -----------------------------------------------
class UsuarioViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'regra': getattr(user, 'regra', None),
            'contato_whatsapp': getattr(user, 'contato_whatsapp', None),
        })

    @action(detail=False, methods=['put'])
    def atualizar_perfil(self, request):
        user = request.user
        data = request.data
        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()
        return Response({'success': 'Perfil atualizado com sucesso!'})

    @action(detail=False, methods=['post'])
    def alterar_senha(self, request):
        user = request.user
        senha_atual = request.data.get('senha_atual')
        nova_senha = request.data.get('nova_senha')
        if not user.check_password(senha_atual):
            return Response({'error': 'Senha atual incorreta.'}, status=400)
        user.set_password(nova_senha)
        user.save()
        return Response({'success': 'Senha alterada com sucesso!'})

    @action(detail=False, methods=['delete'])
    def deletar_conta(self, request):
        user = request.user
        user.delete()
        return Response({'success': 'Conta deletada com sucesso!'})

    # --- ADMIN ONLY ENDPOINTS ---
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def listar_todos(self, request):
        users = User.objects.all()
        data = [
            {
                'id': u.id,
                'username': u.username,
                'email': u.email,
                'first_name': u.first_name,
                'last_name': u.last_name,
                'regra': getattr(u, 'regra', None),
                'contato_whatsapp': getattr(u, 'contato_whatsapp', None),
            }
            for u in users
        ]
        return Response({'usuarios': data})

    @action(detail=True, methods=['delete'], permission_classes=[IsAdminUser])
    def deletar_usuario(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({'success': 'Usuário deletado com sucesso!'})
        except User.DoesNotExist:
            return Response({'error': 'Usuário não encontrado.'}, status=404)

    @action(detail=True, methods=['put'], permission_classes=[IsAdminUser])
    def atualizar_usuario(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            data = request.data
            user.email = data.get('email', user.email)
            user.first_name = data.get('first_name', user.first_name)
            user.last_name = data.get('last_name', user.last_name)
            user.regra = data.get('regra', getattr(user, 'regra', None))
            user.contato_whatsapp = data.get('contato_whatsapp', getattr(user, 'contato_whatsapp', None))
            user.save()
            return Response({'success': 'Usuário atualizado com sucesso!'})
        except User.DoesNotExist:
            return Response({'error': 'Usuário não encontrado.'}, status=404)
        


# -----------------------------------------------
# Endpoint para gerar link de pagamento via WhatsApp
# Exemplo de uso no frontend: /link_pagamento_whatsapp/<produto_id>/
# -----------------------------------------------
@api_view(['GET'])
def link_pagamento_whatsapp(request, produto_id):
    try:
        produto = Produto.objects.get(id=produto_id)
        admin = User.objects.filter(is_superuser=True).first()
        if not admin or not admin.contato_whatsapp:
            return Response({'error': 'Admin não possui WhatsApp cadastrado.'}, status=400)
        mensagem = f"Olá! Tenho interesse no produto: {produto.titulo} - {produto.valor}"
        link = f"https://wa.me/55{admin.contato_whatsapp}?text={quote(mensagem)}"
        return Response({'link': link})
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado.'}, status=404)