<template>

  <h1>student</h1>
  <h1>tu as bien rejoint la session XXXX - en attente du prof</h1>

</template>

<script setup lang="ts">
import {useStudentSessionJoiner} from "~/helpers/joinSessionViaUrlForStudentHelper";
import {onMounted} from "vue";
import {IRoles} from "../../../../types/IRoles";
import {useSessionStore} from "~/stores/sessionStore";
import {useSocket} from "~/helpers/socketHelper";

const sessionStore = useSessionStore()
const {initSocket, joinSession, checkSessionStatus, on} = useSocket()
let success = false

// useStudentSessionJoiner() // join the session via the url if provided

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('sessionId');

  if (!sessionId) {
    console.error("No session ID provided in URL")
    success = false
    return
  }

  initSocket(IRoles.STUDENT)
  checkSessionStatus(sessionId)

  on('session-status', (data) => {
    if (data === null || data.length === 0) {
      console.error('Not a valid session')
      sessionStore.clearSession()
      success = false
    } else {
      sessionStore.setSession(sessionId, IRoles.STUDENT);
      joinSession(sessionId, IRoles.STUDENT)
      success = true
    }
  })

})

</script>
