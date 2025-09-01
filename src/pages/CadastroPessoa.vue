<template>
  <div class="main-content-signup-pessoa">
    <h1>Cadastro</h1>
    <div class="inner-content-signup">
      <form @submit.prevent="getDados">
        <div class="section-signup">
          <label for="nome">Nome</label>
          <input type="text" id="nomeCad" name="nomeCad" v-model="nome" required>
        </div>

        <div class="section-signup">
          <label for="cpf">Cpf</label>
          <input type="text" id="cpfCad" name="cpf" maxlength="14" v-model="cpf" required>
        </div>

        <div class="section-signup">
          <label for="numero">Número</label>
          <input type="tel" id="numeroCad" name="numeroCad" v-model="telefone" required>
        </div>

        <div class="section-signup">
          <label for="nascimento">Nascimento</label>
          <input type="date" id="nascCad" name="nascCad" min="1900-01-01" v-model="nascimento" required>
        </div>

        <div class="section-signup">
          <label for="email">Email</label>
          <input type="email" id="emailCad" name="emailCad" v-model="email" required>
        </div>
        
        <div class="signup-btn">
          <button type="submit" class="float-btn" id="signup-btn">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const nome=ref('');
const cpf=ref('');
const email=ref('');
const telefone=ref('');
const nascimento=ref('');
const requisicao=ref(null);
async function getDados(){
  console.log('Nome:', nome.value);
  console.log('CPF:', cpf.value);
  console.log('Número:', telefone.value);
  console.log('Nascimento:', nascimento.value);
  console.log('Email:', email.value);
    

  requisicao.value = {
    "name":nome.value,
    "cpf":cpf.value,
    "email": email.value,
    "telefone":telefone.value,
    "nascimento":nascimento.value
  }
  requisicao.value=JSON.stringify(requisicao.value,null,2);
    const response= await fetch('http://localhost:8080/pessoa/criar',{
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
