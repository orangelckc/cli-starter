import type { DialogOption, IRoleData, IRoleListParams, IRoleOptionsData, IRoleUpdateForm } from '@/api'

import { deleteRoleApi, getRoleFormApi, getRoleListApi, updateRoleStatusApi } from '@/api'

export const loading = ref(false)

export const roleList = ref<IRoleData[]>([])
export const roleTotal = ref(0)

export const roleOptions = ref<IRoleOptionsData[]>([])

export const checkedMenuIds = ref<number[]>([])
export const checkedInterfaceIds = ref<number[]>([])

export const assignDialogVisible = ref(false)
export const assignSubmit = ref(false)

export const checkedRole = ref<IRoleData>()

export const params = ref<IRoleListParams>({
  pageSize: 10,
  pageNum: 1,
  keyword: '',
})

export const dialog = reactive<DialogOption>({
  title: '',
  visible: false,
})

export const formData = reactive<IRoleUpdateForm>({
  id: 0,
  code: '',
  name: '',
  sort: 1,
  status: 1,
})

/**
 * 获取角色列表
 */
export async function handleQuery() {
  loading.value = true

  const res = await getRoleListApi(params.value)

  loading.value = false

  if (!res)
    return

  roleList.value = res.data.list
  roleTotal.value = res.data.total
}

/**
 * 删除角色
 */
export async function handleDelete(roleId: number) {
  const confirm = await ElMessageBox.confirm('确认删除选中项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => false)

  if (!confirm)
    return

  const deleted = await deleteRoleApi({
    id: roleId,
  })

  if (!deleted)
    return

  handleQuery()
}

/**
 * 获取菜单表单
 */
export async function getRoleForm(roleId: number) {
  const res = await getRoleFormApi({
    id: roleId,
  })

  if (!res)
    return

  Object.assign(formData, res.data)
}

/**
 * 打开表单弹窗
 * @param roleId 角色ID
 */
export async function openDialog(roleId?: number) {
  dialog.visible = true

  if (!roleId)
    return dialog.title = '新增角色'

  dialog.title = '编辑角色'

  await getRoleForm(roleId)
}

/**
 * 改变角色显示状态
 * @param roleId 角色ID
 */
export async function toggleStatus(roleId: number, status: number) {
  const confirm = await ElMessageBox.confirm('确认修改状态?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => false)

  if (!confirm)
    return

  const success = await updateRoleStatusApi({
    id: roleId,
    status,
  })

  if (!success)
    return

  handleQuery()
}

/**
 * 打开分配权限弹窗
 */
export async function openAssignDialog(row: IRoleData) {
  checkedRole.value = row

  assignSubmit.value = false

  assignDialogVisible.value = true
}
