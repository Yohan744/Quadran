import { defineStore } from 'pinia'

interface SessionState {
  socketId: string | null | undefined
  role: 'teacher' | 'student' | null
  status: 'connected' | 'disconnected'
}

export const useSocketStore = defineStore('socketStore', {
  state: (): SessionState => ({
    socketId: null,
    role: null,
    status: 'disconnected',
  }),
  actions: {
    initSocket(id: string | undefined, role: 'teacher' | 'student'): void {
      this.socketId = id
      this.role = role
      this.status = 'connected'
    },
    clearSocket(): void {
      this.socketId = null
      this.role = null
      this.status = 'disconnected'
    },
  },
  persist: true,
})
