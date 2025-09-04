import CadastroFilme from '@/pages/CadastroFilme.vue';
import CadastroPessoa from '@/pages/CadastroPessoa.vue';
import CadastroUsuario from '@/pages/CadastroUsuario.vue';
import FazerAluguel from '@/pages/FazerAluguel.vue';
import FilmeDetalhes from '@/pages/FilmeDetalhes.vue';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Pessoas from '@/pages/Pessoas.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresSidebar: false }
  },
  {
    path: '/register',
    component: CadastroUsuario,
    meta: { requiresSidebar: false }
  },
  {
    path: '/home',
    component: Home,
    meta: { requiresSidebar: true }
  },
  {
    path: '/filme-detalhes',
    name: 'FilmeDetalhes',
    component: FilmeDetalhes,
    meta: { requiresSidebar: true }
  },
  {
    path: '/fazer-aluguel',
    name: 'FazerAluguel',
    component: FazerAluguel,
    meta: { requiresSidebar: true }
  },
  {
    path: '/clientes',
    name: 'Pessoas',
    component: Pessoas,
    meta: { requiresSidebar: true }
  },

  {
    path: '/novo-cliente',
    name: 'CadastroPessoa',
    component: CadastroPessoa,
    meta: { requiresSidebar: true }
  },
  {
    path: '/novo-filme',
    name: 'CadastroFilme',
    component: CadastroFilme,
    meta: { requiresSidebar: true }
  },
//   {
//     path: '/login',
//     name: 'login',
//     component: Login
//   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
