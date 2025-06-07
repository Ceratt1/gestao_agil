from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import Produto, Loja, ImagemProduto
from drf_yasg.utils import swagger_auto_schema
from .serializers import ProdutoSerializer, UsuarioSerializer, LojaSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view, action, permission_classes, authentication_classes, parser_classes
)
from rest_framework import status
from django.db.models import Q
import json
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import get_user_model
from urllib.parse import quote
from django.urls import reverse
User = get_user_model()
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings  
import os  
from uuid import uuid4
import boto3

# ================ SWAGGER SCHEMAS =========================

class UsuarioSchemaView(APIView):
    @swagger_auto_schema(responses={200: UsuarioSerializer})
    def get(self, request):
        """Endpoint só para mostrar o schema do Usuario no Swagger"""
        return Response({})

class ProdutoSchemaView(APIView):
    @swagger_auto_schema(responses={200: ProdutoSerializer})
    def get(self, request):
        """Endpoint só para mostrar o schema do Produto no Swagger"""
        return Response({})

# ========================= AUTENTICAÇÃO E USUÁRIO =========================

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
    """
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': 'Logout realizado com sucesso!'})
    return JsonResponse({'error': 'Método não permitido.'}, status=405)

# ========================= PERMISSÃO CUSTOMIZADA =========================

class IsAdminOrStaffOrRegraAdmin(BasePermission):
    """
    Permite apenas admin, staff ou regra='ADMIN' para métodos de escrita.
    """
    def has_permission(self, request, view):
        user = request.user
        return (
            user and user.is_authenticated and
            (user.is_staff or getattr(user, 'regra', None) == 'ADMIN')
        )

class IsAdminOrStaffOrReadOnly(BasePermission):
    """
    Permite apenas leitura para todos.
    Só permite POST, PUT, PATCH, DELETE para staff ou admin (regra='ADMIN').
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        return (
            user and user.is_authenticated and
            (user.is_staff or getattr(user, 'regra', None) == 'ADMIN')
        )

# ========================= USUÁRIO VIEWSET =========================

class UsuarioViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
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

    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated])
    def atualizar_perfil(self, request):
        """Atualiza perfil do usuário autenticado."""
        user = request.user
        data = request.data
        user.email = data.get('email', user.email)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()
        return Response({'success': 'Perfil atualizado com sucesso!'})

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
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

    @action(detail=False, methods=['delete'], permission_classes=[IsAuthenticated])
    def deletar_conta(self, request):
        """Deleta a conta do usuário autenticado."""
        user = request.user
        user.delete()
        return Response({'success': 'Conta deletada com sucesso!'})

    # --- ADMIN ONLY ENDPOINTS ---
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[IsAdminOrStaffOrRegraAdmin]
    )
    def listar_todos(self, request):
        """Lista todos os usuários (apenas admin/staff/regra ADMIN)."""
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

    @action(
        detail=True,
        methods=['delete'],
        permission_classes=[IsAdminOrStaffOrRegraAdmin]
    )
    def deletar_usuario(self, request, pk=None):
        """Deleta um usuário pelo ID (apenas admin/staff/regra ADMIN)."""
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({'success': 'Usuário deletado com sucesso!'})
        except User.DoesNotExist:
            return Response({'error': 'Usuário não encontrado.'}, status=404)

    @action(
        detail=True,
        methods=['put'],
        permission_classes=[IsAdminOrStaffOrRegraAdmin]
    )
    def atualizar_usuario(self, request, pk=None):
        """Atualiza um usuário pelo ID."""
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'error': 'Erro ao atualizar'}, status=400)
        serializer = UsuarioSerializer(user, data=request.data, partial=True)  # partial=True permite atualização parcial
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Usuário atualizado com sucesso!'})
        return Response(serializer.errors, status=400)

# ========================= LISTAR USUÁRIOS (API Simples) =========================

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminOrStaffOrRegraAdmin])
def listar_usuarios(request):
    """
    GET /listar_usuarios/
    Lista todos os usuários com URLs de edição/exclusão.
    """
    users = User.objects.all().order_by('-id')
    data = [
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'regra': getattr(user, 'regra', None),
            'url_editar': request.build_absolute_uri(
                reverse('usuario-detail', kwargs={'pk': user.id})
            ),
            'url_excluir': request.build_absolute_uri(
                reverse('usuario-detail', kwargs={'pk': user.id})
            ),
        }
        for user in users
    ]
    return Response({'usuarios': data}, status=status.HTTP_200_OK)

