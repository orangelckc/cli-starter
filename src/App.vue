<script lang="ts" setup>
import { useAppStore } from '@/store'

const { appName } = storeToRefs(useAppStore())
</script>

<template>
  <div>
    {{ appName }}
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>

</style>
