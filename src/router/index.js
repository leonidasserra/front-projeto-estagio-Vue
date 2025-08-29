import FazerAluguel from '@/pages/FazerAluguel.vue';
import FilmeDetalhes from '@/pages/FilmeDetalhes.vue';
import Home from '@/pages/Home.vue';
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
//   {
//     path: '/novo-cliente',
//     name: 'novo-cliente',
//     component: NovoCliente
//   },
//   {
//     path: '/novo-filme',
//     name: 'novo-filme',
//     component: NovoFilme
//   },
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
