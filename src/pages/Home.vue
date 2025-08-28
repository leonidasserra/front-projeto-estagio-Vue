<template>
    <main class="main-content">
        <div class="top-page">
            <div class="page-title-home">
                <h1>Filmes</h1>
            </div>
             
            <Searchbar></Searchbar>
        </div> 
               
        
        <div class="home-content">
            <form action="4.fazerAluguel.html">

                    <button type="button" class="float-btn" id="next-home-btn" @click="getIdCheckboxes">Seguinte</button>
                

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
                    <tbody id="corpo_tabela_filmes" >
                        <tr v-for=" filme in filmes" :key="filme.id">
                            <td>{{ filme.id || '-' }}</td>
                            <td>{{ filme.title || '-'}}</td>
                            <td>{{ filme.genero || '-' }}</td>
                            <td>{{ filme.ano || '-'}}</td>
                            <td>{{  filme.quantidadeEstoque || '-'}}</td>
                            <td><input type="checkbox" class="checkbox" :value="filme.id" v-model="idsSelecionados"/></td>
                        </tr>
                    </tbody>
                </table>

                <br><br>

            </form>
        </div>

        <!-- Paginação -->
        <nav class="pagination" aria-label="Navegação de páginas">
            <ul>
                <li><a href="?page=1" class="active">1</a></li>
                <li><a href="?page=2">2</a></li>
                <li><a href="?page=3">3</a></li>
                <li><a href="?page=2">Próximo</a></li>
            </ul>
        </nav>
        </main>
</template>

<script setup>
import Searchbar from '@/components/Searchbar.vue';
import {ref, onMounted} from 'vue';
let filmes =ref([]);
let idsSelecionados = ref([]);


const listarFilmes = async () => {
    try {
        const response = await fetch('http://localhost:8080/filme/listar');
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
           console.log(response);
        }

        // Armazena os dados na variável reativa usando .value
        filmes.value = await response.json();
    } catch (error) {
        alert("Erro ao listar os filmes.");
        console.error(error);
    }
};

onMounted(() => {
    listarFilmes();
});

function getIdCheckboxes(){
    console.log("ids: "+idsSelecionados.value)
    // 4. Verifica se o usuário selecionou pelo menos um filme
    if (idsSelecionados.value == 0) {
        alert('Por favor, selecione pelo menos um filme para continuar.');
    }

    sessionStorage.setItem('filmesSelecionados', JSON.stringify(idsSelecionados.value ));
}

</script>

<style scoped>
.main-content {
  margin-left: 150px; /* espaço da sidebar */
  margin-top: 0.1vh;   /* espaço do header */
  height: 100vh;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
 
}
.page-title-home{
  display: flex;
  justify-content: flex-start;
  /* margin-left: 50px; espaço da sidebar */
  margin-top: 10vh;   /* espaço do header */
  font-size: 35px;
  /* padding-top: 20px; */
  
}

.home-content{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
}
</style>