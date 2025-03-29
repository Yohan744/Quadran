import { useEventEmitter } from './EventEmitter';
import { onMounted, onBeforeUnmount } from 'vue';
import { IEventsName } from '~/types/IEventsName';

export function initDomEvents(): void {
  onMounted(() => {
    window.addEventListener('resize', (e: Event) => handleResize(e));
    window.addEventListener('beforeunload', (e: Event) => handleResize(e));

    document.addEventListener('gesturestart', (e: Event) => handleGestureStart(e));
    document.addEventListener('gesturechange', (e: Event) => handleGestureChange(e));
    document.addEventListener('gestureend', (e: Event) => handleGestureEnd(e));
  });

  const handleResize = (e: Event) => {
    useEventEmitter.trigger(IEventsName.Resize, [e]);
  };

  const handleBeforeUnload = (e: Event) => {
    useEventEmitter.trigger(IEventsName.BeforeUnload, [e]);
    e.preventDefault();
  };

  const handleGestureStart = (e: Event) => {
    useEventEmitter.trigger(IEventsName.GestureStart, [e]);
  };

  const handleGestureChange = (e: Event) => {
    useEventEmitter.trigger(IEventsName.GestureChange, [e]);
  };

  const handleGestureEnd = (e: Event) => {
    useEventEmitter.trigger(IEventsName.GestureEnd, [e]);
  };

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('beforeunload', handleBeforeUnload);

    document.removeEventListener('gesturestart', handleGestureStart);
    document.removeEventListener('gesturechange', handleGestureChange);
    document.removeEventListener('gestureend', handleGestureEnd);

    useEventEmitter.off(IEventsName.Resize);
    useEventEmitter.off(IEventsName.BeforeUnload);

    useEventEmitter.off(IEventsName.GestureStart);
    useEventEmitter.off(IEventsName.GestureChange);
    useEventEmitter.off(IEventsName.GestureEnd);
  });
}
