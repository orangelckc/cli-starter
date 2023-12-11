<script lang="ts" setup>
import { MenuTags, MenuTypeEnum, dialog, formData, handleQuery, loading, menuOptions } from '.'

import type { IMenuOptionsData } from '@/api'

import { addMenuApi, updateMenuApi } from '@/api'
import IconSelect from '@/components/IconSelect/index.vue'

const menuFormRef = ref(ElForm)

const rules = reactive({
  parentId: [{ required: true, message: '请选择顶级菜单', trigger: 'blur' }],
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
  component: [
    { required: true, message: '请输入组件完整路径', trigger: 'blur' },
  ],
})

/**
 * 菜单类型 change
 */
function onMenuTypeChange() {
  // 目录菜单，自动添加组件Layout
  if (formData.type === MenuTypeEnum.CATALOG)
    formData.component = 'Layout'
  else
    formData.component = ''
}

function prepost() {
  const data = { ...formData }

  // 目录菜单，自动添加组件Layout
  if (data.type === MenuTypeEnum.CATALOG)
    data.component = 'Layout'

  // 去除所有值为空的属性
  for (const key in data) {
    const value = data[key as keyof typeof data]

    if (value === '' || value === undefined || value === null)
      delete data[key as keyof typeof data]
  }

  return data
}

/**
 * 菜单提交
 */
async function submitForm() {
  // 提交表单的预处理
  const data = prepost()

  const valid = await menuFormRef.value.validate().catch(() => false)

  if (!valid)
    return

  loading.value = true

  const menuId = data.id

  const success = menuId ? await updateMenuApi(data) : await addMenuApi(data)

  loading.value = false

  if (!success)
    return

  closeDialog()
  handleQuery()
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialog.visible = false
  resetForm()
}

/**
 * 重置表单
 */
function resetForm() {
  menuFormRef.value.resetFields()
  menuFormRef.value.clearValidate()

  formData.id = 0
  formData.component = ''
  formData.redirect = ''
  formData.icon = ''
}

/**
 * 递归过滤菜单选项
 */
function filterMenuOptions(list: IMenuOptionsData[]) {
  return list.filter((item: any) => {
    if (item.children && item.children.length)
      filterMenuOptions(item.children)

    if (item.type === MenuTypeEnum.CATALOG || item.type === MenuTypeEnum.MENU)
      item.disabled = false
    else
      item.disabled = true

    return item
  })
}
</script>

<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"

    append-to-body destroy-on-close
    width="750px"
    @close="closeDialog"
  >
    <ElForm
      ref="menuFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="父级菜单" prop="parentId">
        <el-tree-select
          v-model="formData.parentId"
          placeholder="选择上级菜单"
          :data="filterMenuOptions(menuOptions)"
          :props="{ label: 'name', value: 'id' }"
          filterable
          check-strictly
          :render-after-expand="true"
        />
      </el-form-item>

      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入菜单名称" />
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="formData.type" @change="onMenuTypeChange">
          <el-radio v-for="item in MenuTags" :key="item.type" :label="item.value">
            <span>{{ item.label }}</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="formData.type === MenuTypeEnum.EXTLINK"
        label="外链地址"
        prop="path"
      >
        <el-input v-model="formData.path" placeholder="请输入外链完整路径" />
      </el-form-item>

      <el-form-item
        v-if="formData.type === MenuTypeEnum.CATALOG || formData.type === MenuTypeEnum.MENU"
        label="路由路径"
        prop="path"
      >
        <el-input
          v-if="formData.type === MenuTypeEnum.CATALOG"
          v-model="formData.path"
          placeholder="/system  (目录以/开头)"
        />
        <el-input v-else v-model="formData.path" placeholder="user" />
      </el-form-item>

      <!-- 组件页面完整路径 -->
      <el-form-item
        v-if="formData.type === MenuTypeEnum.MENU"
        label="页面路径"
        prop="component"
      >
        <el-input
          v-model="formData.component"
          placeholder="system/user/index"
          style="width: 95%;"
        >
          <template v-if="formData.parentId !== 0" #prepend>
            src/views/
          </template>
          <template v-if="formData.parentId !== 0" #append>
            .vue
          </template>
        </el-input>
      </el-form-item>

      <!-- 权限标识 -->
      <el-form-item
        v-if="formData.type === MenuTypeEnum.BUTTON"
        label="权限标识"
        prop="permission"
      >
        <el-input v-model="formData.permission" placeholder="sys:user:add" />
      </el-form-item>

      <!-- 图标选择 -->
      <el-form-item
        v-if="formData.type !== MenuTypeEnum.BUTTON"
        label="图标"
        prop="icon"
      >
        <!-- 图标选择器 -->
        <IconSelect v-model="formData.icon" />
      </el-form-item>

      <el-form-item
        v-if="formData.type === MenuTypeEnum.CATALOG"
        label="跳转路由"
        prop="redirect"
      >
        <el-input v-model="formData.redirect" placeholder="跳转路由" />
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="formData.sort"
          style="width: 100px;"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
    </ElForm>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button @click="closeDialog">
          取 消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
