<script lang="ts" setup>
import { useAppStore } from '@/store/app'

defineOptions({ name: 'Config' })

const { counter } = storeToRefs(useAppStore())
const { add } = useAppStore()
</script>

<template>
  <el-card>
    <h1 class="text-xl text-blue">
      Config {{ counter }}
      <el-button type="danger" @click="add">
        Add+1
      </el-button>
    </h1>
  </el-card>
</template>
