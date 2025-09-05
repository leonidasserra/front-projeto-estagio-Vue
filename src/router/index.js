import CadastroFilme from '@/pages/CadastroFilme.vue';
import CadastroPessoa from '@/pages/CadastroPessoa.vue';
import CadastroUsuario from '@/pages/CadastroUsuario.vue';
import FazerAluguel from '@/pages/FazerAluguel.vue';
import FilmeDetalhes from '@/pages/FilmeDetalhes.vue';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Pessoas from '@/pages/Pessoas.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { isTokenValid } from '../assets/auth.js';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresSidebar: false, requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register', 
    component: CadastroUsuario,
    meta: { requiresSidebar: false, requiresAuth: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresSidebar: true, requiresAuth: true }
  },
  {
    path: '/filme-detalhes',
    name: 'FilmeDetalhes',
    component: FilmeDetalhes,
    meta: { requiresSidebar: true, requiresAuth: true }
  },
  {
    path: '/fazer-aluguel',
    name: 'FazerAluguel',
    component: FazerAluguel,
    meta: { requiresSidebar: true, requiresAuth: true }
  },
  {
    path: '/clientes',
    name: 'Pessoas',
    component: Pessoas,
    meta: { requiresSidebar: true, requiresAuth: true }
  },
  {
    path: '/novo-cliente',
    name: 'CadastroPessoa',
    component: CadastroPessoa,
    meta: { requiresSidebar: true, requiresAuth: true }
  },
  {
    path: '/novo-filme',
    name: 'CadastroFilme',
    component: CadastroFilme,
    meta: { requiresSidebar: true, requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  // Verifica se a rota para a qual o usuário está navegando requer autenticação
  if (to.meta.requiresAuth) {

    const tokenIsValid = isTokenValid(); 

    // Se o token não for válido, redireciona para a página de login
    if (!tokenIsValid) {
      next({ name: 'Login' });
    } else {
      // Se o token for válido, a navegação pode prosseguir
      next();
    }
  } else {
    // Se a rota não requer autenticação (ex: /login, /register), permite a navegação
    next();
  }
});

export default router;