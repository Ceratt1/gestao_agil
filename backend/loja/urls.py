from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProdutoViewSet, UsuarioViewSet, link_pagamento_whatsapp, CustomAuthToken, listar_ultimos_4produtos, listar_todos_produtos_publico, loja_view, listar_usuarios
from rest_framework.authtoken.views import obtain_auth_token
from .views import UsuarioSchemaView, ProdutoSchemaView

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet, basename='produto')
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('api/', include(router.urls)),
    
    path('usuario-schema/', UsuarioSchemaView.as_view(), name='usuario-schema'),
    path('produto-schema/', ProdutoSchemaView.as_view(), name='produto-schema'),
    
    path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    
    path('registro/', views.registro_view, name='registro'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    
    
    
    path('search_products/', views.search_products, name='search_products'),
    path('get_produto/<uuid:id>/', views.get_produto, name='get_produto'),
    path('listar_produtos/', views.listar_produtos, name='listar_produtos'),
    path('listar_ultimos_4produtos/', views.listar_ultimos_4produtos, name='listar_ultimos_4produtos'),
    path('listar_todos_produtos_publico/', views.listar_todos_produtos_publico, name='listar_todos_produtos_publico'),
    path('link_pagamento_whatsapp/<uuid:produto_id>/', link_pagamento_whatsapp, name='link_pagamento_whatsapp'),
    path('loja/', loja_view, name='loja-view'),
    path('listar_usuarios/', views.listar_usuarios, name='listar_usuarios'),
    

   


]