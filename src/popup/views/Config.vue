<script lang="ts" setup>
import { useAppStore } from '@/useStore'

const { counter } = storeToRefs(useAppStore())
</script>

<template>
  <div>
    <h1 class="text-xl text-blue">
      Config {{ counter }}
    </h1>
  </div>
</template>
