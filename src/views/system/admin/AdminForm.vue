<script lang="ts" setup>
import { deptOptions, dialog, formData, handleQuery, loading, roleOptions } from '.'

import { addAdminApi, updateAdminApi } from '@/api'
import Uploader from '@/components/Uploader/index.vue'

const adminFormRef = ref(ElForm)

const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  deptId: [{ required: true, message: '所属部门不能为空', trigger: 'blur' }],
  email: [
    {
      pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      message: '请输入正确的邮箱地址',
      trigger: 'blur',
    },
  ],
  mobile: [
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur',
    },
  ],
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
  adminFormRef.value.resetFields()
  adminFormRef.value.clearValidate()
}

function prepost() {
  const data = { ...formData }

  // 去除所有值为空的属性
  for (const key in data) {
    const value = data[key as keyof typeof data]

    if (value === '' || value === undefined || value === null)
      delete data[key as keyof typeof data]
  }

  return data
}

/**
 * 表单提交
 */
async function handleSubmit() {
  const valid = await adminFormRef.value.validate().catch(() => false)

  if (!valid)
    return

  const data = prepost()

  loading.value = true

  const adminId = data.uid

  const success = adminId ? await updateAdminApi(data) : await addAdminApi(data)

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
    append-to-body
    @close="closeDialog"
  >
    <ElForm
      ref="adminFormRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
        />
      </el-form-item>

      <el-form-item v-if="!!formData.uid" label="真实姓名" prop="realname">
        <el-input
          v-model="formData.realname"
          placeholder="请输入用户真实姓名"
        />
      </el-form-item>

      <el-form-item v-if="!!formData.uid" label="头像" prop="avatar">
        <Uploader v-model="formData.avatar" />
      </el-form-item>

      <el-form-item v-if="!!formData.uid" label="描述" prop="description">
        <el-input
          v-model="formData.description"
          placeholder="请输入用户描述"
        />
      </el-form-item>

      <el-form-item label="所属部门" prop="deptId">
        <el-tree-select
          v-model="formData.deptId"
          placeholder="请选择所属部门"
          :data="deptOptions"
          filterable
          check-strictly
          :render-after-expand="false"
          :props="{ label: 'name', value: 'id', children: 'children' }"
        />
      </el-form-item>

      <el-form-item v-if="!!formData.uid" label="性别" prop="gender">
        <el-select v-model="formData.gender" placeholder="请选择">
          <el-option label="未知" :value="0" />
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>

      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="formData.roleIds" multiple placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="!!formData.uid" label="手机号码" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号码"
          maxlength="11"
        />
      </el-form-item>

      <el-form-item v-if="!!formData.uid" label="邮箱" prop="email">
        <el-input
          v-model="formData.email"
          placeholder="请输入邮箱"
          maxlength="50"
        />
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          placeholder="请输入备注"
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
