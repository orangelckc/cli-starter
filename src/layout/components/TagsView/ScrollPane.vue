<script lang="ts" setup>
import { ElScrollbar } from 'element-plus'

import type { RouterLink } from 'vue-router'

import Screenfull from '@/components/Screenfull/index.vue'
import { useSettingsStore } from '@/store'

defineOptions({
  name: 'ScrollPane',
})

const props = defineProps({
  tagRefs: {
    type: Object as PropType<InstanceType<typeof RouterLink>[]>,
    required: true,
  },
})

const route = useRoute()
const settingsStore = useSettingsStore()

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollbarContentRef = ref<HTMLDivElement>()

/** 当前滚动条距离左边的距离 */
let currentScrollLeft = 0
/** 每次滚动距离 */
const translateDistance = 200

/** 滚动时触发 */
function scroll({ scrollLeft }: { scrollLeft: number }) {
  currentScrollLeft = scrollLeft
}

/** 鼠标滚轮滚动时触发 */
function wheelScroll({ deltaY }: WheelEvent) {
  if (deltaY.toString().startsWith('-'))
    scrollTo('left')
  else
    scrollTo('right')
}

/** 获取可能需要的宽度 */
function getWidth() {
  /** 可滚动内容的长度 */
  const scrollbarContentRefWidth = scrollbarContentRef.value!.clientWidth
  /** 滚动可视区宽度 */
  const scrollbarRefWidth = scrollbarRef.value!.wrapRef!.clientWidth
  /** 最后剩余可滚动的宽度 */
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft

  return { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance }
}

/** 左右滚动 */
function scrollTo(direction: 'left' | 'right', distance: number = translateDistance) {
  let scrollLeft = 0
  const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } = getWidth()
  // 没有横向滚动条，直接结束
  if (scrollbarRefWidth > scrollbarContentRefWidth)
    return
  if (direction === 'left')
    scrollLeft = Math.max(0, currentScrollLeft - distance)
  else
    scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)

  scrollbarRef.value!.setScrollLeft(scrollLeft)
}

/** 移动到目标位置 */
function moveTo() {
  const tagRefs = props.tagRefs
  for (let i = 0; i < tagRefs.length; i++) {
    if (route.path === tagRefs[i].$props.to.path) {
      const el: HTMLElement = tagRefs[i].$el
      const offsetWidth = el.offsetWidth
      const offsetLeft = el.offsetLeft
      const { scrollbarRefWidth } = getWidth()
      // 当前 tag 在可视区域左边时
      if (offsetLeft < currentScrollLeft) {
        const distance = currentScrollLeft - offsetLeft
        scrollTo('left', distance)
        return
      }
      // 当前 tag 在可视区域右边时
      const width = scrollbarRefWidth + currentScrollLeft - offsetWidth
      if (offsetLeft > width) {
        const distance = offsetLeft - width
        scrollTo('right', distance)
        return
      }
    }
  }
}

watch(
  route,
  () => {
    nextTick(moveTo)
  },
  {
    deep: true,
  },
)

const showScreenfull = computed(() => {
  return settingsStore.settings.showScreenfull
})
</script>

<template>
  <div class="scroll-container">
    <el-icon class="left arrow i-ep-arrow-left" @click="scrollTo('left')" />
    <ElScrollbar ref="scrollbarRef" @wheel.prevent="wheelScroll" @scroll="scroll">
      <div ref="scrollbarContentRef" class="scrollbar-content">
        <slot />
      </div>
    </ElScrollbar>
    <el-icon class="arrow right i-ep-arrow-right" @click="scrollTo('right')" />
    <Screenfull v-if="showScreenfull" element=".app-main" open-tips="内容区全屏" class="screenfull" />
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  user-select: none;
  display: flex;
  justify-content: space-between;
  height: 100%;

  .arrow {
    cursor: pointer;
    width: 40px;
    height: 100%;

    &.left {
      box-shadow: 5px 0 5px -6px #ccc;
    }

    &.right {
      box-shadow: -5px 0 5px -6px #ccc;
    }
  }

  .el-scrollbar {
    flex: 1;
    // 横向超出窗口长度时，显示滚动条
    white-space: nowrap;

    .scrollbar-content {
      display: inline-block;
    }
  }

  .screenfull {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
  }
}
</style>
