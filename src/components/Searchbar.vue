<template>

    <div class="searchbar">
        <input type="text" name="q" placeholder="Digite sua busca...">
        <button type="button">🔍</button>
    </div>

</template>

<style scoped>
.searchbar{
  margin-left: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.searchbar input{
  border-radius: 8px;
}

.searchbar button{
  border-radius: 15px;
  background-color: white;
}

</style>