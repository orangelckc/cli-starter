<script lang="ts" setup>
import { toast } from 'vue3-toastify'

import { useAppStore } from '@/useStore'

const { add, minus } = useAppStore()
const { counter } = storeToRefs(useAppStore())

function handleMsg() {
  toast.success(`现在的counter: ${counter.value}`)
}
</script>

<template>
  <h1 class="text-red text-2xl">
    我是内容组件
  </h1>
  <div class="counter">
    <h1 @click="handleMsg">
      {{ counter }}
    </h1>
    <button class="btn" @click="add">
      +
    </button>
    <button class="btn" @click="minus">
      -
    </button>
  </div>
  <RouterLink
    :to="{
      name: 'Config',
    }"
  >
    <button class="btn">
      去配置页
    </button>
  </RouterLink>
</template>

<style lang="scss" scoped>
.counter {
  @apply flex flex-col items-center gap-3 w-full px-10 text-lg;

  .btn {
    @apply w-1/2 h-10 bg-blue-500 text-white rounded-md;
  }
}
</style>
