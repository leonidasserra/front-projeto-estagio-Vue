<template>
    
<form method="get">    
        <div class="rent-title">    
            <h1>Confirmação do Empréstimo</h1>
        </div>  

        <div class="rent-main-content">
            <table v-if="!isOverlayVisible">
                    <thead>
                        <tr>
                            <td>Código</td>
                            <td>Título</td>
                            <td>Gênero</td>
                            <td>Ano</td>
                            <td>Estoque</td>
                            <td>Excluir</td>
                        </tr>
                    </thead>
                    <tbody id="corpo_tabela_filmes_2">
                        <tr v-for="filmeAlugar in filmesParaAlugar" :key="filmeAlugar.id">
                            <td>{{ filmeAlugar.id }}</td>
                            <td class="filme-clicavel" @click="goToDetalhes(filme.id)">{{ filmeAlugar.title }}</td>
                            <td>{{ filmeAlugar.genero }}</td>
                            <td>{{ filmeAlugar.ano }}</td>
                            <td>{{ filmeAlugar.quantidadeEstoque }}</td>
                            <td @click="excluirFilmeFila(filmeAlugar.id)"><font-awesome-icon :icon="['fas', 'trash']" style="color: red;" /></td>
                        </tr>
                    </tbody>
                </table>

            <br><br>
            
            <div class="make-rent" v-if="!isOverlayVisible">
                <div class="section-signup-rent" id="section-signup-rent">
                    <label for="pessoa">Empréstimo para: </label>
                    <input type="text" id="pessoaAluguel" name="pessoaAluguel" v-model="buscaPessoa" required>
                </div>
                  <!-- <br> -->
                <table id="table_busca_pessoas_alugueis">
                    <thead>
                        <tr >
                        <td>Codigo</td>
                        <td>Nome</td>
                        <td>CPF</td>
                        <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pessoa in pessoas" :key="pessoa.id">
                            <td>{{ pessoa.id }}</td>
                            <td>{{ pessoa.name }}</td>
                            <td>{{ pessoa.cpf }}</td>
                            <td><input type="radio" class="radio" :value="pessoa.id" name="pessoaID" v-model="idPessoa" @change="console.log(idPessoa)" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <br><br>

                <div class="div-rent-btn">
                    <button type="button"  id="confirm-rent-btn" class="float-btn" @click.prevent="confirmarAluguel">Confirmar</button>
                </div>
            </div>    

    </form>

    <!-- Janela de Confirmação -->
    <div v-if="isOverlayVisible" class="overlay" id="overlay" @click="isOverlayVisible=false; confirmarAluguel">
    <div v-if="isOverlayVisible" class="confirm-box" id="confirmBox" @click.stop>
        <p>Você tem certeza?</p>
        <div v-if="isOverlayVisible" class="inner-confirm-box">
            <button id="btnSim" @click="fazerAluguel">Sim</button>
            <button id="btnNao" @click="isOverlayVisible=false">Não</button>
        </div>    
    </div>
    </div>


</template>

<script setup>
import '../assets/global.css'
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';



const idsSelecionados = JSON.parse(sessionStorage.getItem('filmesSelecionados') || '[]'); 
    // ALTERAÇÃO: adicionado fallback '[]' para evitar erro se a chave não existir.

    let idsTratados = [];
    idsSelecionados.forEach(id => {
        idsTratados.push(parseInt(id));
    });


let quantEstoques=[];
 function estoqueIsEmpty(listaEstoque){
    // Este loop vai parar e retornar assim que encontrar um estoque <= 0
    for(const number of listaEstoque){
        if(number <= 0){
            return true; // Retorna true para a função
        }
    }
    return false; // Se o loop terminar e não encontrar nada, retorna false
}

let filmesParaAlugar=ref([]);


// ... outras importações

onMounted(async () => {
    try {
        
        for(const id of idsTratados) {
            try {
                // Suponha que `buscarFilme` é uma função async que retorna os detalhes do filme
                const filme = await buscarFilme(id);
                if (filme) {
                    filmesParaAlugar.value.push(filme);
                    quantEstoques.push(filme.quantidadeEstoque);
                    console.log(filmesParaAlugar.value);
                }
            } catch (error) {
                // Aqui você pode tratar o erro para cada filme individualmente
                console.error(`Falha ao buscar o filme com ID ${id}:`, error);
                // Ou você pode adicionar um placeholder na lista se preferir
                // filmesParaAlugar.value.push({ id: id, titulo: 'Filme não encontrado' });
            }
        }
    } catch (mainError) {
        // Trate erros gerais da sua função
        console.error('Erro geral no mounted hook:', mainError);
    }
});

    async function buscarFilme(id){
        const response =  await fetch(`http://localhost:8080/filme/buscar/${id}`)
            if (!response.ok) {
            throw new Error('Erro ao buscar o filme.');
            }

      // 2. Corrigida a forma de obter os dados com fetch
      const data= await response.json();  
      return  data;
    }


function goToDetalhes(id) {
  router.push({
    name: 'FilmeDetalhes',
    query: { id: id }
  });
}
function excluirFilmeFila(id){
    const index = idsTratados.indexOf(id);
    idsTratados.splice(index,1);
    console.log(idsTratados);
    filmesParaAlugar.value = filmesParaAlugar.value.filter(filme => filme.id !== id)
}


const buscaPessoa=ref("");

watch(buscaPessoa,(novoTexto)=>{
    if(novoTexto.length >= 2) {
    buscarPessoa(novoTexto);
  }
})

const pessoas=ref({});
async function buscarPessoa(name){
    const response = await fetch(`http://localhost:8080/pessoa/buscar?name=${encodeURIComponent(name)}`);
    pessoas.value = await response.json();
    console.log(pessoas);
    return pessoas;

}

const idPessoa = ref(null);
const isOverlayVisible = ref(false);

function confirmarAluguel(){
    if(estoqueIsEmpty(quantEstoques)){
        alert('Um dos Filmes não esta disponivel no estoque');
        return;

    }
    else if(idPessoa.value===null){
            alert('Selecione o dono do Emprestimo para continuar');
            return;
            }

     isOverlayVisible.value=true;
    console.log(isOverlayVisible.value);
        }


async function fazerAluguel(){
const filmesFormatados = idsTratados.map(id =>({id: id}));
        let today = new Date();
        const year = String(today.getFullYear());
        let month = String(today.getMonth() + 1); 
        let day = today.getDate(); 
        if(day<10){
            day=String('0'+day);
        }
        if(month<10){
            month=String('0'+month);
        }
        today = year+'-'+month+'-'+day;
        console.log(idsTratados.length);
        let precoAluguel = 12*(idsTratados.length);
        let dataToSend = {
            valorAluguel: precoAluguel,
            dataAluguel: today,
            pessoa:{
                id: idPessoa.value
            },
            filmes: filmesFormatados
        };
        dataToSend =JSON.stringify(dataToSend,null,2);//Transformando em json

        console.log(dataToSend);
try{
    const response = await fetch(`http://localhost:8080/aluguel/criar`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:dataToSend
    });
     if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Empréstimo Feito com Sucesso!")
        console.log('Success:', dataToSend);
        return response.json();
  
}
catch(error){
console.log(error);
}
}






</script>