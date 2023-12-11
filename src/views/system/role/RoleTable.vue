<script lang="ts" setup>
import { handleDelete, handleQuery, loading, openAssignDialog, openDialog, params, roleList, roleTotal, toggleStatus } from '.'

import Pagination from '@/components/Pagination/index.vue'

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <el-button v-perm="['sys:role:add']" type="success" @click="openDialog()">
        <el-icon i-ep-plus />新增
      </el-button>
    </template>

    <el-table
      v-loading="loading"
      :data="roleList"
      highlight-current-row
      border
    >
      <el-table-column label="角色名称" prop="name" min-width="100" />

      <el-table-column label="角色编码" prop="code" width="150" />

      <el-table-column label="状态" align="center" width="150">
        <template #default="scope">
          <el-tooltip :content="`点击${scope.row.status ? '隐藏' : '显示'}`">
            <el-tag v-if="scope.row.status === 1" v-perm="['sys:role:status']" type="success" class="cursor-pointer" @click="toggleStatus(scope.row.id, 0)">
              正常
            </el-tag>
            <el-tag v-else v-perm="['sys:role:status']" type="info" class="cursor-pointer" @click="toggleStatus(scope.row.id, 1)">
              禁用
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="排序" align="center" width="80" prop="sort" />

      <el-table-column fixed="right" label="操作" width="220">
        <template #default="scope">
          <el-button
            v-perm="['sys:role:assign']"
            type="primary"
            size="small"
            link
            @click="openAssignDialog(scope.row)"
          >
            <el-icon i-ep-position />分配权限
          </el-button>
          <el-button
            v-perm="['sys:role:edit']"
            type="primary"
            size="small"
            link
            @click="openDialog(scope.row.id)"
          >
            <el-icon i-ep-edit />编辑
          </el-button>
          <el-button
            v-perm="['sys:role:delete']"
            type="primary"
            size="small"
            link
            @click="handleDelete(scope.row.id)"
          >
            <el-icon i-ep-delete />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-if="roleTotal"
      v-model:total="roleTotal"
      v-model:page="params.pageNum"
      v-model:limit="params.pageSize"
      @pagination="handleQuery"
    />
  </el-card>
</template>
