<template>
  <div class="bg-white w-full min-h-full p-5 box-border">
    <a-row align="center">
      <a-col :span="20">
        <a-form :model="form" layout="inline">
          <a-row class="w-full">
            <a-col :span="8">
              <a-form-item field="name" label="角色名称">
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
        <a-table
          :columns="columns"
          :pagenation="pagenation"
          :loading="tableLoading"
          row-key="id"
          :data="roleList"
        >
          <template #createdAt="{ record }">
            {{ useFilterTime(record.createdAt) }}
          </template>
          <template #optional="{ record }">
            <a-link @click="handleEdit(record)">编辑</a-link>
            <a-link status="danger" v-if="!record.children" @click="handleDelete(record.id)">
              删除
            </a-link>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
  <AddRoleDrawer ref="AddRoleDrawerRef" />
</template>

<script lang="ts" setup>
import { Message, Modal, type TableColumnData } from '@arco-design/web-vue'
import { useFilterTime } from '@/hooks/useFilterTime'
import { useRoleStore } from '@/stores'
import { Pagination } from '@/utils/useClass'
import AddRoleDrawer from './components/AddRoleModal.vue'
import { getRoleListApi } from '@/apis/system/role'

const { getRoleList } = useRoleStore()
const { roleList } = storeToRefs(useRoleStore())

const form = ref<ISearchRoleParams>({})
const columns: TableColumnData[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '编码',
    dataIndex: 'code',
  },
  {
    title: '创建时间',
    slotName: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: '描述',
    dataIndex: 'description',
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
    await getRoleList({
      ...form.value,
      pageNum: pagenation.current,
      pageSize: pagenation.pageSize,
    })
  } catch {
    //
  } finally {
    tableLoading.value = false
  }
}
const pagenation = new Pagination(handleSearch)
handleSearch()

/** @description 重置 */
const handleReset = () => {
  form.value = {}
  handleSearch()
}

/** @description 新增角色 */
const handleAdd = () => {
  AddRoleDrawerRef.value?.open()
}

/**
 * @description 编辑部门
 * @param record 部门信息
 */
const handleEdit = (record: any) => {
  AddUserDrawerRef.value?.onUpdate(record.id)
}

const handleDelete = (id: number) => {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除该部门吗？',
    onOk: async () => {
      try {
        await deleteDepartment(id)
        Message.success('删除成功')
      } catch {}
    },
  })
}

const AddRoleDrawerRef = ref<InstanceType<typeof AddRoleDrawer>>()
</script>

<style lang="less" scoped>
.arco-form-item {
  margin-bottom: 0px;
}
</style>
