<script lang="ts" setup>
import TabBar from '@/components/TabBar/index.vue'
import { useAppStore } from '@/stores/app'

const { appName } = storeToRefs(useAppStore())
useToast('首页')
</script>

<route type="home" lang="json">
{}
</route>

<template>
  <view>
    <h1 class="text-red-300">
      首页 {{ appName }}
    </h1>
  </view>
  <TabBar tab-path="Home" />
</template>
