<script lang="ts" setup>
import { adminList, adminTotal, handleDelete, handleQuery, handleStatusChange, openDialog, queryParams, resetPassword } from '.'

import Pagination from '@/components/Pagination/index.vue'

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <el-button
          v-perm="['sys:admin:add']"
          type="success"
          @click="openDialog()"
        >
          <el-icon i-ep-plus />新增
        </el-button>
      </div>
    </template>

    <el-table :data="adminList">
      <el-table-column
        key="id"
        label="编号"
        type="index"
        width="100"
      />

      <el-table-column
        key="username"
        label="用户名"
        align="center"
        prop="username"
      >
        <template #default="scope">
          <div class="uno-center gap-1">
            {{ scope.row.username }}
            <el-icon
              class="text-lg"
              :class="scope.row.gender ? scope.row.gender === 1 ? 'i-ep-male' : 'i-ep-female' : 'i-ep-question-filled'"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="部门"
        width="120"
        align="center"
        prop="deptName"
      />

      <el-table-column
        label="手机号码"
        align="center"
        prop="mobile"
        width="120"
      />

      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            v-perm="['sys:admin:status']"
            :inactive-value="0"
            :active-value="1"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="220">
        <template #default="scope">
          <el-button
            v-perm="['sys:admin:reset']"
            type="primary"
            size="small"
            link
            @click="resetPassword(scope.row)"
          >
            <el-icon i-ep-refresh-left />重置密码
          </el-button>
          <el-button
            v-perm="['sys:admin:edit']"
            type="primary"
            link
            size="small"
            @click="openDialog(scope.row.uid)"
          >
            <el-icon i-ep-edit />编辑
          </el-button>
          <el-button
            v-perm="['sys:admin:delete']"
            type="primary"
            link
            size="small"
            @click="handleDelete(scope.row.uid)"
          >
            <el-icon i-ep-delete />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-if="adminTotal > 0"
      v-model:total="adminTotal"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="handleQuery"
    />
  </el-card>
</template>
