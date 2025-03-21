<!-- components/QrCode.vue -->
<template>
  <div>
    <div ref="qrCodeRef"/>
    <div>{{urlRef}}</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import QRCodeStyling from 'qr-code-styling'
import {useSessionStore} from '~/stores/sessionStore'

const qrCodeRef = ref<HTMLElement | null>(null)
const urlRef = ref<HTMLElement | string>("")
let qrCodeInstance: QRCodeStyling
const sessionStore = useSessionStore()

onMounted(() => {

  const sessionId = sessionStore.sessionId
  const url = `${window.location.origin}/game/student?sessionId=${sessionId}`
  urlRef.value = url

  qrCodeInstance = new QRCodeStyling({
    width: 1024,
    height: 1024,
    data: url,
    dotsOptions: {
      color: '#000000',
      type: 'rounded'
    },
    backgroundOptions: {
      color: 'rgb(255,255,255)'
    },
    cornersSquareOptions: {
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      type: 'dot'
    },
    imageOptions: {
      margin: 4
    }
  })

  if (qrCodeRef.value) {
    qrCodeInstance.append(qrCodeRef.value)
  }
})

</script>
