<script setup lang="ts">
const props = defineProps<{
  tabPath: string
}>()

const tabBarItem = [
  {
    title: '首页',
    path: 'Home',
    icon: 'home',
  },
  {
    title: '课程',
    path: 'Book',
    icon: 'book',
  },
  {
    title: '个人',
    path: 'User',
    icon: 'user',
  },
]

function tabClick(path: string) {
  if (path === props.tabPath)
    return

  uni.switchTab({
    url: `/pages/${path}/index`,
  })
}
</script>

<template>
  <uv-tabbar :value="tabPath" inactive-color="#999" :active-color="PRIMARY_COLOR">
    <uv-tabbar-item
      v-for="({ title, path, icon }) in tabBarItem"
      :key="path"
      :text="title"
      :name="path"
      @click="tabClick"
    >
      <template #inactive-icon>
        <image class="icon" :src="`/static/tabbar/${icon}.png`" />
      </template>
      <template #active-icon>
        <image class="icon" :src="`/static/tabbar/${icon}-active.png`" />
      </template>
    </uv-tabbar-item>
  </uv-tabbar>
</template>

<style scoped lang="scss">
.icon {
  @apply w-40rpx h-40rpx;
}
</style>
