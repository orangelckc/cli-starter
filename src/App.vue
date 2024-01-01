<script lang="ts" setup>
import 'splitpanes/dist/splitpanes.css'

const btnRef = ref()
const style = ref({
  left: '0px',
  top: '0px',
})

// 绑定页面节点
const viewbox = unsafeWindow.document.querySelector('#bilibili-player') as HTMLElement

function setPosition() {
  if (!btnRef.value)
    return

  style.value = {
    left: `${viewbox.getBoundingClientRect().right - 150}px`,
    top: `${viewbox.getBoundingClientRect().top - 60}px`,
  }
}

function handleClick() {
  console.info('click')
}

onMounted(setPosition)
</script>

<template>
  <button
    ref="btnRef"
    class="btn-active absolute z-9999 text-lg font-bold text-white btn btn-md bg-[#fc80a1]!"
    :style="style"
    @click="handleClick"
  >
    点我
  </button>
</template>