# ========================= PRODUTOS =========================

class ProdutoViewSet(ModelViewSet):
    queryset = Produto.objects.all().order_by('-id')
    serializer_class = ProdutoSerializer
    permission_classes = [IsAdminOrStaffOrReadOnly]

def search_products(request):
    """
    GET /search_products/?search=nome&preco_min=10&preco_max=100
    Busca produtos por nome, descrição e faixa de preço.
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
    """
    try:
        produto = Produto.objects.get(id=id)
        serializer = ProdutoSerializer(produto)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado'}, status=404)
    

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAdminOrStaffOrRegraAdmin])
def listar_produtos(request):
    """
    GET /listar_produtos/           -> Lista todos os produtos
    GET /listar_produtos/?id=...    -> Detalhe de um produto
    POST /listar_produtos/          -> Cria novo produto
    PUT /listar_produtos/?id=...    -> Atualiza produto pelo ID
    DELETE /listar_produtos/?id=... -> Deleta produto pelo ID
    """
    produto_id = request.query_params.get('id')

    if request.method == 'GET':
        if produto_id:
            try:
                produto = Produto.objects.get(id=produto_id)
            except Produto.DoesNotExist:
                return Response({'error': 'Produto não encontrado.'}, status=404)
            imagens = [
                {
                    'id': img.id,
                    'imagem': img.imagem.url if img.imagem else None,  # <-- agora retorna a URL pública
                    'descricao': getattr(img, 'descricao', ''),
                }
                for img in produto.imagens.all()
            ]
            data = {
                'id': produto.id,
                'titulo': produto.titulo,
                'descricao': produto.descricao,
                'valor': str(produto.valor),
                'categoria': produto.categoria,
                'imagens': imagens,
                'url_editar': request.build_absolute_uri(
                    reverse('produto-detail', args=[produto.id])
                ),
                'url_excluir': request.build_absolute_uri(
                    reverse('produto-detail', args=[produto.id])
                ),
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            produtos = Produto.objects.all().order_by('-id')
            data = []
            for produto in produtos:
                imagens = [
                    {
                        'id': img.id,
                        'imagem': img.imagem.url if img.imagem else None,  # <-- agora retorna a URL pública
                        'descricao': getattr(img, 'descricao', ''),
                    }
                    for img in produto.imagens.all()
                ]
                data.append({
                    'id': produto.id,
                    'titulo': produto.titulo,
                    'descricao': produto.descricao,
                    'valor': str(produto.valor),
                    'categoria': produto.categoria,
                    'imagens': imagens,
                    'url_editar': request.build_absolute_uri(
                        reverse('produto-detail', args=[produto.id])
                    ),
                    'url_excluir': request.build_absolute_uri(
                        reverse('produto-detail', args=[produto.id])
                    ),
                })
            return Response({'produtos': data}, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer = ProdutoSerializer(data=request.data)
        if serializer.is_valid():
            produto = serializer.save()
            return Response({'success': 'Produto criado com sucesso!', 'id': produto.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)

    produto_id = request.query_params.get('id')
    if not produto_id:
        return Response({'error': 'ID do produto não informado.'}, status=400)

    try:
        produto = Produto.objects.get(id=produto_id)
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado.'}, status=404)

    if request.method == 'PUT':
        serializer = ProdutoSerializer(produto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Produto atualizado com sucesso!'})
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        produto.delete()
        return Response({'success': 'Produto deletado com sucesso!'})

@api_view(['GET'])
def listar_todos_produtos_publico(request):
    """
    GET /listar_todos_produtos_publico/
    Lista todos os produtos do mais recente para o mais antigo (dados públicos).
    """
    produtos = Produto.objects.all().order_by('-id')
    data = []
    for produto in produtos:
        imagens = [
            {
                'id': img.id,
                'imagem': img.imagem.url if img.imagem else None,  # <-- agora retorna a URL pública
                'descricao': getattr(img, 'descricao', ''),
            }
            for img in produto.imagens.all()
        ]
        # Adiciona campo imagem principal (primeira imagem)
        imagem_principal = imagens[0]['imagem'] if imagens else None
        data.append({
            'id': produto.id,
            'titulo': produto.titulo,
            'descricao': produto.descricao,
            'valor': str(produto.valor),
            'categoria': produto.categoria,
            'imagens': imagens,
            'imagem': imagem_principal,  # <-- aqui!
        })
    return Response({'produtos': data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def listar_ultimos_4produtos(request):
    """
    GET /listar_ultimos_4produtos/
    Lista os 4 produtos mais recentes (dados públicos).
    """
    produtos = Produto.objects.all().order_by('-id')[:4]
    data = []
    for produto in produtos:
        imagens = [
            {
                'id': img.id,
                'imagem': img.imagem,  # <-- só retorna a URL salva
                'descricao': getattr(img, 'descricao', ''),
            }
            for img in produto.imagens.all()
        ]
        imagem_principal = imagens[0]['imagem'] if imagens else None
        data.append({
            'id': produto.id,
            'titulo': produto.titulo,
            'descricao': produto.descricao,
            'valor': str(produto.valor),
            'categoria': produto.categoria,
            'imagens': imagens,           # <-- todas as imagens para o carrossel
            'imagem': imagem_principal,   # <-- mantém para compatibilidade
        })
    return Response({'produtos': data}, status=status.HTTP_200_OK)

# ========================= INTEGRAÇÕES E OUTROS =========================

@api_view(['GET'])
def link_pagamento_whatsapp(request, produto_id):
    """
    Gera um link do WhatsApp para o número da loja com mensagem sobre o produto selecionado.
    """
    try:
        produto = Produto.objects.get(id=produto_id)
        loja = Loja.objects.first()
        if not loja or not loja.whatsapp:
            return Response({'error': 'A loja não possui WhatsApp cadastrado.'}, status=400)
        mensagem = f"Olá! Tenho interesse no produto: {produto.titulo} - {produto.valor}"
        link = f"https://wa.me/55{loja.whatsapp}?text={quote(mensagem)}"
        return Response({'link': link})
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado.'}, status=404)

@api_view(['GET', 'PUT', 'PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminOrStaffOrRegraAdmin])
def loja_view(request):
    """
    GET: Retorna os dados da loja (primeira linha).
    PUT/PATCH: Atualiza os dados da loja.
    """
    loja = Loja.objects.first()
    if not loja:
        return Response({'error': 'Nenhuma loja cadastrada.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LojaSerializer(loja)
        return Response(serializer.data)

    if request.method in ['PUT', 'PATCH']:
        serializer = LojaSerializer(loja, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_imagem_produto(request):
    produto_id = request.POST.get('produto_id')
    if not produto_id:
        return Response({'error': 'produto_id é obrigatório.'}, status=400)
    try:
        produto = Produto.objects.get(id=produto_id)
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado.'}, status=404)

    imagens = request.FILES.getlist('imagens')
    if not imagens:
        return Response({'error': 'Nenhuma imagem enviada.'}, status=400)
    if len(imagens) > 5:
        return Response({'error': 'Máximo de 5 imagens.'}, status=400)

    caminhos = []
    for img in imagens:
        obj = ImagemProduto.objects.create(produto=produto, imagem=img)
        caminhos.append(obj.imagem.url)  # URL pública do S3

    return Response({'imagens': caminhos}, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@parser_classes([MultiPartParser, FormParser])
def imagem_produto_detail(request, imagem_id):
    """
    GET: Retorna os dados da imagem.
    PUT/PATCH: Atualiza a imagem (arquivo) e/ou descrição.
    DELETE: Remove a imagem do produto.
    """
    try:
        imagem = ImagemProduto.objects.get(id=imagem_id)
    except ImagemProduto.DoesNotExist:
        return Response({'error': 'Imagem não encontrada.'}, status=404)

    # GET
    if request.method == 'GET':
        data = {
            'id': imagem.id,
            'imagem': imagem.imagem.url if imagem.imagem else None,  # URL pública do S3
            'descricao': imagem.descricao,
            'produto_id': imagem.produto_id,
        }
        return Response(data)

    # PUT/PATCH
    if request.method in ['PUT', 'PATCH']:
        nova_imagem = request.FILES.get('imagem')
        descricao = request.data.get('descricao')
        alterado = False

        if nova_imagem:
            imagem.imagem = nova_imagem
            alterado = True

        if descricao is not None:
            imagem.descricao = descricao
            alterado = True

        if alterado:
            imagem.save()
            return Response({'success': 'Imagem atualizada com sucesso!'})
        else:
            return Response({'error': 'Nada para atualizar.'}, status=400)

    # DELETE
    if request.method == 'DELETE':
        imagem.delete()
        return Response({'success': 'Imagem deletada com sucesso!'})