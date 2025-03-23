import { onBeforeMount } from 'vue'
import { useSessionStore } from '~/stores/sessionStore'
import { useSocket } from '~/helpers/socketHelper'
import { IRoles } from '../../../types/IRoles'

export function useStudentSessionJoiner() {
  const sessionStore = useSessionStore()
  const { initSocket, joinSession, checkSessionStatus, on } = useSocket()
  let success = false

  onBeforeMount(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('sessionId')

    if (!sessionId) {
      console.error('No session ID provided in URL')
      success = false
      return
    }

    initSocket(IRoles.STUDENT)
    checkSessionStatus(sessionId)

    on('session-status', data => {
      if (data === null || data.length === 0) {
        console.error('Not a valid session')
        sessionStore.clearSession()
        success = false
      } else {
        sessionStore.setSession(sessionId, IRoles.STUDENT)
        joinSession(sessionId, IRoles.STUDENT)
        success = true
      }
    })
  })

  return success
}
