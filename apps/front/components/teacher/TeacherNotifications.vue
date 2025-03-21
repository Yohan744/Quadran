<template>
  <main>
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notif"
      >
        {{ notification.message }}
      </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Notification {
  id: number
  message: string
}

const notifications = ref<Notification[]>([])
let nextId = 1
const DELAY = 4000

function addNotification(message: string) {
  const id = nextId++
  notifications.value.push({ id, message })

  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }, DELAY)
}

defineExpose({ addNotification })
</script>

<style lang="scss" scoped>

main {
  position: fixed;
  padding: 15px 0;
  top: 5vh;
  right: 5vw;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 175px;
  gap: 20px;

  .notif {
    position: relative;
    padding: 10px;
    height: fit-content;
    width: 100%;
    border-radius: 10px;
    background: black;
    color: white;
  }

}

</style>
