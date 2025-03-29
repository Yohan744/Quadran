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

    .error-button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;

      &:hover {
        background-color: #c0392b;
      }
    }
  }
</style>
