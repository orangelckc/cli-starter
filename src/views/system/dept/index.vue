<script lang="ts" setup>
import DeptForm from './DeptForm.vue'
import DeptSearch from './DeptSearch.vue'
import DeptTable from './DeptTable.vue'

defineOptions({
  name: 'Dept',
})
</script>

<template>
  <div>
    <!-- 搜索 -->
    <DeptSearch class="mb-3" />

    <!-- 表格 -->
    <DeptTable />

    <!-- 弹窗 -->
    <DeptForm />
  </div>
</template>
