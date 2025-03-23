<template>
  <main>
    <h1>Présentation de l'experience amdouat</h1>

    <NuxtLink target="_blank" to="https://google.com">Voir toutes nos autres experiences</NuxtLink>

    <NuxtLink to="/connexion">Connexion</NuxtLink>
  </main>
</template>

<style lang="scss" scoped>
  main {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      position: relative;
      margin-bottom: 30px;
    }
  }
</style>
<script setup lang="ts"></script>
