<template>
  <NuxtPage />
</template>

<script setup lang="ts">
  import { useSocketStore } from '~/stores/socketStore';
  import { onMounted, onBeforeUnmount } from 'vue';

  const socketStore = useSocketStore();

  const handleBeforeUnload = () => {
    socketStore.clearSocket();
  };

  onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('gesturestart', disableZoom);
    document.addEventListener('gesturechange', disableZoom);
    document.addEventListener('gestureend', restoreZoom);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('gesturestart', disableZoom);
    document.removeEventListener('gesturechange', disableZoom);
    document.removeEventListener('gestureend', restoreZoom);
    socketStore.clearSocket();
  });

  const disableZoom = e => {
    e.preventDefault();
    document.body.style.zoom = '0.999999999';
  };

  const restoreZoom = e => {
    e.preventDefault();
    document.body.style.zoom = '1';
  };
</script>
