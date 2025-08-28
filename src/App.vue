<!-- SCRIPT  -->
<script setup>
import './assets/global.css';
import Sidebar from './components/Sidebar.vue';
import Home from './pages/Home.vue'



</script>

<!-- HTML -->

<template>

 <div class="app-container">
    <Sidebar></Sidebar>

    <main class="content-area">
      <Home></Home>
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