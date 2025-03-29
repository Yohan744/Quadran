<template>
  <main>
    <header>
      <div class="rightPart">
        <div v-for="n in 2" :key="n" class="circle" />
        <div class="rectangle" />
      </div>
    </header>

    <h1>Bienvenue Yohan</h1>
    <button @click="handleCreateSession">Créer une session</button>

    <div class="history">
      <div v-for="n in 7" key="n" class="session" />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useSocket } from '~/helpers/communication/socketHelper';
  import { IRoles } from '../../../types/IRoles';
  import { useSessionStore } from '~/stores/sessionStore';
  import { useRouter } from '#vue-router';

  const { initSocket, createSession, on } = useSocket();
  const sessionStore = useSessionStore();
  const router = useRouter();

  function handleCreateSession() {
    initSocket(IRoles.TEACHER, () => {
      on('session-created', data => {
        sessionStore.setSession(data.sessionId, IRoles.TEACHER);
        console.log('New session: ', data.sessionId);
        router.push('/game/teacher');
      });

      createSession();
    });
  }
</script>

<style lang="scss" scoped>
  main {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    header {
      position: absolute;
      top: 0;
      left: 0;
      height: 75px;
      width: 100%;
      background: gray;

      .rightPart {
        position: relative;
        height: 100%;
        width: 20%;
        display: flex;
        float: right;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .rectangle {
          position: relative;
          height: 40px;
          width: 100px;
          background: #232323;
        }

        .circle {
          position: relative;
          height: 30px;
          width: 30px;
          aspect-ratio: 1;
          background: #232323;
          border-radius: 100%;
        }
      }
    }

    .history {
      position: absolute;
      padding: 30px 0;
      top: 100px;
      right: 20px;
      height: fit-content;
      width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #4f4f4f;
      gap: 15px;

      .session {
        position: relative;
        height: 50px;
        width: 90%;
        background: #dcdcdc;
        cursor: pointer;
      }
    }
  }
</style>
