import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
//   {
//     path: '/home',
//     name: 'home',
//     component: Home
//   },
//   {
//     path: '/clientes',
//     name: 'clientes',
//     component: Clientes
//   },
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
