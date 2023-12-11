<!-- 侧边栏展开/关闭按钮 -->
<script lang="ts" setup>
defineOptions({
  name: 'Hamburger',
})

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'toggleClick'): void
}>()
</script>

<template>
  <div class="uno-center" @click="emit('toggleClick')">
    <el-icon :size="18" :class="props.isActive ? 'i-ep-fold' : 'i-ep-expand'" />
  </div>
</template>
