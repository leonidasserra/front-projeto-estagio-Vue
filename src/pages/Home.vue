<template>
  <main class="main-content">
    <div class="top-page">
      <div class="page-title-home">
        <h1>Filmes</h1>
      </div>
      <Searchbar></Searchbar>
    </div>
    
    <div class="home-content">
      <form>
        <button type="button" class="float-btn" id="next-home-btn" @click.prevent="getIdCheckboxes">Seguinte</button>
        
        <table id="tabela_filmes">
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
          <tbody id="corpo_tabela_filmes">
            <tr v-for="filme in filmes" :key="filme.id">
              <td >{{ filme.id || '-' }}</td>
              <td class="filme-clicavel" @click="goToDetalhes(filme.id)">{{ filme.title || '-'}}</td>
              <td>{{ filme.genero || '-' }}</td>
              <td>{{ filme.ano || '-'}}</td>
              <td>{{ filme.quantidadeEstoque || '-'}}</td>
              <td>
                <input
                  type="checkbox"
                  class="checkbox"
                  :value="filme.id"
                  v-model="idsSelecionados"            
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br><br>
        <!-- FALTA TRAZER A TABELA DE EMPRESTIMOS RELACIONADOS -->
      </form>
    </div>

<pagination></pagination>
  </main>
</template>

<script setup>
import Searchbar from '@/components/Searchbar.vue';
import Pagination from '@/components/Pagination.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '../assets/global.css'
import { isTokenValid } from '../assets/auth.js';

const accessToken = localStorage.getItem('accessToken');
let filmes = ref({});
let idsSelecionados = ref([]);
const router = useRouter();

const listarFilmes = async () => {
  if (!isTokenValid()) {
    return; 
  }

  try {
    const response = await fetch('http://localhost:8080/filme/listar',{
      headers: {'Authorization': `Bearer ${accessToken}`}
    });
    
    if (!response.ok) {
       console.log(response);
    }
    filmes.value = await response.json();
  } catch (error) {
    alert("Erro ao listar os filmes.");
    console.error(error);
  }
};

onMounted(() => {
  listarFilmes();
});



function getIdCheckboxes() {
  if (!isTokenValid()) {
    return; 
  }
  if (idsSelecionados.value.length === 0) {
    alert('Por favor, selecione pelo menos um filme para continuar.');
    return;
  }
  sessionStorage.setItem('filmesSelecionados', JSON.stringify(idsSelecionados.value));

  router.push({
    name: 'FazerAluguel'
  });

}

// Ações para o clique no ID do filme
function goToDetalhes(id) {
  router.push({
    name: 'FilmeDetalhes',
    query: { id: id }
  });
}
</script>

<style scoped>
.filme-clicavel {
  color: blue;
  cursor: pointer;
}
.main-content {
  margin-left: 150px;
  margin-top: 0.1vh;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.page-title-home{
  display: flex;
  justify-content: flex-start;
  margin-top: 10vh;
  font-size: 35px;
}
.home-content{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
}
</style>