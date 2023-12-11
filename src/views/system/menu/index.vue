<script lang="ts" setup>
import MenuForm from './MenuForm.vue'
import MenuSearch from './MenuSearch.vue'
import MenuTable from './MenuTable.vue'

defineOptions({
  name: 'MyMenu',
})
</script>

<template>
  <div>
    <!-- 搜索 -->
    <MenuSearch class="mb3" />

    <!-- 表格 -->
    <MenuTable />

    <!-- 弹窗 -->
    <MenuForm />
  </div>
</template>
