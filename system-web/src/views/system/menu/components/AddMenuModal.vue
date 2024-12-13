<template>
  <a-modal
    width="25%"
    v-model:visible="visible"
    :ok-loading="loading"
    :maskClosable="false"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title> {{ form.id ? '编辑菜单' : '新增菜单' }} </template>
    <div>
      <a-form auto-label-width :model="form" ref="formRef">
        <a-form-item label="菜单类型" field="type">
          <a-radio-group :disabled="isEdit" v-model="form.type" type="button">
            <a-radio :value="1">目录</a-radio>
            <a-radio :value="2">菜单</a-radio>
            <a-radio :value="3">按钮</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="上级菜单" field="parentId">
          <a-tree-select
            allow-clear
            :field-names="{ key: 'id', title: 'name', icon: 'icons' }"
            placeholder="请选择上级菜单"
            :data="menuTree"
            v-model="form.parentId"
          >
            <template #tree-slot-icon="{ node }">
              <GiSvgIcon :name="node.icon" :size="15" />
            </template>
          </a-tree-select>
        </a-form-item>
        <a-form-item v-if="form.type != 3" label="菜单图标" field="icon">
          <GiIconSelector v-model="form.icon" />
        </a-form-item>
        <a-form-item
          label="名称"
          field="name"
          :rules="[{ required: true, message: '名称不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.name" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item
          v-if="form.type != 3"
          label="路由地址"
          field="route"
          :rules="[{ required: true, message: '路由地址不能为空' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.route" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item v-if="form.type != 3" label="重定向" field="redirect">
          <a-input v-model="form.redirect" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item v-if="form.type != 3" label="组件名称" field="componentName">
          <a-input v-model="form.componentName" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item v-if="form.type === 2" label="组件路径" field="componentPath">
          <a-input v-model.trim="form.componentPath" placeholder="请输入组件路径" allow-clear>
            <template #prepend>@/src/views/</template>
            <template #append>.vue</template>
          </a-input>
        </a-form-item>
        <a-form-item v-if="form.type === 3" label="权限标识" field="permission">
          <a-input v-model="form.permission" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item label="排序" field="sort">
          <a-input-number v-model="form.sort" allow-clear placeholder="请输入" />
        </a-form-item>
        <a-form-item label="状态" field="status">
          <a-switch v-model="form.status" type="round" :checked-value="1" :unchecked-value="0">
            <template #checked>启用 </template>
            <template #unchecked> 停用 </template>
          </a-switch>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { createMenuApi, queryMenuInfoApi, updateMenuApi } from '@/apis/system/menu'
import { useMenuStore } from '@/stores'
import { Message, type ValidatedError } from '@arco-design/web-vue'

const { getMenuTree } = useMenuStore()
const { menuTree } = storeToRefs(useMenuStore())

const visible = ref(false)
const loading = ref(false)
const isEdit = computed(() => {
  return !!form.value.id
})

const form = ref<ICreateMenuReq>({})
const formRef = ref<any>(null)
const open = () => {
  form.value = {
    type: 1,
  }
  visible.value = true
}

const onUpdate = async (id: number) => {
  open()
  try {
    const res = await queryMenuInfoApi(id)
    form.value = res.data
  } catch {}
}

const handleOk = async () => {
  formRef.value?.validate().then(async (valid: undefined | Record<string, ValidatedError>) => {
    if (!valid) {
      try {
        loading.value = true
        form.value.id ? await updateMenuApi(form.value) : await createMenuApi(form.value)
        await getMenuTree()
        Message.success('操作成功')
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
