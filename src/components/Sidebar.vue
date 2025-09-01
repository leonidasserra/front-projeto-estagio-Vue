
<template>
<div class="sidebar">


  <ul>
    <li><RouterLink to="/home">Home</RouterLink></li>
    <br>

    <li><RouterLink to="/clientes">Ver Clientes</RouterLink></li>
    <br>

    <li><RouterLink to="/novo-cliente">Novo Cliente</RouterLink></li>
    <br>

    <li><RouterLink to="/novo-filme">Novo Filme</RouterLink></li>
    <br>

    <a href="#" @click.prevent="goBack">Voltar</a>
    <br>

    <a href="#" @click.prevent="logout" id="exit-btn">Sair</a>
  </ul>



  <!-- <ul>
    <a to="/home">Home</a>
    <br>

    <a to="/clientes">Ver Clientes</a>
    <br>

    <a to="/novo-cliente">Novo Cliente</a>
    <br>

    <a to="/novo-filme">Novo Filme</a>
    <br>

    <a href="#" @click.prevent="goBack">Voltar</a>
    <br>

    <a href="#" @click.prevent="logout" id="exit-btn">Sair</a>
  </ul> -->


</div>
</template>



<style scoped>
.sidebar {
  position: fixed;
  top: 0; /* <-- Começa logo abaixo do header */
  left: 0;
  width: 15%;
  height: 100%; /* <-- Para completar 100vh junto com o header */
  padding-left: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 10px;
  background-color: rgba(73, 119, 162, 1);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 20px;
  
}

.inner-sidebar{
  display: flex;
  justify-content: center;
  padding-left: 90px;
}
.inner-sidebar h1{
  color: white;

}

.sidebar ul{
  list-style: none;
}

.sidebar a {
  display: block;              /* Faz o link ocupar uma linha inteira */
  white-space: nowrap;         /* Impede que o texto quebre em múltiplas linhas */
  margin-bottom: 10px;
  /* margin-left: -5; */
  padding-left: -50px;
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight:bolder;
}

</style>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
