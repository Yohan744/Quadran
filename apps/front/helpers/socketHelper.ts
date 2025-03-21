import {ref} from 'vue'
import {io} from 'socket.io-client'
import type {IRoles} from "../../../types/IRoles"
import {useSocketStore} from "~/stores/socketStore";

const socket = ref()

export function useSocket() {
  const socketStore = useSocketStore()

  function initSocket(role: IRoles, callback?: () => void) {
    socket.value = io(`${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      reconnectionAttempts: Infinity,
      timeout: 7000,
    })
    socketStore.initSocket(socket.value.id, role)
    if (callback) callback()

    return socket.value
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function createSession() {
    if (!socket.value) return
    socket.value.emit('create-session')
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function checkSessionStatus(sessionId: string) {
    if (!socket.value) return
    socket.value.emit('check-session-status', sessionId)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function joinSession(sessionId: string, role: IRoles) {
    if (!socket.value) return
    socket.value.emit('join', {sessionId, role})
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function sendMessage(sessionId: string, role: IRoles, content: string) {
    if (!socket.value) return
    socket.value.emit('message', {sessionId, role, content})
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function disconnect() {
    if (socket.value) {
      socket.value.disconnect()
      socketStore.clearSocket()
      socket.value = null
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function deleteSession(sessionId: string) {
    if (!socket.value) return
    socket.value.emit('delete-session', {sessionId})
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function on(eventName: string, callback: (data: any) => any) {
    if (!socket.value) return
    socket.value.on(eventName, (data: any) => callback(data))
  }

  return {
    socket,
    initSocket,
    createSession,
    checkSessionStatus,
    joinSession,
    sendMessage,
    disconnect,
    deleteSession,
    on
  }
}
