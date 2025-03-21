import {defineStore} from "pinia";

interface SessionState {
    sessionId: string | null;
    role: 'teacher' | 'student' | null;
    // maxGroupNumber: number; TODO AFTER
    sessionStartTime: number | null;
}

export const useSessionStore = defineStore('sessionStore', {
    state: (): SessionState => ({
        sessionId: null,
        role: null,
        sessionStartTime: null
    }),
    actions: {
        setSession(id: string, role: 'teacher' | 'student'): void {
            this.sessionId = id;
            this.role = role;
            this.sessionStartTime = Date.now();
        },
        changeSessionStartTime(time: number): void {
            if (!this.sessionStartTime && this.role !== 'teacher') return
            this.sessionStartTime = time;
        },
        clearSession(): void {
            this.sessionId = null;
            this.role = null;
            this.sessionStartTime = null;
        }
    },
    persist: true
})
