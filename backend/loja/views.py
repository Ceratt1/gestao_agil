from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import Produto
from drf_yasg.utils import swagger_auto_schema
from .serializers import ProdutoSerializer, UsuarioSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework import status, permissions
from django.db.models import Q
import json
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model
from urllib.parse import quote
from django.urls import reverse
User = get_user_model()
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token



# Python versão: 3.12.10




# Definindo os Schemas do usuário para o Swagger
class UsuarioSchemaView(APIView):
    @swagger_auto_schema(
        responses={200: UsuarioSerializer}
    )
    def get(self, request):
        """Endpoint só para mostrar o schema do Usuario no Swagger"""
        return Response({})
    
class ProdutoSchemaView(APIView):
    @swagger_auto_schema(
        responses={200: ProdutoSerializer}
    )
    def get(self, request):
        """Endpoint só para mostrar o schema do Produto no Swagger"""
        return Response({})
    



# ============================================================
# AUTENTICAÇÃO E USUÁRIO
# ============================================================

# Ver este Schema aqui.
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'username': user.username,
        })

    
    
    


@csrf_exempt
def registro_view(request):
    """
    POST /registro/
    Cadastra um novo usuário.
    Body esperado:
        {
            "username": "usuario",
            "email": "email@exemplo.com",
            "password": "senha"
        }
    Resposta:
        {"success": "Usuário registrado com sucesso!"}
        {"error": "..."}
    """
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

@csrf_exempt
def login_view(request):
    """
    POST /login/
    Realiza login do usuário.
    Body esperado:
        {
            "username": "usuario" ou "email": "email@exemplo.com",
            "password": "senha"
        }
    Resposta:
        {"success": "Login realizado com sucesso!"}
        {"error": "..."}
    """
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

@csrf_exempt
def logout_view(request):
    """
    POST /logout/
    Faz logout do usuário autenticado.
    Resposta:
        {"success": "Logout realizado com sucesso!"}
        {"error": "..."}
    """
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': 'Logout realizado com sucesso!'})
    return JsonResponse({'error': 'Método não permitido.'}, status=405)





