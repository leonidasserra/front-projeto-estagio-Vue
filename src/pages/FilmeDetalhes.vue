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
              <!-- <td>Ações</td> -->
            </tr>
          </thead>
          <tbody id="corpo_tabela_filmes_3">
            <tr>
              <td>{{ filmeDetalhes.id }}</td>
              <td class="filme-clicavel" @click="goToMaisDetalhes">{{ filmeDetalhes.title }}</td>
              <td>{{ filmeDetalhes.genero }}</td>
              <td>{{ filmeDetalhes.ano }}</td>
              <td>{{ filmeDetalhes.quantidadeEstoque }}</td>
              <!-- <td></td> -->
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Empréstimos Relacionados</h2>
            <table>
                <thead>
                    <tr>
                        <td>Código</td>
                        <td>Data de inicio</td>
                        <td>Data de Devolução</td>
                        <td>Valor</td>
                        <td>Status</td>
                        <td>Cliente</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody id="lista-emprestimos-relacionados">
                    <tr v-for="aluguel in alugueis" :key="aluguel.id">
                        <td>{{ aluguel.id }}</td>
                        <td>{{ aluguel.dataAluguel  }}</td>
                        <td>{{ aluguel.devolucaoPrevista }}</td>
                        <td>{{ aluguel.valorAluguel }}</td>
                        <td>{{ aluguel.status }}</td>
                        <td>{{ aluguel.nomePorprietario }}</td>
                        <td><button type="button" class="add-btn" @click="finalizarAluguel(aluguel.id)"> Finalizar</button></td>
                    </tr>
                </tbody>
            </table>
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
      <p><strong>Classificação:</strong> {{ filmeDetalhes.classificacao }}</p>
      <p><strong>Duração:</strong> {{ filmeDetalhes.duracao }}</p>
      <p><strong>Descrição:</strong> {{ filmeDetalhes.sinopse }}</p>
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
let alugueis=ref(null);

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


  try{
    const respostaPessoaFilme = await fetch(`http://localhost:8080/aluguel/buscafilme/${idDoFilme}`);
      if (!respostaPessoaFilme.ok) {
        throw new Error('Erro ao buscar o filme.');
      }
      const dataPessoaFilme = await respostaPessoaFilme.json();
      alugueis.value=dataPessoaFilme; 
      //ADICIONAR AQUI O TRATAMENTO DE  LOCALEDATA -> DD/MM/AAAA
      for (const aluguel of alugueis.value){
        aluguel.dataAluguel = formatarDataLocaleToNormal(aluguel.dataAluguel)
        aluguel.devolucaoPrevista = formatarDataLocaleToNormal(aluguel.devolucaoPrevista)
        const nomePorprietario = await buscarProprietarioAluguel(aluguel.pessoa.id)
        aluguel.nomePorprietario=nomePorprietario;
      }

  }
  catch(error){
    console.error('Erro ao buscar detalhes:', error);
    alugueis.value = null;
  }
});

function goToMaisDetalhes() {
    isModalVisible.value = true;
}


async function buscarProprietarioAluguel(idPessoa) {
  const response = await fetch(`http://localhost:8080/pessoa/buscar/${idPessoa}`)
  if (!response.ok) {
        throw new Error('Erro ao buscar o proprietario.');
      }

      // 2. Corrigida a forma de obter os dados com fetch
  const data = await response.json();
  return data.name
}

function formatarDataLocaleToNormal(dataLocale){
  const dataRaw = String(dataLocale);
  const ano= dataRaw.slice(0,4);
  const mes= dataRaw.slice(5,7);
  const dia= dataRaw.slice(8,10);
  const dataTratada = dia+'/'+mes+'/'+ano;
    return dataTratada;

}

async function finalizarAluguel(idAluguel){
  const aluguelFinalizado = alugueis.value.find(aluguel => aluguel.id === idAluguel);
  if(aluguelFinalizado.status === 'Ativo'){
      try {
        const response = await fetch(`http://localhost:8080/aluguel/finalizar/${idAluguel}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
    
    //Encontrar o aluguel na  lista 
    

    // Atualizar  status
    if (aluguelFinalizado) {
      aluguelFinalizado.status = 'Finalizado';
      //devolver o filme pro estoque
      aluguelFinalizado.quantidadeEstoque +=1 ; 
      
      console.log(`Empréstimo ${idAluguel} concluído com sucesso.`);
      } 
    }
 

    catch (error) {
        console.error('Houve um problema ao concluir o empréstimo:', error);
    }
  }
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