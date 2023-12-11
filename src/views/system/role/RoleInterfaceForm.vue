<script lang="ts" setup>
import { assignDialogVisible, assignSubmit, checkedRole, loading } from '.'

import type { IInterfaceData } from '@/api'

import { assignRoleInterfaceApi, getInterfaceListApi, getRoleInterfaceApi } from '@/api'

const interfaceList = ref<IInterfaceData[]>([])
const checkedInterfaces: number[] = []

const interfaceRef = ref(ElTree)

const inputValue = ref('')

const tags = [
  {
    type: '',
    label: '全部',
  },
  {
    type: 'warning',
    label: 'POST',
  },
  {
    type: 'success',
    label: 'GET',
  },
  {
    type: 'danger',
    label: 'DELETE',
  },
  {
    type: '',
    label: 'PUT',
  },
  {
    type: 'info',
    label: 'PATCH',
  },
]

async function handleRender() {
  try {
    if (!checkedRole.value?.id)
      return

    loading.value = true

    // 获取所有的接口
    const interfaces = await getInterfaceListApi()

    if (!interfaces)
      return

    interfaceList.value = interfaces.data.list

    // 回显角色已拥有的接口
    const checked = await getRoleInterfaceApi({ id: checkedRole.value.id })

    if (!checked)
      return

    checkedInterfaces.push(...checked.data)

    handleChecked()
  }
  finally {
    loading.value = false
  }
}

function handleChecked() {
  checkedInterfaces.forEach((id: number) => {
    nextTick(() => interfaceRef.value.setChecked(id, true, false))
  })
}

async function handleSubmit() {
  const checkedInterfaces = interfaceRef.value.getCheckedKeys()

  loading.value = true

  const success = await assignRoleInterfaceApi({
    id: checkedRole.value!.id,
    interfaceIds: checkedInterfaces,
  })

  loading.value = false

  if (!success)
    return

  assignDialogVisible.value = false
}

function handleFilter(type?: string) {
  interfaceRef.value.filter(type)
}

function filterNode(value: string, data: any) {
  if (!value || value === '全部')
    return true

  return data.method === value || data.path.includes(value) || data.name.includes(value)
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
        v-for="item in tags"
        :key="item.label"
        :type="item.type as any"
        class="cursor-pointer"
        @click="handleFilter(item.label)"
      >
        {{ item.label }}
      </el-tag>
    </div>
  </div>

  <el-scrollbar v-loading="loading" max-height="600px">
    <ElTree
      ref="interfaceRef"
      show-checkbox
      :data="interfaceList"
      node-key="id"
      :default-expand-all="true"
      :filter-node-method="filterNode"
    >
      <template #default="{ data }">
        <div class="flex gap-4">
          <span>{{ data.name }}</span>

          <el-tag v-if="data.method === 'POST'" type="warning">
            POST
          </el-tag>
          <el-tag v-else-if="data.method === 'GET'" type="success">
            GET
          </el-tag>
          <el-tag v-else-if="data.method === 'DELETE'" type="danger">
            DELETE
          </el-tag>
          <el-tag v-else-if="data.method === 'PUT'">
            PUT
          </el-tag>
          <el-tag v-else-if="data.method === 'PATCH'" type="info">
            PATCH
          </el-tag>

          <span>{{ data.path }}</span>
        </div>
      </template>
    </ElTree>
  </el-scrollbar>
</template>
