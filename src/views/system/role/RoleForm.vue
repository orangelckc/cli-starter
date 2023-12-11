<script lang="ts" setup>
import { dialog, formData, handleQuery, loading } from '.'

import { addRoleApi, updateRoleApi } from '@/api'

const roleFormRef = ref(ElForm)

const rules = reactive({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  dataScope: [{ required: true, message: '请选择数据权限', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
})

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
  roleFormRef.value.resetFields()
  roleFormRef.value.clearValidate()

  formData.id = undefined
  formData.sort = 1
  formData.status = 1
}

/**
 * 角色表单提交
 */
async function handleSubmit() {
  const valid = await roleFormRef.value.validate().catch(() => false)

  if (!valid)
    return

  loading.value = true

  const roleId = formData.id

  const success = roleId ? await updateRoleApi(formData) : await addRoleApi(formData)

  loading.value = false

  if (!success)
    return

  closeDialog()
  handleQuery()
}
</script>

<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    width="500px"
    @close="closeDialog"
  >
    <ElForm
      ref="roleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" />
      </el-form-item>

      <el-form-item label="角色编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入角色编码" />
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="formData.sort"
          controls-position="right"
          :min="0"
          style="width: 100px;"
        />
      </el-form-item>
    </ElForm>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">
          确 定
        </el-button>
        <el-button @click="closeDialog">
          取 消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
