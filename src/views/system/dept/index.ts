import type { DialogOption, IDeptData, IDeptListParams, IDeptOptionsData, IDeptUpdateForm } from '@/api'

import { deleteDeptApi, getDeptFormApi, getDeptListApi, getDeptOptionsApi } from '@/api'

export const loading = ref(false)

export const params = ref<IDeptListParams>({
  keyword: '',
})

export const dialog = reactive<DialogOption>({
  title: '',
  visible: false,
})

export const deptList = ref<IDeptData[]>([])
export const deptOptions = ref<IDeptOptionsData[]>([])

export const formData = reactive<IDeptUpdateForm>({
  id: 0,
  parentId: 1,
  name: '',
  sort: 0,
  status: 1,
})

/**
 * 获取部门列表
 */
export async function handleQuery() {
  loading.value = true

  const res = await getDeptListApi(params.value)

  loading.value = false

  if (!res)
    return

  deptList.value = res.data
}

/**
 * 获取部门下拉选项
 */
async function getDeptOptions() {
  const res = await getDeptOptionsApi()

  if (!res)
    return

  deptOptions.value = res.data
}

/**
 * 获取部门表单
 */
export async function handleGetForm(deptId: number) {
  const res = await getDeptFormApi({
    id: deptId,
  })

  if (!res)
    return

  Object.assign(formData, res.data)
}

/**
 * 打开弹窗
 * @param parentId 父部门ID
 * @param deptId 部门ID
 */
export async function openDialog(parentId: number, deptId = 0) {
  await getDeptOptions()

  dialog.visible = true

  formData.parentId = parentId || 1

  if (!deptId)
    return dialog.title = '新增部门'

  dialog.title = '编辑部门'

  await handleGetForm(deptId)
}

/**
 * 删除部门
 */
export async function handleDelete(deptId: number) {
  const confirm = await ElMessageBox.confirm('确认删除部门?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => false)

  if (!confirm)
    return

  const deleted = await deleteDeptApi({
    id: deptId,
  })

  if (!deleted)
    return

  handleQuery()
}
