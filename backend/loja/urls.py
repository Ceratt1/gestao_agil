from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProdutoViewSet, UsuarioViewSet, link_pagamento_whatsapp

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet, basename='produto')
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('registro/', views.registro_view, name='registro'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('api/', include(router.urls)),  
    path('search_products/', views.search_products, name='search_products'),
    path('link_pagamento_whatsapp/<int:produto_id>/', link_pagamento_whatsapp, name='link_pagamento_whatsapp'),

]