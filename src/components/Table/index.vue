<script setup lang='ts'>
interface TableData {
  [propName: string]: any
}
interface Column {
  prop: string
  label: string
  [propName: string]: any
}
defineProps<{
  tableData: TableData[]
  columns: Column[]
}>()
</script>

<template>
  <el-table v-bind="$attrs" :data="tableData" class="w-full">
    <el-table-column v-for="item in columns" :key="item.prop" align="center" v-bind="item">
      <template v-if="$slots[item.prop]" #default="scope">
        <slot :name="item.prop" v-bind="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>
