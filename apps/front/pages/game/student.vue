<template>
  <h1>student</h1>
  <h1>tu as bien rejoint la session XXXX - en attente du prof</h1>
</template>

<script setup lang="ts">
  import { useStudentSessionJoiner } from '~/helpers/joinSessionViaUrlForStudentHelper'

  useStudentSessionJoiner() // join the session via the url if provided
</script>
