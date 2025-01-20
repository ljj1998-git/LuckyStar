<template>
  <a-modal
    v-model:visible="visible"
    title="分配角色"
    :mask-closable="false"
    :esc-to-close="false"
    :width="1100"
    draggable
    @before-ok="onOk"
    @close="onClose"
  >
    <a-row :gutter="16">
      <a-col :span="24" :md="17">
        <a-space wrap :size="[8, 8]">
          <a-input v-model="queryForm.name" placeholder="搜索角色名" allow-clear />
          <a-button type="primary" v-debounce="getRole">
            <template #icon>
              <icon-search />
            </template>
            <template #default>查询</template>
          </a-button>
        </a-space>
        <a-alert>
          <template v-if="selectedKeys.length > 0">
            已选中 {{ selectedKeys.length }} 条记录(可跨页)
          </template>
          <template v-else> 未选中任何记录 </template>
          <template v-if="selectedKeys.length > 0" #action>
            <a-link @click="onClearSelected">清空</a-link>
          </template>
        </a-alert>
        <a-table
          class="mt-2"
          v-model:selectedKeys="selectedKeys"
          :data="roleList"
          :loading="tableLoading"
          :columns="columns"
          :pagenation="pagenation"
          :row-selection="{ type: 'checkbox', showCheckedAll: true }"
          row-key="id"
          @select="onSelect"
          @select-all="onSelectAll"
        >
          <template #createdAt="{ record }">
            {{ useFilterTime(record.createdAt) }}
          </template>
        </a-table>
      </a-col>
      <a-col :span="24" :md="7" class="section">
        <a-card>
          <template #title>已选择: {{ selectedKeys.length }}</template>
          <a-table
            :data="[...selectedData.values()]"
            :columns="selectedColumns"
            :pagination="paginationOptions"
          >
            <template #name="{ record }">
              {{ record.name }}
            </template>
            <template #action="{ record }">
              <a-button status="danger" size="mini" @click="handleDeleteSelectedRole(record)">
                <icon-delete />
              </a-button>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script setup lang="ts">
import { Message, type TableColumnData } from '@arco-design/web-vue'
import { useFilterTime } from '@/hooks/useFilterTime'

import { useRoleStore } from '@/stores'
import { Pagination } from '@/utils/useClass'
import { bindRoleApi, getBindRoleApi } from '@/apis/system/user'

const { getRoleList } = useRoleStore()
const { roleList } = storeToRefs(useRoleStore())

const emits = defineEmits(['ok'])
const tableLoading = ref(false)
const queryForm = ref({
  name: '',
})

const dataId = ref()
const visible = ref(false)
const selectedKeys = ref<number[]>([])
const selectedData = ref<Map<number, IRole>>(new Map())
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
]

// 右侧已选用户列定义
const selectedColumns = [
  {
    title: '角色',
    dataIndex: 'name',
    slotName: 'name',
    minWidth: 140,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 90,
  },
]
const paginationOptions = {
  defaultPageSize: 10,
  defaultSizeOptions: [10, 20, 30, 40, 50],
}

/** 获取角色列表 */
const getRole = async () => {
  try {
    tableLoading.value = true
    await getRoleList({
      ...queryForm.value,
      pageNum: pagenation.current,
      pageSize: pagenation.pageSize,
    })
  } catch {
    //
  } finally {
    tableLoading.value = false
  }
}
const pagenation = new Pagination(getRole)

// 单选
const onSelect = (rowKeys: any, rowKey: any, record: any) => {
  if (rowKeys.includes(rowKey)) {
    // 选中时，添加到 Map
    selectedData.value.set(rowKey, record)
  } else {
    // 取消选中时，从 Map 移除
    selectedData.value.delete(rowKey)
  }
  selectedKeys.value = Array.from(selectedData.value.keys())
}

// 全选
const onSelectAll = (checked: boolean) => {
  if (checked) {
    // 全选时，将所有数据添加到 Map
    roleList.value.forEach((item) => {
      selectedData.value.set(item.id, item)
    })
    selectedKeys.value = Array.from(selectedData.value.keys())
  } else {
    // 取消全选时，清空 Map
    roleList.value.forEach((item) => {
      selectedData.value.delete(item.id)
    })
    selectedKeys.value = Array.from(selectedData.value.keys())
  }
}

// 从选中列表中移除用户
const handleDeleteSelectedRole = (role: IRole) => {
  selectedData.value.delete(role.id)
  selectedKeys.value = Array.from(selectedData.value.keys())
}

// 清空所有选中数据
const onClearSelected = () => {
  selectedData.value.clear()
  selectedKeys.value = []
}

// 保存
const onOk = async () => {
  try {
    await bindRoleApi({
      userId: dataId.value,
      roleIds: selectedKeys.value,
    })
    Message.success('分配成功')
    emits('ok')
    onClose()
    return true
  } catch (error) {
    return false
  }
}

const onClose = () => {
  visible.value = false
}

// 打开
const onOpen = async (id: number) => {
  dataId.value = id
  await getRole()
  const res = await getBindRoleApi(id)
  selectedKeys.value = res.data
  selectedData.value.clear()

  roleList.value.forEach((item) => {
    if (selectedKeys.value.includes(item.id)) {
      selectedData.value.set(item.id, item)
    }
  })

  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
