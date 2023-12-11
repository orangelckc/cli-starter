<!-- TODO 改成vueuse，不使用第三方插件 -->
<script lang="ts" setup>
import screenfull from 'screenfull'

defineOptions({
  name: 'Screenfull',
})

const props = defineProps({
  /** 全屏的元素，默认是 html */
  element: {
    type: String,
    default: 'html',
  },
  /** 打开全屏提示语 */
  openTips: {
    type: String,
    default: '全屏',
  },
  /** 关闭全屏提示语 */
  exitTips: {
    type: String,
    default: '退出全屏',
  },
})

const tips = ref<string>(props.openTips)
const isFullscreen = ref<boolean>(false)

// 切换全屏
function toggle() {
  const dom = document.querySelector(props.element) || undefined

  if (!screenfull.isEnabled) {
    ElMessage.warning('您的浏览器无法工作')
    return
  }

  screenfull.toggle(dom)
}

function change() {
  isFullscreen.value = screenfull.isFullscreen
  tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips
}

screenfull.on('change', change)

onUnmounted(() => {
  if (screenfull.isEnabled)
    screenfull.off('change', change)
})
</script>

<template>
  <div @click="toggle">
    <el-tooltip effect="dark" :content="tips" placement="bottom">
      <el-icon class="i-ep-full-screen" />
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;

  &:focus {
    outline: none;
  }
}
</style>
