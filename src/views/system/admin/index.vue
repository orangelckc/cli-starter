<script setup lang="ts">
import AdminForm from './AdminForm.vue'
import AdminSearch from './AdminSearch.vue'
import AdminTable from './AdminTable.vue'
import DeptTree from './DeptTree.vue'
</script>

<template>
  <el-row :gutter="20">
    <!-- 部门树 -->
    <el-col :lg="4" :xs="24" class="mb-[12px]">
      <DeptTree />
    </el-col>

    <el-col :lg="20" :xs="24">
      <!-- 检索区域 -->
      <AdminSearch />

      <!-- 表格区域 -->
      <AdminTable />
    </el-col>

    <AdminForm />
  </el-row>
</template>
