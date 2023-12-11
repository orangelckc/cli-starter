<script lang="ts" setup>
import { handleQuery, params } from '.'

const queryFormRef = ref(ElForm)

/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields()
  handleQuery()
}
</script>

<template>
  <ElCard>
    <ElForm ref="queryFormRef" :model="params" :inline="true">
      <el-form-item label="关键字" prop="keyword">
        <el-input
          v-model="params.keyword"
          placeholder="部门名称"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button class="filter-item" type="primary" @click="handleQuery">
          <el-icon i-ep-search />
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <el-icon i-ep-refresh />重置
        </el-button>
      </el-form-item>
    </ElForm>
  </ElCard>
</template>
