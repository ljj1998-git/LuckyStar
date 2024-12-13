<template>
  <div class="bg-white w-full min-h-full p-5 box-border">
    <a-row align="center">
      <a-col :span="20">
        <a-form :model="form" layout="inline">
          <a-row class="w-full">
            <a-col :span="8">
              <a-form-item field="name" label="菜单名称">
                <a-input v-model="form.name" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="status" label="状态">
                <a-select v-model="form.status" placeholder="请选择">
                  <a-option value="0">禁用</a-option>
                  <a-option value="1">启用</a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-col :span="4" class="text-right">
        <a-space>
          <a-button type="primary" v-debounce="handleSearch">查询</a-button>
          <a-button v-debounce="handleReset">重置 </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-divider />
    <a-row :gutter="[0, 20]">
      <a-col :span="24">
        <a-space>
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </a-space>
      </a-col>
      <a-col :span="24">
        <a-table :columns="columns" :loading="tableLoading" row-key="id" :data="menuTree">
          <template #name="{ record }">
            <div class="flex items-center">
              <GiSvgIcon :name="record.icon" :size="15" />
              <span style="margin-left: 5px; vertical-align: middle">{{ record.name }}</span>
            </div>
          </template>
          <template #type="{ record }">
            <a-tag v-if="record.type === 1" color="arcoblue">目录</a-tag>
            <a-tag v-if="record.type === 2" color="green">菜单</a-tag>
            <a-tag v-if="record.type === 3">按钮</a-tag>
          </template>
          <template #createdAt="{ record }">
            {{ useFilterTime(record.createdAt) }}
          </template>
          <template #status="{ record }">
            <GiCekkStatus :status="record.status" />
          </template>
          <template #optional="{ record }">
            <a-link @click="handleEdit(record)">编辑</a-link>
            <a-link status="danger" @click="handleDelete(record.id)"> 删除 </a-link>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
  <AddMenuDrawer ref="AddMenuDrawerRef" />
</template>

<script lang="ts" setup>
import AddMenuDrawer from './components/AddMenuModal.vue'
import { Message, Modal, type TableColumnData } from '@arco-design/web-vue'
import { useFilterTime } from '@/hooks/useFilterTime'
import { useMenuStore } from '@/stores'
import { deleteMenuApi } from '@/apis/system/menu'

const { getMenuTree } = useMenuStore()
const { menuTree } = storeToRefs(useMenuStore())

const form = ref<ISearchRoleParams>({})
const columns: TableColumnData[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    slotName: 'type',
  },
  {
    title: '状态',
    slotName: 'status',
    dataIndex: 'status',
  },
  {
    title: '路由地址',
    dataIndex: 'route',
  },
  {
    title: '组件名称',
    dataIndex: 'componentName',
  },
  {
    title: '组件路径',
    dataIndex: 'componentPath',
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
  },
  {
    title: '创建时间',
    slotName: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: '操作',
    slotName: 'optional',
    width: 160,
    align: 'center',
    fixed: 'right',
  },
]
const tableLoading = ref(false)

const handleSearch = async () => {
  try {
    tableLoading.value = true
    await getMenuTree()
  } catch {
    //
  } finally {
    tableLoading.value = false
  }
}
handleSearch()

/** @description 重置 */
const handleReset = () => {
  form.value = {}
  handleSearch()
}

/** @description 新增部门 */
const handleAdd = () => {
  AddMenuDrawerRef.value?.open()
}

/**
 * @description 编辑部门
 * @param record 部门信息
 */
const handleEdit = (record: any) => {
  AddMenuDrawerRef.value?.onUpdate(record.id)
}

const handleDelete = (id: number) => {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除该菜单吗？',
    onOk: async () => {
      try {
        await deleteMenuApi(id)
        handleSearch()
        Message.success('删除成功')
      } catch {}
    },
  })
}

const AddMenuDrawerRef = ref<InstanceType<typeof AddMenuDrawer>>()
</script>

<style lang="less" scoped>
.arco-form-item {
  margin-bottom: 0px;
}
</style>
