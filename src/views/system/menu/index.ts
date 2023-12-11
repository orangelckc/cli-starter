import type { DialogOption, IMenuData, IMenuListParams, IMenuOptionsData, IMenuUpdateForm } from '@/api'

import { deleteMenuApi, getMenuFormApi, getMenuListApi, getMenuOptionsApi, updateMenuStatusApi } from '@/api'

export enum MenuTypeEnum {
  MENU = 1,
  CATALOG = 2,
  BUTTON = 3,
  EXTLINK = 4,
}

export const MenuTags = [
  {
    type: 'warning',
    label: '目录',
    value: MenuTypeEnum.CATALOG,
  },
  {
    type: 'success',
    label: '菜单',
    value: MenuTypeEnum.MENU,
  },
  {
    type: 'danger',
    label: '按钮',
    value: MenuTypeEnum.BUTTON,
  },
  {
    type: 'info',
    label: '外链',
    value: MenuTypeEnum.EXTLINK,
  },
]

export const loading = ref(false)

export const menuList = ref<IMenuData[]>([])
export const menuOptions = ref<IMenuOptionsData[]>([])

export const params = ref<IMenuListParams>({
  keyword: '',
})

export const dialog = reactive<DialogOption>({
  title: '',
  visible: false,
})

export const formData = reactive<IMenuUpdateForm>({
  id: 0,
  parentId: 0,
  sort: 1,
  type: 2,
  name: '',
  redirect: '',
  path: '',
  component: '',
  icon: '',
  permission: '',
})

/**
 * 显示的TAG
 */
export function showTag(type: number) {
  return MenuTags.find(item => item.value === type)
}

/**
 * 获取菜单列表
 */
export async function handleQuery() {
  loading.value = true

  const res = await getMenuListApi(params.value)

  loading.value = false

  if (!res)
    return

  menuList.value = res.data
}

/**
 * 删除菜单
 */
export async function handleDelete(menuId: number) {
  const confirm = await ElMessageBox.confirm('确认删除选中项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => false)

  if (!confirm)
    return

  const deleted = await deleteMenuApi({
    id: menuId,
  })

  if (!deleted)
    return

  handleQuery()
}

/**
 * 获取菜单下拉选项
 */
async function getMenuOptions() {
  const res = await getMenuOptionsApi()

  if (!res)
    return

  menuOptions.value = res.data
}

/**
 * 获取菜单表单
 */
export async function handleGetForm(menuId: number) {
  const res = await getMenuFormApi({
    id: menuId,
  })

  if (!res)
    return

  Object.assign(formData, res.data)
}

/**
 * 打开表单弹窗
 * @param parentId 父菜单ID
 * @param menuId 菜单ID
 */
export async function openDialog(parentId: number, menuId?: number) {
  await getMenuOptions()

  dialog.visible = true

  formData.parentId = parentId

  if (!menuId)
    return dialog.title = '新增菜单'

  dialog.title = '编辑菜单'

  await handleGetForm(menuId)
}

/**
 * 改变菜单显示状态
 * @param menuId 菜单ID
 * @param visible 是否显示
 */
export async function toggleStatus(menuId: number, visible: number) {
  const confirm = await ElMessageBox.confirm('确认修改状态?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => false)

  if (!confirm)
    return

  const success = await updateMenuStatusApi({
    id: menuId,
    visible,
  })

  if (!success)
    return

  handleQuery()
}
