<script lang="ts" setup>
import RoleInterfaceForm from './RoleInterfaceForm.vue'
import RoleMenuForm from './RoleMenuForm.vue'

import { assignDialogVisible, assignSubmit, checkedRole, loading } from '.'

const currentTab = ref('menu')

watch(assignDialogVisible, (val) => {
  if (val)
    currentTab.value = 'menu'
})
</script>

<template>
  <el-dialog
    v-model="assignDialogVisible"
    :title="`为「${checkedRole?.name}」分配权限`"
    width="600px"
  >
    <el-tabs v-if="assignDialogVisible" v-model="currentTab" tab-position="left">
      <el-tab-pane label="菜单权限" lazy name="menu">
        <RoleMenuForm v-if="currentTab === 'menu'" />
      </el-tab-pane>

      <el-tab-pane label="接口权限" lazy name="interface">
        <RoleInterfaceForm v-if="currentTab === 'interface'" />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="assignSubmit = true">
          确 定
        </el-button>
        <el-button @click="assignDialogVisible = false">
          取 消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
