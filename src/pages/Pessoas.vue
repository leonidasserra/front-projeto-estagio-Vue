<template>
    <div class="pessoa-content">
            <div class="top-page">
                <h1>Pessoas</h1>

                <div class="searchbar">
                    <input type="text" name="q" placeholder="Digite sua busca...">
                    <button type="button">🔍</button>
                </div>
            </div>

                <table v-if="!isModalVisible">
                    <thead>
                        <tr>
                            <td>Código</td>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>Telefone</td>
                            <!-- <td>Ações</td> -->
                        </tr>
                    </thead>
                    <tbody id="lista-pessoas" >
                        <tr v-for="pessoa in pessoas" :key="pessoa.id">
                            <td>{{ pessoa.id }}</td>
                            <td class="nome-clicavel" @click="mostrarDetalhes(pessoa.id)">{{ pessoa.name }}</td>
                            <td>{{ pessoa.email }}</td>
                            <td>{{ pessoa.telefone }}</td>
                        </tr>
                    </tbody>
                </table>


                  <div v-if="isModalVisible" class="modal" @click="closeModal">
                    <div class="modalContent" id="modalFilmeDet" @click.stop>
                        <h2>Detalhes Completos</h2>
                        <p><strong>ID:</strong> {{ pessoaDetalhes.id }}</p>
                        <p><strong>Nome:</strong> {{ pessoaDetalhes.name  }}</p>
                        <p><strong>Email:</strong> {{ pessoaDetalhes.email }}</p>
                        <p><strong>Cpf:</strong> {{ pessoaDetalhes.cpf }}</p>
                        <p><strong>Telefone:</strong> {{ pessoaDetalhes.telefone }}</p>
                        <p><strong>Nascimento:</strong> {{ formatarDataLocaleToNormal(pessoaDetalhes.nascimento) }}</p>
                        <!-- <button @click="closeModal">Fechar</button> -->
                  </div>
        </div>
        </div>




</template>

<script setup>
import Searchbar from '@/components/Searchbar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '../assets/global.css'

let pessoas = ref({});
let pessoaDetalhes = ref({});
let isModalVisible =ref(false)
const router = useRouter();

const listarPessoas = async () => {
  try {
    const response = await fetch('http://localhost:8080/pessoa/listar');
    
    if (!response.ok) {
       console.log(response);
    }
    pessoas.value = await response.json();
  } catch (error) {
    alert("Erro ao listar os filmes.");
    console.error(error);
  }
};

onMounted(() => {
  listarPessoas();
});



// Ações para o clique no ID do filme
async function mostrarDetalhes(id) {
    const response = await fetch(`http://localhost:8080/pessoa/buscar/${id}`);
    if (!response.ok) {
       console.log(response);
    }
    pessoaDetalhes.value = await response.json();
    isModalVisible.value = true;
}

function closeModal() {
    isModalVisible.value = false;
    pessoaDetalhes.value = null;
}

function formatarDataLocaleToNormal(dataLocale){
  const dataRaw = String(dataLocale);
  const ano= dataRaw.slice(0,4);
  const mes= dataRaw.slice(5,7);
  const dia= dataRaw.slice(8,10);
  const dataTratada = dia+'/'+mes+'/'+ano;
    return dataTratada;

}





</script>

<style scoped>
.nome-clicavel {
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