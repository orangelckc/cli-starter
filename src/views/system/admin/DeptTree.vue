<script lang="ts" setup>
import { deptOptions, getDeptOptions, handleQuery, queryParams } from '.'

import type { IDeptOptionsData } from '@/api'

const deptTreeRef = ref(ElTree)

const searchDeptName = ref('')

/**
 * 部门筛选
 */
function handleDeptFilter(value: string, data: any) {
  if (!value)
    return true

  return data.name.includes(value)
}

/**
 * 点击部门树节点
 */
function handleDeptNodeClick(data: IDeptOptionsData) {
  queryParams.deptId = data.id

  handleQuery()
}

watch(searchDeptName, (val) => {
  deptTreeRef.value!.filter(val)
})

onMounted(getDeptOptions)
</script>

<template>
  <el-card shadow="never">
    <el-input v-model="searchDeptName" placeholder="部门名称" clearable>
      <template #prefix>
        <el-icon i-ep-search />
      </template>
    </el-input>

    <ElTree
      ref="deptTreeRef"
      class="mt-2"
      :data="deptOptions"
      :props="{ children: 'children', label: 'name' }"
      :expand-on-click-node="false"
      :filter-node-method="handleDeptFilter"
      default-expand-all
      @node-click="handleDeptNodeClick"
    />
  </el-card>
</template>
