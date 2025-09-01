import CadastroFilme from '@/pages/CadastroFilme.vue';
import CadastroPessoa from '@/pages/CadastroPessoa.vue';
import FazerAluguel from '@/pages/FazerAluguel.vue';
import FilmeDetalhes from '@/pages/FilmeDetalhes.vue';
import Home from '@/pages/Home.vue';
import Pessoas from '@/pages/Pessoas.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',

  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/filme-detalhes',
    name: 'FilmeDetalhes',
    component: FilmeDetalhes
  },
  {
    path: '/fazer-aluguel',
    name: 'FazerAluguel',
    component: FazerAluguel
  },
  {
    path: '/clientes',
    name: 'Pessoas',
    component: Pessoas
  },

  {
    path: '/novo-cliente',
    name: 'CadastroPessoa',
    component: CadastroPessoa
  },
  {
    path: '/novo-filme',
    name: 'CadastroFilme',
    component: CadastroFilme
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
