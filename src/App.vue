<!-- SCRIPT  -->
<script setup>
import './assets/global.css';
import Sidebar from './components/Sidebar.vue';
import Home from './pages/Home.vue'
import FilmeDetalhes from './pages/FilmeDetalhes.vue';
import { RouterView } from 'vue-router';

import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const showSidebar = computed(() => {
  // A sidebar será exibida se o meta field 'requiresSidebar' for true
  return route.meta.requiresSidebar;
});

</script>

<!-- HTML -->

<template>

 <div class="app-container">
    <Sidebar v-if="showSidebar"></Sidebar>

    <main class="content-area">
      <!-- <Home></Home> -->
       <!-- <FilmeDetalhes/> -->
        <RouterView/>
    </main>
  </div>
</template>

 

<style scoped>

.app-container {
  display: flex;
}
.content-area {
  flex-grow: 1; 
  padding: 20px;
}
</style>