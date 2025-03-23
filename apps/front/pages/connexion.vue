<template>
  <main>
    <h1>Se connecter</h1>

    <div class="wrapper">
      <input type="text" class="form" />
      <input type="password" class="form" />

      <NuxtLink to="/dashboard">Connexion</NuxtLink>
    </div>
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

    .wrapper {
      position: relative;
      padding: 30px;
      height: fit-content;
      width: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      background: #9f9f9f;
      gap: 20px;

      .form {
        position: relative;
        height: 30px;
        width: 200px;
        background: white;
      }
    }
  }
</style>
<script setup lang="ts"></script>
