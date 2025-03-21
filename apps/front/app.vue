<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useSocketStore } from '~/stores/socketStore'
import { onMounted, onBeforeUnmount } from 'vue'

const socketStore = useSocketStore()

const handleBeforeUnload = () => {
  socketStore.clearSocket()
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  socketStore.clearSocket()
})
</script>
