<template>
   <header class="header">
    <div class="logo">
      <h1>RentFlix</h1>
    </div>
  </header> 
<div class="main-content-signup-user">
    
    <h1>Cadastro</h1>
    <div class="inner-content">
      <form @submit.prevent="getDados">
        <div class="section-signup">
          <label for="nome">Nome</label>
          <input type="text" id="nomeCad" name="nomeCad" v-model="nome" required>
        </div>
        <div class="section-signup">
          <label for="username">Username</label>
          <input type="text" id="usernameCad" name="usernameCad" v-model="username" required>
        </div>

        <div class="section-signup">
          <label for="cpf">Cpf</label>
          <input type="text" id="cpfCad" name="cpf" maxlength="14" v-model="cpf" required>
        </div>

        <div class="section-signup">
          <label for="email">Email</label>
          <input type="email" id="emailCad" name="emailCad" v-model="email" required>
        </div>

        <div class="section-signup">
          <label for="password">Senha</label>
          <input type="password" id="passwordCad" name="passwordCad" autocomplete="new-password" v-model="passsword" required>
        </div>
        
        <div class="signup-btn">
          <button type="submit" class="float-btn" id="signup-btn" @click="registrarUsuario">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>


</template>

<script setup>

//===========FALTA TESTAR REQUISIÇÃO
import {ref} from 'vue';


const username=ref('');
const nome=ref('');
const cpf=ref('');
const email=ref('');
const password=ref('');

const requisicao=ref(null);
async function getDados(){
  console.log('Nome:', nome.value);
  console.log('CPF:', cpf.value);
  console.log('email:', email.value);
  console.log('senha:', password.value);
    

  requisicao.value = {
    "username":username.value,
    "name":nome.value,
    "cpf":cpf.value,
    "email": email.value,
    "password":password.value,

  }
  requisicao.value=JSON.stringify(requisicao.value,null,2);
    const response= await fetch('http://localhost:8080/register',{
            method: 'POST',
            headers: {
                   'Content-Type': 'application/json' 
            },
            body:requisicao.value
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Cliente Cadastrado com Sucesso!")
        console.log('Success:', requisicao.value);
        
        requisicao.value =null;

        return response.json();
}



</script>

<style>

</style>