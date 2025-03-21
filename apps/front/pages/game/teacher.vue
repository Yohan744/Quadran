<template>

  <h1>Teacher</h1>
  <h3>notif avec les connexion</h3>
  <br>
  <h3>si ya 4 groupes max on affiche un tableau de 4 qui se remplit petit à petit, peu aussi définir le nom des groupes
    ( groupe 1 - groupe 2 etc )</h3>

  <QrCode class="code" />

  <TeacherNotifications ref="notificationsRef" />

  <div class="history">

    <div v-for="n in 4" key="n" class="session"/>

  </div>

</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useSessionStore} from '~/stores/sessionStore'
import {useSocketStore} from '~/stores/socketStore'
import {useSocket} from "~/helpers/socketHelper";
import QrCode from "~/components/experience/teacher/QrCode.vue";
import {IRoles} from "../../../../types/IRoles";
import TeacherNotifications from "~/components/experience/teacher/TeacherNotifications.vue";

const router = useRouter()
const sessionStore = useSessionStore()
const socketStore = useSocketStore()
const { initSocket, joinSession, checkSessionStatus, on, disconnect } = useSocket()

const notificationsRef = ref(null)

/**
 * Check if the user is connected and if the socket is initialized
 */
onBeforeMount(() => {
  if (sessionStore.sessionId === null) router.push('/dashboard')
  else {
    if (socketStore.socketId === null) initSocket(IRoles.TEACHER)
    checkSessionStatus(sessionStore.sessionId)
    on('session-status', (data) => {
      if (data === null || data.length === 0) {
        console.log('Not a valid session')
        router.push('/dashboard')
        disconnect()
        sessionStore.clearSession()
      } else joinSession(sessionStore.sessionId, IRoles.TEACHER)
    })
  }
})

onMounted(() => {
  on("user-joined", () => {
    console.log("new user")
    notificationsRef.value?.addNotification('Un utilisateur a rejoint la session')
  })

  on("user-left", () => {
    console.log("user left")
    notificationsRef.value?.addNotification('Un utilisateur a quitté la session')
  })
})

</script>

<style lang="scss" scoped>

.code {
  position: absolute;
  top: 35%;
  left: 10%;
  height: 300px;
  width: 300px;

  :deep(canvas) {
    position: relative;
    height: 100%;
    width: 100%;
  }

}

.history {
  position: absolute;
  padding: 10px;
  top: 45%;
  right: 10%;
  height: fit-content;
  width: 400px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  background: #4f4f4f;

  .session {
    position: relative;
    height: 50px;
    width: 100%;
    border-radius: 10px;
    background: #dcdcdc;
    cursor: pointer;

    &:last-child {
      opacity: 0.4;
    }

  }

}

</style>
