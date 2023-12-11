<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  total: {
    required: true,
    type: Number as PropType<number>,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 30, 50]
    },
  },
  layout: {
    type: String,
    default: 'sizes, prev, pager, next, total',
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['pagination', 'update:page', 'update:limit'])

const currentPage = useVModel(props, 'page', emit)

const pageSize = useVModel(props, 'limit', emit)

function handleSizeChange(val: number) {
  pageSize.value = val
  emit('pagination', { page: currentPage.value, limit: val })
}

function handleCurrentChange(val: number) {
  currentPage.value = val
  emit('pagination', { page: val, limit: pageSize.value })
}
</script>

<template>
  <div class="mt-6 flex justify-end px-4">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
