<template>
  <NuxtPage />
</template>

<script setup lang="ts">
  import { useSocketStore } from '~/stores/socketStore';
  import { onMounted, onBeforeUnmount } from 'vue';
  import { useDisablePinchZoom } from '~/helpers/disablePinchZoomHelper';
  import { initDomEvents } from '~/helpers/DomEvents';
  import { useEventEmitter } from '~/helpers/EventEmitter';
  import { IEventsName } from '~/types/IEventsName';

  const socketStore = useSocketStore();
  initDomEvents();
  useDisablePinchZoom();

  onMounted(() => {
    useEventEmitter.on(IEventsName.BeforeUnload, handleBeforeUnload);
  });

  const handleBeforeUnload = () => {
    socketStore.clearSocket();
  };

  onBeforeUnmount(() => {
    socketStore.clearSocket();
  });
</script>
