<script lang="ts" setup>
import type { ILoginForm } from '@/api'
import type { FormInstance, FormRules } from 'element-plus'

import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import { useSettingsStore, useUserStore } from '@/store'

const router = useRouter()
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)

/** 登录表单数据 */
const loginForm: ILoginForm = reactive({
  username: 'root',
  password: 'admin123',
})

/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*$/, message: '用户名只能包含数字、字母、下划线', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码最小8个字符', trigger: 'blur' },
  ],
}

/** 登录逻辑 */
async function handleLogin() {
  const valid = await loginFormRef.value?.validate().catch(() => false)

  if (!valid)
    return

  loading.value = true

  const data = {
    username: loginForm.username,
    password: loginForm.password,
  }

  const success = await useUserStore().login(data)

  loading.value = false

  if (!success)
    return

  router.push({ path: '/' })
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch v-if="useSettingsStore().settings.showThemeSwitch" class="theme-switch" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layout/logo-text-2.png">
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              size="large"
              show-password
            />
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 100%;

  .theme-switch {
    cursor: pointer;
    position: fixed;
    top: 5%;
    right: 5%;
  }

  .login-card {
    overflow: hidden;

    width: 480px;

    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 150px;

      img {
        height: 100%;
      }
    }

    .content {
      padding: 20px 50px 50px 50px;

      :deep(.el-input-group__append) {
        overflow: hidden;
        padding: 0;

        .el-image {
          cursor: pointer;
          user-select: none;

          width: 100px;
          height: 40px;

          text-align: center;

          border-left: 0px;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
