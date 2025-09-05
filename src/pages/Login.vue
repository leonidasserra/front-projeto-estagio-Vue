<template>
  <header class="header">
    <div class="logo">
      <h1>RentFlix</h1>
    </div>
  </header>

  <div class="container">
    <form  method="get">
      <div class="section-access" id="section-access-login">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" autocomplete="username" v-model="username" required>

        <label for="senha">Senha</label>
        <input type="password" id="senhaLogin" name="senhaLogin" autocomplete="current-password" v-model="password" required>
        
        <button type="submit" class="login-btn" id="login-btn" @click.prevent="fazerLogin">Entrar</button>
        <a @click="toSignUp">Registrar-se</a>
      </div>
    </form>
  </div>
</template>

<script setup>

import router from '@/router';
import { ref } from 'vue';

const username=ref('');
const password=ref('');

const requisicao=ref(null);

async function fazerLogin(){
  console.log('Nome:', username.value);
  console.log('senha:', password.value);
    

  requisicao.value = {
    "username":username.value,
    "passsword":password.value
  }
  
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requisicao.value)
        });

        if (!response.ok) {
            // Se a resposta não for OK, lança um erro com a mensagem do backend
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        // Lê o corpo da resposta JSON UMA VEZ
        const data = await response.json();

        const accessToken = data.accessToken;
        const expiresIn = data.expiresIn;

        console.log('Login bem-sucedido. Token:', accessToken);
        console.log('Login bem-sucedido. Expires:', expiresIn);
        
        // Salvar Token
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiresIn', Date.now() + expiresIn * 1000); // expiresIn * 1000 pq o JS trabalha com milissegundos
        
          router.push({
          name: 'Home'
          });

        alert("Login com sucesso!"); 
        requisicao.value = null;
        return data; 

    } catch (error) {
        console.error('Erro no login:', error.message);
        alert('Falha no login: ' + error.message); // Exibe o erro para o usuário
        return null; 
    }
}

function toSignUp(){
  router.push({
          name: 'Register'
          });
}


</script>

<style>

</style>