class UsuarioViewSet(ViewSet):
    """
    ViewSet para operações REST de usuário.
    - GET /api/usuarios/me/           (dados do usuário autenticado)
    - PUT /api/usuarios/atualizar_perfil/ (atualiza perfil)
    - POST /api/usuarios/alterar_senha/   (altera senha)
    - DELETE /api/usuarios/deletar_conta/ (deleta conta)
    - GET /api/usuarios/listar_todos/     (admin: lista todos)
    - DELETE /api/usuarios/{id}/deletar_usuario/ (admin: deleta)
    - PUT /api/usuarios/{id}/atualizar_usuario/  (admin: atualiza)
    """
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Retorna dados do usuário autenticado."""
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
        """Atualiza perfil do usuário autenticado."""
        user = request.user
        data = request.data
        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()
        return Response({'success': 'Perfil atualizado com sucesso!'})

    @action(detail=False, methods=['post'])
    def alterar_senha(self, request):
        """Altera senha do usuário autenticado."""
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
        """Deleta a conta do usuário autenticado."""
        user = request.user
        user.delete()
        return Response({'success': 'Conta deletada com sucesso!'})

    # --- ADMIN ONLY ENDPOINTS ---
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def listar_todos(self, request):
        """Lista todos os usuários (apenas admin)."""
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
        """Deleta um usuário pelo ID (apenas admin)."""
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({'success': 'Usuário deletado com sucesso!'})
        except User.DoesNotExist:
            return Response({'error': 'Usuário não encontrado.'}, status=404)

    @action(detail=True, methods=['put'], permission_classes=[IsAdminUser])
    def atualizar_usuario(self, request, pk=None):
        """Atualiza um usuário pelo ID (apenas admin)."""
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

@api_view(['GET'])
def listar_usuarios(request):
    """
    GET /listar_usuarios/
    Lista todos os usuários com URLs de edição/exclusão.
    Resposta:
        {
            "usuarios": [
                {
                    "id": ...,
                    "username": "...",
                    "email": "...",
                    "first_name": "...",
                    "last_name": "...",
                    "regra": "...",
                    "contato_whatsapp": "...",
                    "url_editar": "...",
                    "url_excluir": "..."
                }
            ]
        }
    """
    users = User.objects.all().order_by('-id')
    data = [
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'regra': getattr(user, 'regra', None),
            'contato_whatsapp': getattr(user, 'contato_whatsapp', None),
            'url_editar': request.build_absolute_uri(
                reverse('usuario-detail', args=[user.id])
            ),
            'url_excluir': request.build_absolute_uri(
                reverse('usuario-detail', args=[user.id])
            ),
        }
        for user in users
    ]
    return Response({'usuarios': data}, status=status.HTTP_200_OK)



        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
# ============================================================
# PRODUTOS
# ============================================================

class IsAdminOrStaffOrReadOnly(BasePermission):
    """
    Permite apenas leitura para todos.
    Só permite POST, PUT, PATCH, DELETE para staff ou admin (regra='ADMIN').
    """
    def has_permission(self, request, view):
        # Métodos de leitura são sempre permitidos
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        # Só permite se for staff ou regra ADMIN
        return (
            user and user.is_authenticated and
            (user.is_staff or getattr(user, 'regra', None) == 'ADMIN')
        )
    
class ProdutoViewSet(ModelViewSet):
    """
    ViewSet padrão do DRF para produtos.
    - GET    /api/produtos/
    - POST   /api/produtos/
    - GET    /api/produtos/{id}/
    - PUT    /api/produtos/{id}/
    - PATCH  /api/produtos/{id}/
    - DELETE /api/produtos/{id}/
    """
    queryset = Produto.objects.all().order_by('-id')
    serializer_class = ProdutoSerializer
    ppermission_classes = [IsAdminOrStaffOrReadOnly]

def search_products(request):
    """
    GET /search_products/?search=nome&preco_min=10&preco_max=100
    Busca produtos por nome, descrição e faixa de preço.
    Query params:
        search: termo de busca (opcional)
        preco_min: valor mínimo (opcional)
        preco_max: valor máximo (opcional)
    Resposta:
        {
            "produtos": [
                {
                    "id": ...,
                    "titulo": "...",
                    "descricao": "...",
                    "caminho_imagem": "...",
                    "valor": "..."
                }
            ]
        }
    """
    query = request.GET.get('search', '')
    preco_min = request.GET.get('preco_min')
    preco_max = request.GET.get('preco_max')

    filters = Q()
    if query:
        filters &= Q(titulo__icontains=query) | Q(descricao__icontains=query)
    if preco_min:
        filters &= Q(valor__gte=preco_min)
    if preco_max:
        filters &= Q(valor__lte=preco_max)

    products = Produto.objects.filter(filters)
    data = [
        {
            'id': p.id,
            'titulo': p.titulo,
            'descricao': p.descricao,
            'caminho_imagem': p.caminho_imagem,
            'valor': str(p.valor),
            'categoria': p.categoria,
        }
        for p in products
    ]
    return JsonResponse({'produtos': data})

@api_view(['GET'])
def get_produto(request, id):
    """
    GET /get_produto/<id>/
    Retorna os detalhes de um produto específico pelo ID.
    Resposta:
        {
            "id": ...,
            "titulo": "...",
            "descricao": "...",
            "valor": "...",
            "caminho_imagem": "..."
        }
    """
    try:
        produto = Produto.objects.get(id=id)
        serializer = ProdutoSerializer(produto)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado'}, status=404)

@api_view(['GET'])
def listar_produtos(request):
    """
    GET /listar_produtos/
    Lista todos os produtos com URLs de edição/exclusão.
    Resposta:
        {
            "produtos": [
                {
                    "id": ...,
                    "titulo": "...",
                    "descricao": "...",
                    "valor": "...",
                    "caminho_imagem": "...",
                    "url_editar": "...",
                    "url_excluir": "..."
                }
            ]
        }
    """
    produtos = Produto.objects.all().order_by('-id')
    data = [
        {
            'id': produto.id,
            'titulo': produto.titulo,
            'descricao': produto.descricao,
            'valor': str(produto.valor),
            'caminho_imagem': produto.caminho_imagem,
            'categoria': produto.categoria, 
            'url_editar': request.build_absolute_uri(
                reverse('produto-detail', args=[produto.id])
            ),
            'url_excluir': request.build_absolute_uri(
                reverse('produto-detail', args=[produto.id])
            ),
        }
        for produto in produtos
    ]
    return Response({'produtos': data}, status=status.HTTP_200_OK)



@api_view(['GET'])
def listar_todos_produtos_publico(request):
    """
    GET /listar_todos_produtos_publico/
    Lista todos os produtos do mais recente para o mais antigo (dados públicos).
    Resposta:
        {
            "produtos": [
                {
                    "id": ...,
                    "titulo": "...",
                    "descricao": "...",
                    "valor": "...",
                    "caminho_imagem": "...",
                    "categoria": "..."
                }
            ]
        }
    """
    produtos = Produto.objects.all().order_by('-id')
    data = [
        {
            'id': produto.id,
            'titulo': produto.titulo,
            'descricao': produto.descricao,
            'valor': str(produto.valor),
            'caminho_imagem': produto.caminho_imagem,
            'categoria': produto.categoria,  # <-- ADICIONE ESTA LINHA
        }
        for produto in produtos
    ]
    return Response({'produtos': data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def listar_ultimos_4produtos(request):
    """
    GET /listar_todos_produtos_publico/
    Lista todos os produtos do mais recente para o mais antigo (dados públicos).
    Resposta:
        {
            "produtos": [
                {
                    "id": ...,
                    "titulo": "...",
                    "descricao": "...",
                    "valor": "...",
                    "caminho_imagem": "..."
                }
            ]
        }
    """
    produtos = Produto.objects.all().order_by('-id')[:4]
    data = [
        {
            'id': produto.id,
            'titulo': produto.titulo,
            'descricao': produto.descricao,
            'valor': str(produto.valor),
            'caminho_imagem': produto.caminho_imagem,
            'categoria': produto.categoria, 
        }
        for produto in produtos
    ]
    return Response({'produtos': data}, status=status.HTTP_200_OK)

# ============================================================
# INTEGRAÇÕES E OUTROS
# ============================================================

@api_view(['GET'])
def link_pagamento_whatsapp(request, produto_id):
    
    """
    Gera um link do WhatsApp para o admin com mensagem sobre o produto selecionado.
    Resposta:
        {"link": "https://wa.me/55<whatsapp_admin>?text=Olá! Tenho interesse no produto: ..."}
        {"error": "..."}
    """
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