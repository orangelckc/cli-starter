<script lang="ts" setup>
import { MenuTypeEnum, handleDelete, handleQuery, loading, menuList, openDialog, showTag, toggleStatus } from '.'

import { getIcon } from '@/config/icons'

const tableRef = ref(ElTable)

const expandRowKeys = computed(() => menuList.value.map(item => `${item.id}`))

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <el-button v-perm="['sys:menu:add']" type="success" @click="openDialog(0)">
        <template #icon>
          <el-icon i-ep-plus />
        </template>
        新增
      </el-button>
    </template>

    <ElTable
      ref="tableRef"
      v-loading="loading"
      :data="menuList"
      highlight-current-row
      :tree-props="{ children: 'children' }"
      row-key="id"
      :expand-row-keys="expandRowKeys"
      border
    >
      <el-table-column label="菜单名称" min-width="200">
        <template #default="scope">
          <el-icon :class="getIcon(scope.row.icon)" />
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="菜单类型" align="center" width="150">
        <template #default="scope">
          <el-tag :type="showTag(scope.row.type)?.type as any">
            {{ showTag(scope.row.type)?.label }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="权限标识"
        align="center"
        width="200"
        prop="permission"
      />

      <el-table-column label="状态" align="center" width="150">
        <template #default="scope">
          <el-tooltip v-if="scope.row.type !== MenuTypeEnum.BUTTON" :content="`点击${scope.row.visible ? '隐藏' : '显示'}`">
            <el-tag v-if="scope.row.visible" v-perm="['sys:menu:status']" type="success" class="cursor-pointer" @click="toggleStatus(scope.row.id, 0)">
              显示
            </el-tag>
            <el-tag v-else v-perm="['sys:menu:status']" type="info" class="cursor-pointer" @click="toggleStatus(scope.row.id, 1)">
              隐藏
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="排序" align="center" width="100" prop="sort" />

      <el-table-column fixed="right" align="center" label="操作" width="220">
        <template #default="scope">
          <el-button
            v-if="scope.row.type === MenuTypeEnum.MENU || scope.row.type === MenuTypeEnum.CATALOG"
            v-perm="['sys:menu:add']"
            type="primary"
            link
            size="small"
            @click.stop="openDialog(scope.row.id)"
          >
            <el-icon i-ep-plus />新增
          </el-button>

          <el-button
            v-perm="['sys:menu:edit']"
            type="primary"
            link
            size="small"
            @click.stop="openDialog(0, scope.row.id)"
          >
            <el-icon i-ep-edit />编辑
          </el-button>

          <el-button
            v-perm="['sys:menu:delete']"
            type="primary"
            link
            size="small"
            @click.stop="handleDelete(scope.row.id)"
          >
            <el-icon i-ep-delete />
            删除
          </el-button>
        </template>
      </el-table-column>
    </ElTable>
  </el-card>
</template>
