<script lang="ts" setup>
import RoleAssignForm from './RoleAssignForm.vue'
import RoleForm from './RoleForm.vue'
import RoleSearch from './RoleSearch.vue'
import RoleTable from './RoleTable.vue'

defineOptions({
  name: 'Role',
})
</script>

<template>
  <div>
    <!-- 搜索 -->
    <RoleSearch class="mb-3" />

    <!-- 表格 -->
    <RoleTable />

    <!-- 表单弹窗 -->
    <RoleForm />

    <!-- 菜单授权弹窗 -->
    <RoleAssignForm />
  </div>
</template>
