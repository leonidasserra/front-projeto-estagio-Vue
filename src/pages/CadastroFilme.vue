<template>
    
    <div class="main-content-signup"> <!-- wrapper para herdar estilos do arquivo anterior -->
       <!-- <h1 class="page-title"> Filme Novo</h1> -->
<div class="novo-filme-title">
    <h1> Filme Novo</h1>
</div>
      <!-- Formulário -->
      <div class="inner-content-signup-movie"> <!-- mantém padrão do arquivo anterior -->
        <form @submit.prevent="getDados" method="post" class="filme-form" novalidate>
          <!-- bloco 1: infos básicas -->
          <!-- <fieldset class="card-form">
            <legend>Informações básicas</legend> -->

          <div class="form-grid">
            <div class="section-signup">
              <label for="titulo">Título *</label>
              <input type="text" id="titulo" name="titulo" required placeholder="Ex.: O Senhor dos Anéis: A Sociedade do Anel" v-model="titulo"/>
            </div>

            <div class="section-signup">
              <label for="genero">Gênero *</label>
              <select id="genero" name="genero" required v-model="genero">
                <option value="" selected disabled>Selecione...</option>
                <option>Ação</option>
                <option>Aventura</option>
                <option>Comédia</option>
                <option>Drama</option>
                <option>Fantasia</option>
                <option>Ficção Científica</option>
                <option>Romance</option>
                <option>Terror</option>
                <option>Suspense</option>
                <option>Animação</option>
              </select>
            </div>

            <div class="section-signup">
              <label for="ano">Ano *</label>
              <input type="number" id="ano" name="ano" required min="1888" max="2099" placeholder="2001" v-model="ano" />
            </div>

            <div class="section-signup">
              <label for="duracaoMin">Duração (min)</label>
              <input type="number" id="duracaoMin" name="duracaoMin" min="1" max="999" placeholder="178" v-model="duracao"/>
            </div>

            <div class="section-signup">
              <label for="classificacao">Classificação indicativa</label>
              <input type="text" id="classificacao" name="classificacao" placeholder="Livre, 10, 12, 14, 16, 18" v-model="classificacao"/>
            </div>

            <div class="section-signup">
              <label for="diretor">Diretor</label>
              <input type="text" id="diretor" name="diretor" placeholder="Ex.: Peter Jackson" v-model="diretor" />
            </div>

            <div class="section-signup">
              <label for="descricao">Descrição / Sinopse</label>
              <br>
              <textarea id="descricao" name="descricao" rows="5" placeholder="Breve sinopse do filme..." v-model="descricao"></textarea>
            </div>
          </div>
          <!-- </fieldset>  (mantido comentado no original) -->

          <!-- bloco 2: estoque e valores -->
          <div class="form-grid">
            <div class="section-signup">
              <label for="quantidadeEstoque">Quantidade em estoque *</label>
              <input type="number" id="quantidadeEstoque" name="quantidadeEstoque" required min="0" step="1" placeholder="12" v-model="quantidadeEstoque"/>
            </div>
          </div>

          <br>

          <!-- ações -->
          <div class="form-actions">
            <button type="submit" class="float-btn" id="saveMovieBtn" >Salvar</button>
            <!-- <a href="listar-filmes.html" class="back-btn" role="button">Cancelar</a> -->
          </div>
        </form>
      </div> <!-- /inner-content-signup -->
    </div> <!-- /main-content-signup -->


</template>

<script setup>

import { ref } from 'vue';
import { isTokenValid } from '../assets/auth.js';




const titulo = ref('');
const genero = ref('');
const ano = ref(null);
const duracao = ref(null);
const classificacao = ref('');
const diretor = ref('');
const descricao = ref('');
const quantidadeEstoque = ref(null);

const requisicao=ref(null);

async function getDados(){

  if(!isTokenValid){
  alert("Token not valid or expired");
  return ;
}

  console.log('Título:', titulo.value);
  console.log('Gênero:', genero.value);
  console.log('Ano:', ano.value);
  console.log('Duração:', duracao.value);
  console.log('Classificação:', classificacao.value);
  console.log('Diretor:', diretor.value);
  console.log('Descrição:', descricao.value);
  console.log('Estoque:', quantidadeEstoque.value);

if(classificacao.value=='Livre'){
    classificacao.value=0;
}

  requisicao.value = {
    "title":titulo.value,
    "ano":ano.value,
    "diretor":diretor.value,
    "quantidadeEstoque":quantidadeEstoque.value,
    "classificacao":classificacao.value,
    "sinopse":descricao.value,
    "duracao":duracao.value,
    "genero": genero.value
  }

  requisicao.value=JSON.stringify(requisicao.value,null,2);

  const response=await fetch('http://localhost:8080/filme/criar',{
  method:'POST',
  headers:{
  'Content-Type':  "application/json",
  'Authorization': `Bearer ${accessToken}`
  },
  body: requisicao.value
 })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Filme Cadastrado com Sucesso!")
        console.log('Success:', requisicao.value);
        
        requisicao.value =null;

        return response.json();


}


</script>

<style scoped>
.section-signup{
    margin: 6px;
}

</style>