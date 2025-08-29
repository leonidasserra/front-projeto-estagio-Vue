<template>
  <tr>
    <td>{{ filme.id }}</td>
    <td @click="emit('clicou-filme', filme.id)">
      {{ filme.title }}
    </td>
    <td>{{ filme.genero }}</td>
    <td>{{ filme.ano }}</td>
    <td>{{ filme.quantidadeEstoque }}</td>
    <td>
      <input
        type="checkbox"
        :value="filme.id"
        @change="handleCheckboxChange"
        :checked="isFilmeSelecionado"
      />
    </td>

  </tr>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
const props = defineProps({
  filme: Object,
  idsSelecionados: Array
});
const emit = defineEmits(['clicou-filme','toggle-filme-selecionado']);

// Propriedade computada para verificar se o filme está selecionado
const isFilmeSelecionado = computed(() => {
  return props.idsSelecionados.includes(props.filme.id);
});

function handleCheckboxChange(event) {
  const isChecked = event.target.checked;
  // Emitimos o ID do filme e o estado do checkbox (selecionado ou não)
  emit('toggle-filme-selecionado', { id: props.filme.id, isChecked });
}
</script>

<style scoped>
/* Estilo visual para indicar que o nome é clicável */
td:nth-child(2) {
  color: #007bff;
  cursor: pointer;
}
</style>