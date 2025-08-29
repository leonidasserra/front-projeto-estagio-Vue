<template>
  <div class="main-content-filmesDet">
    <div v-if="carregando" class="loading-state">
      <p>Carregando detalhes do filme...</p>
    </div>

    <div v-else-if="filmeDetalhes && Object.keys(filmeDetalhes).length > 0" class="details">
      <div class="movie-details-title">
        <h1>Detalhes do filme</h1>
      </div>
      <div id="inner-movieDetails">
        <table v-if="!isModalVisible">
          <thead>
            <tr>
              <td>Código</td>
              <td>Título</td>
              <td>Gênero</td>
              <td>Ano</td>
              <td>Estoque</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody id="corpo_tabela_filmes_3">
            <tr>
              <td>{{ filmeDetalhes.id }}</td>
              <td class="filme-clicavel" @click="goToMaisDetalhes">{{ filmeDetalhes.title }}</td>
              <td>{{ filmeDetalhes.genero }}</td>
              <td>{{ filmeDetalhes.ano }}</td>
              <td>{{ filmeDetalhes.quantidadeEstoque }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div v-else class="not-found-state">
      <p>Filme não encontrado.</p>
    </div>
  </div>


  <div v-if="isModalVisible" class="modal" @click="isModalVisible = false">
    <div class="modalContent" id="modalFilmeDet" @click.stop>
      <h2>Detalhes Completos</h2>
      <p><strong>Título:</strong> {{ filmeDetalhes.title }}</p>
      <p><strong>Gênero:</strong> {{ filmeDetalhes.genero }}</p>
      <p><strong>Ano:</strong> {{ filmeDetalhes.ano }}</p>
      <p><strong>Estoque:</strong> {{ filmeDetalhes.quantidadeEstoque }}</p>
      <p><strong>Classificacao:</strong> {{ filmeDetalhes.classificacao }}</p>
      <p><strong>Duracao:</strong> {{ filmeDetalhes.duracao }}</p>
      <p><strong>Deescricao:</strong> {{ filmeDetalhes.sinopse }}</p>
      <button @click="isModalVisible = false">Fechar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import '../assets/global.css';
import Pagination from '@/components/Pagination.vue';

const route = useRoute();
const filmeDetalhes = ref(null); // Corrigido para ref(null)
const carregando = ref(true);
const isModalVisible=ref(false);
onMounted(async () => {
  const idDoFilme = route.query.id; 
  console.log("ID do filme na URL:", idDoFilme);

  if (idDoFilme) {
    try {
      // 1. A sua URL pode estar errada; verifique o caminho da sua API
      const response = await fetch(`http://localhost:8080/filme/buscar/${idDoFilme}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar o filme.');
      }

      // 2. Corrigida a forma de obter os dados com fetch
      const data = await response.json();
      
      // 3. Atribuído o resultado à ref usando .value
      filmeDetalhes.value = data;
      console.log("Dados do filme carregados:", filmeDetalhes.value);

    } catch (error) {
      console.error('Erro ao buscar detalhes:', error);
      filmeDetalhes.value = null; // Garante que o estado de erro funcione
    }
  }
  carregando.value = false;
});

function goToMaisDetalhes() {
    isModalVisible.value = true;
}

</script>

<style scoped>
.home-content{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
}


.filme-clicavel {
  color: blue;
  cursor: pointer;
}
</style>