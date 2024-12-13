<template>
  <div class="bg-white w-full min-h-full p-5 box-border">
    <a-row align="center">
      <a-col :span="20">
        <a-form :model="form" layout="inline">
          <a-row class="w-full">
            <a-col :span="8">
              <a-form-item field="username" label="用户名称">
                <a-input v-model="form.username" placeholder="请输入" />
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
    <a-row :gutter="[20, 20]">
      <a-col :span="5">
        <DepartmentTree />
      </a-col>
      <a-col :span="19">
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
            :data="userList"
          >
            <template #createdAt="{ record }">
              {{ useFilterTime(record.createdAt) }}
            </template>
            <template #status="{ record }">
              <GiCekkStatus :status="record.status" />
            </template>
            <template #optional="{ record }">
              <a-link @click="handleEdit(record)">编辑</a-link>
              <a-link status="danger" v-if="!record.children" @click="handleDelete(record.id)">
                删除
              </a-link>
            </template>
          </a-table>
        </a-col>
      </a-col>
    </a-row>
  </div>
  <AddUserDrawer ref="AddUserDrawerRef" />
</template>

<script lang="ts" setup>
import { Message, Modal, type TableColumnData } from '@arco-design/web-vue'
import { useFilterTime } from '@/hooks/useFilterTime'
import DepartmentTree from './components/DepartmentTree.vue'
import AddUserDrawer from './components/AddUserDrawer.vue'

import { useUserStore } from '@/stores'
import { Pagination } from '@/utils/useClass'

const { getUserList } = useUserStore()
const { userList } = storeToRefs(useUserStore())

const form = ref<ISearchUserParams>({})
const columns: TableColumnData[] = [
  {
    title: '用户名称',
    dataIndex: 'username',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
  },
  {
    title: '创建时间',
    slotName: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: '状态',
    slotName: 'status',
    dataIndex: 'status',
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
    await getUserList({
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

/** @description 新增部门 */
const handleAdd = () => {
  AddUserDrawerRef.value?.open()
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

const AddUserDrawerRef = ref<InstanceType<typeof AddUserDrawer>>()
</script>

<style lang="less" scoped>
.arco-form-item {
  margin-bottom: 0px;
}
</style>
