import type { DialogOption, IAdminData, IAdminListParams, IAdminUpdateForm, IDeptOptionsData, IRoleOptionsData } from '@/api'
import type { MessageBoxData } from 'element-plus'

import { deleteAdminApi, getAdminFormApi, getAdminListApi, getDeptOptionsApi, getRoleOptionsApi, resetPasswordApi, updateAdminStatusApi } from '@/api'

export const queryParams = reactive<IAdminListParams>({
  pageNum: 1,
  pageSize: 10,
  keyword: undefined,
  deptId: undefined,
})

export const dialog = reactive<DialogOption>({
  title: '',
  visible: false,
})

export const loading = ref(false)

export const formData = reactive<IAdminUpdateForm>({
  deptId: 1,
  roleIds: [],
  uid: 0,
  username: '',
  remark: '',
  realname: '',
  description: '',
})

export const adminList = ref<IAdminData[]>([])
export const adminTotal = ref(0)

export const deptOptions = ref<IDeptOptionsData[]>([])
export const roleOptions = ref<IRoleOptionsData[]>([])

/**
 * 获取部门下拉项
 */
export async function getDeptOptions() {
  const success = await getDeptOptionsApi()

  if (!success)
    return

  deptOptions.value = success.data
}

/**
 * 获取角色下拉项
 */
export async function getRoleOptions() {
  const success = await getRoleOptionsApi()

  if (!success)
    return

  roleOptions.value = success.data
}

/**
 * 查询
 */
export async function handleQuery() {
  const { data } = await getAdminListApi(queryParams)

  adminList.value = data.list
  adminTotal.value = data.total
}

/**
 * 新增用户弹窗
 */
export async function openDialog(uid = 0) {
  dialog.visible = true

  getRoleOptions()
  getDeptOptions()

  formData.uid = uid

  if (!uid)
    return dialog.title = '新增管理员'

  dialog.title = '编辑管理员'

  await handleGetForm(uid)
}

/**
 * 获取管理员表单数据
 */
export async function handleGetForm(uid: number) {
  const res = await getAdminFormApi({ uid })

  if (!res)
    return

  Object.assign(formData, res.data)
}

/**
 * 删除用户
 */
export async function handleDelete(uid: number) {
  const confirm = await ElMessageBox.confirm('确认删除管理员?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => false)

  if (!confirm)
    return

  loading.value = true

  const success = await deleteAdminApi({ uid })

  loading.value = false

  if (!success)
    return

  handleQuery()
}

/**
 * 重置密码
 */
export async function resetPassword(row: IAdminData) {
  const confirm = await ElMessageBox.prompt(
    `请输入用户「${row.username}」的新密码`,
    '重置密码',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    },
  ).catch(() => false)

  if (!confirm)
    return

  const { value } = confirm as MessageBoxData

  if (!value || value.length < 8) {
    ElMessage.warning('新密码最少8位')
    return
  }

  loading.value = true

  const success = await resetPasswordApi({
    uid: row.uid,
    password: value,
  })

  loading.value = false

  if (!success)
    return

  handleQuery()
}

/**
 * 修改用户状态
 */
export async function handleStatusChange(row: IAdminData) {
  const origStatus = row.status === 1 ? 0 : 1

  const confirm = await ElMessageBox.confirm('确认修改管理员状态?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    row.status = origStatus
    return false
  })

  if (!confirm)
    return

  loading.value = true

  const success = await updateAdminStatusApi({
    uid: row.uid,
    status: row.status,
  })

  loading.value = false

  if (!success) {
    row.status = origStatus
    return
  }

  handleQuery()
}
