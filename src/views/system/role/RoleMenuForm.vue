<script lang="ts" setup>
import { MenuTags, showTag } from '../menu'

import { assignDialogVisible, assignSubmit, checkedRole, loading } from '.'

import type { IMenuData } from '@/api'

import { assignRoleMenuApi, getMenuOptionsApi, getRoleMenuApi } from '@/api'

const menuList = ref<IMenuData[]>([])

const menuRef = ref(ElTree)

const inputValue = ref('')

const newTags = [
  {
    type: '',
    label: '全部',
    value: 0,
  },
  ...MenuTags,
]

async function handleRender() {
  try {
    if (!checkedRole.value?.id)
      return

    loading.value = true

    // 获取所有的菜单
    const menus = await getMenuOptionsApi()

    if (!menus)
      return

    menuList.value = menus.data

    // 回显角色已拥有的菜单
    const checkedMenus = await getRoleMenuApi({ id: checkedRole.value.id })

    if (!checkedMenus)
      return

    checkedMenus.data.forEach((id: number) => {
      nextTick(() => menuRef.value.setChecked(id, true, false))
    })
  }
  finally {
    loading.value = false
  }
}

async function handleSubmit() {
  const checkedMenus = menuRef.value.getCheckedNodes(false, true) as IMenuData[]

  loading.value = true

  const success = await assignRoleMenuApi({
    id: checkedRole.value!.id,
    menuIds: checkedMenus.map(item => item.id),
  })

  loading.value = false

  if (!success)
    return

  assignDialogVisible.value = false
}

function handleFilter(type?: number | string) {
  menuRef.value.filter(type)
}

function filterNode(value: number | string, data: any) {
  if (!value || value === '全部')
    return true

  return data.name.includes(value) || data.type === value
}

watch(assignSubmit, (val) => {
  if (val)
    handleSubmit()
})

watch(inputValue, () => handleFilter(inputValue.value))

onMounted(handleRender)
</script>

<template>
  <!-- TAG 筛选 -->
  <div class="flex flex-col items-center gap-2">
    <el-input v-model="inputValue" class="w-4/5" placeholder="关键字" />
    <div class="mb-4 flex gap-4">
      <el-tag
        v-for="item in newTags"
        :key="item.label"
        :type="item.type as any"
        class="cursor-pointer"
        @click="handleFilter(item.value)"
      >
        {{ item.label }}
      </el-tag>
    </div>
  </div>

  <el-scrollbar v-loading="loading" max-height="600px">
    <ElTree
      ref="menuRef"
      show-checkbox
      :data="menuList"
      node-key="id"
      :default-expand-all="true"
      :filter-node-method="filterNode"
    >
      <template #default="{ data }">
        <span class="mr-4">{{ data.name }}</span>

        <el-tag :type="showTag(data.type)?.type as any">
          {{ showTag(data.type)?.label }}
        </el-tag>
      </template>
    </ElTree>
  </el-scrollbar>
</template>
