<template>
  <a-drawer
    width="20%"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title> {{ form.id ? '编辑部门' : '新增部门' }} </template>
    <div>
      <a-form auto-label-width :model="form" ref="formRef">
        <a-form-item v-if="form.parentId || !form.id" label="上级部门" field="parentId">
          <a-tree-select
            :data="departmentTree"
            v-model="form.parentId"
            allow-clear
            :field-names="{ key: 'id', title: 'name' }"
            placeholder="请选择上级部门"
          ></a-tree-select>
        </a-form-item>
        <a-form-item
          label="部门名称"
          field="name"
          :rules="[{ required: true, message: '部门名称不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.name" placeholder="请输入" />
        </a-form-item>
        <a-form-item
          label="部门编号"
          field="code"
          :rules="[{ required: true, message: '部门编号不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.code" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="部门描述" field="description">
          <a-textarea
            v-model="form.description"
            :max-length="200"
            placeholder="请输入"
            auto-size
            show-word-limit
          />
        </a-form-item>
        <a-form-item label="排序" field="sort">
          <a-input-number v-model="form.sort" :min="1" :max="9999" />
        </a-form-item>

        <a-form-item label="状态" field="status">
          <a-switch v-model="form.status" :checked-value="1" :unchecked-value="0" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import {
  addDepartmentApi,
  getDepartmentInfoApi,
  updateDepartmentApi,
} from '@/apis/system/department'
import { Message, type ValidatedError } from '@arco-design/web-vue'
import { useDepartmentStore } from '@/stores'

const { getDepartmentTree } = useDepartmentStore()
const { departmentTree } = storeToRefs(useDepartmentStore())
const visible = ref(false)
const loading = ref(false)

const form = ref<IDepartmentParams>({})
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
