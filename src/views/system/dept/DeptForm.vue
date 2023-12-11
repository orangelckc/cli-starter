<script lang="ts" setup>
import { deptOptions, dialog, formData, handleQuery, loading } from '.'

import { addDeptApi, updateDeptApi } from '@/api'

const deptFormRef = ref(ElForm)

const rules = reactive({
  parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
  sort: [{ required: true, message: '显示排序不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '部门状态不能为空', trigger: 'blur' }],
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
  deptFormRef.value.resetFields()
  deptFormRef.value.clearValidate()

  formData.id = 0
  formData.parentId = 1
  formData.name = ''
  formData.status = 1
  formData.sort = 1
}

/**
 * 表单提交
 */
async function handleSubmit() {
  const valid = await deptFormRef.value.validate().catch(() => false)

  if (!valid)
    return

  loading.value = true

  const deptId = formData.id

  const success = deptId ? await updateDeptApi(formData) : await addDeptApi(formData)

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
    width="600px"
    @closed="closeDialog"
  >
    <ElForm
      ref="deptFormRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="上级部门" prop="parentId">
        <el-tree-select
          v-model="formData.parentId"
          placeholder="选择上级部门"
          :data="deptOptions"
          :props="{ label: 'name', value: 'id' }"
          filterable
          check-strictly
          :disabled="formData.id === 1"
          :render-after-expand="false"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="显示排序" prop="sort">
        <el-input-number
          v-model="formData.sort"
          controls-position="right"
          :min="1"
          class="w-full"
        />
      </el-form-item>
      <el-form-item v-if="formData.id" label="部门状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">
            正常
          </el-radio>
          <el-radio :label="0">
            禁用
          </el-radio>
        </el-radio-group>
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
