<script lang="ts" setup>
import { deptList, handleDelete, handleQuery, loading, openDialog } from '.'

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <el-card>
    <template #header>
      <el-button v-perm="['sys:dept:add']" type="success" @click="openDialog(1)">
        <el-icon i-ep-plus />新增
      </el-button>
    </template>

    <el-table
      v-loading="loading"
      :data="deptList"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="部门名称" min-width="200" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 1" type="success">
            正常
          </el-tag>
          <el-tag v-else type="info">
            禁用
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="100" />

      <el-table-column label="操作" fixed="right" align="left" width="200">
        <template #default="scope">
          <el-button
            v-perm="['sys:dept:add']"
            type="primary"
            link
            size="small"
            @click.stop="openDialog(scope.row.id)"
          >
            <el-icon i-ep-plus />新增
          </el-button>
          <el-button
            v-perm="['sys:dept:edit']"
            type="primary"
            link
            size="small"
            :disabled="scope.row.parentId === 0"
            @click.stop="openDialog(scope.row.parentId, scope.row.id)"
          >
            <el-icon i-ep-edit />编辑
          </el-button>
          <el-button
            v-perm="['sys:dept:delete']"
            type="primary"
            link
            size="small"
            :disabled="scope.row.parentId === 0"
            @click.stop="handleDelete(scope.row.id)"
          >
            <el-icon i-ep-delete />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
