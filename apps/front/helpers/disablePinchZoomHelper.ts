import { onMounted } from 'vue';
import { useEventEmitter } from '~/helpers/EventEmitter';

export function useDisablePinchZoom() {
  onMounted(() => {
    useEventEmitter.on('gestureStart', disableZoom);
    useEventEmitter.on('gestureChange', disableZoom);
    useEventEmitter.on('gestureEnd', restoreZoom);
  });

  const disableZoom = (e: Event) => {
    e.preventDefault();
    document.body.style.zoom = '0.999999999';
  };

  const restoreZoom = (e: Event) => {
    e.preventDefault();
    document.body.style.zoom = '1';
  };

  return {
    disableZoom,
    restoreZoom
  };
}
