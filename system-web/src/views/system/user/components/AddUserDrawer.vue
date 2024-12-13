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
            v-model="form.username"
            :max-length="10"
            allow-clear
            show-word-limit
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item
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
          :rules="[{ required: true, message: '手机号不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.mobile" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item label="邮箱" field="email">
          <a-input v-model="form.email" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item label="性别" field="sex">
          <a-radio-group v-model="form.sex">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
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
import { useDepartmentStore } from '@/stores'

const { departmentTree } = storeToRefs(useDepartmentStore())

const visible = ref(false)
const loading = ref(false)

const form = ref<IAddUserParams>({})
const formRef = ref<any>(null)
const open = () => {
  form.value = {}
  visible.value = true
}

const onUpdate = async (id: number) => {
  open()
  try {
    const res = await getDepartmentInfoApi(id)
    form.value = res.data
  } catch {}
}

const handleOk = async () => {
  formRef.value?.validate().then(async (valid: undefined | Record<string, ValidatedError>) => {
    if (!valid) {
      try {
        loading.value = true
        form.value.id ? await updateDepartmentApi(form.value) : await addDepartmentApi(form.value)
        Message.success('操作成功')
        getDepartmentTree()
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
