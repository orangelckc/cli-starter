<script setup lang="ts">
definePageMeta({ title: '首页', icon: 'i-ion-home' })

const dayjs = useDayjs()

const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
const { appName } = storeToRefs(useAppStore())
</script>

<template>
  <div class="h-1000">
    <NuxtLink to="/anomaly">
      登录 {{ time }}
      {{ $dayjs().format('YYYY-MM-DD HH:mm:ss') }}
    </NuxtLink>
    <el-button @click="ElMessage('hello')">
      button
    </el-button>
    <ElButton :icon="ElIconEditPen" type="success">
      button
    </ElButton>
    <LazyElButton type="warning">
      lazy button
    </LazyElButton>
    <span>{{ appName }}</span>
  </div>
</template>
