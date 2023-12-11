<script lang="ts" setup>
import { handleQuery, queryParams } from '.'

const queryFormRef = ref(ElForm)

/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields()

  queryParams.deptId = undefined
  queryParams.keyword = undefined

  handleQuery()
}
</script>

<template>
  <el-card>
    <ElForm ref="queryFormRef" :model="queryParams" :inline="true">
      <el-form-item label="关键字" prop="keyword">
        <el-input
          v-model="queryParams.keyword"
          placeholder="用户名/昵称/手机号"
          clearable
          class="w-50"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleQuery">
          <el-icon i-ep-search />
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <el-icon i-ep-refresh />
          重置
        </el-button>
      </el-form-item>
    </ElForm>
  </el-card>
</template>
