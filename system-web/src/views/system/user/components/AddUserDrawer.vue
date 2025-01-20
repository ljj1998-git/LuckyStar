<template>
  <a-drawer
    width="25%"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title> {{ form.id ? '编辑用户' : '新增用户' }} </template>
    <div>
      <a-form auto-label-width :model="form" ref="formRef">
        <a-form-item
          label="用户名"
          field="username"
          :rules="[{ required: true, message: '用户名称不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            v-model="form.username"
            :max-length="10"
            allow-clear
            show-word-limit
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          label="昵称"
          field="nickname"
          :rules="[{ required: true, message: '昵称不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            v-model="form.nickname"
            :max-length="10"
            allow-clear
            show-word-limit
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
          v-if="!form.id"
          label="密码"
          field="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input-password v-model="form.password" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item
          label="手机号"
          field="mobile"
          :rules="[
            { required: true, message: '手机号不能为空' },
            { match: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.mobile" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item
          label="邮箱"
          field="email"
          :rules="[{ type: 'email', message: '请输入正确的邮箱' }]"
        >
          <a-input v-model="form.email" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item label="性别" field="sex">
          <a-radio-group v-model="form.sex">
            <a-radio :value="0">男</a-radio>
            <a-radio :value="1">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="用户描述" field="description">
          <a-textarea
            v-model="form.description"
            allow-clear
            :max-length="200"
            placeholder="请输入"
            auto-size
            show-word-limit
          />
        </a-form-item>
        <a-form-item label="所属部门" field="parentId">
          <a-tree-select
            :data="departmentTree"
            v-model="form.departmentId"
            allow-clear
            :field-names="{ key: 'id', title: 'name' }"
            placeholder="请选择上级部门"
          ></a-tree-select>
        </a-form-item>

        <a-form-item label="状态" field="status">
          <a-switch v-model="form.status" type="round" :checked-value="1" :unchecked-value="0">
            <template #checked>启用 </template>
            <template #unchecked> 停用 </template>
          </a-switch>
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { accountRegisterApi, getUserInfoApi, updateUserApi } from '@/apis/system/user'
import { useDepartmentStore } from '@/stores'
import { encryptByAes } from '@/utils/encrypt'
import { Message, type ValidatedError } from '@arco-design/web-vue'

const emits = defineEmits(['ok'])
const { departmentTree } = storeToRefs(useDepartmentStore())

const visible = ref(false)
const loading = ref(false)

const form = ref<IAddUserParams>({
  sex: 0,
  status: 1,
})
const formRef = ref<any>(null)
const open = () => {
  form.value = {
    sex: 0,
    status: 1,
  }
  visible.value = true
}

const onUpdate = async (id: number) => {
  try {
    const res = await getUserInfoApi(id)
    form.value = res.data
    console.log(form.value)
    visible.value = true
  } catch {
    Message.error('获取用户信息失败')
  }
}

const handleOk = async () => {
  formRef.value?.validate().then(async (valid: undefined | Record<string, ValidatedError>) => {
    if (!valid) {
      try {
        loading.value = true
        form.value.id
          ? await updateUserApi(form.value)
          : await accountRegisterApi({
              ...form.value,
              password: encryptByAes(form.value.password!),
            })
        emits('ok')
        handleCancel()
      } catch {
        //
      } finally {
        loading.value = false
      }
    }
  })
}

const handleCancel = () => {
  visible.value = false
}

defineExpose({
  open,
  onUpdate,
})
</script>
