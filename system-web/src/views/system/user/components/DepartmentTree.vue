<template>
  <div class="search">
    <a-input v-model="searchKey" placeholder="搜索部门名称" allow-clear>
      <template #prefix><icon-search /></template>
    </a-input>
  </div>
  <div class="mt-2">
    <div class="tree">
      <a-tree
        ref="treeRef"
        :data="treeData"
        show-line
        block-node
        :fieldNames="{ key: 'id', title: 'name' }"
        default-expand-all
        @select="select"
        :selectedKeys="selectedKeys"
      >
        <template #switcher-icon="node, { isLeaf }">
          <IconCaretDown v-if="!isLeaf" />
          <IconIdcard v-else />
        </template>
        <template #title="node">
          <a-tooltip :content="node.name" position="tl">
            <div class="text-wrap">{{ node.name }}</div>
          </a-tooltip>
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDepartmentStore } from '@/stores'

const { getDepartmentTree } = useDepartmentStore()
const { departmentTree } = storeToRefs(useDepartmentStore())

getDepartmentTree()

const emit = defineEmits<{
  (e: 'node-click', keys: Array<any>): void
}>()

// 选中节点
const selectedKeys = ref([departmentTree.value[0].id])
const select = (keys: Array<any>) => {
  if (selectedKeys.value && selectedKeys.value[0] === keys[0]) {
    return
  }
  selectedKeys.value = keys
  emit('node-click', keys)
}

const treeRef = ref()

// 过滤树
const searchKey = ref('')
const search = (keyword: string) => {
  const loop = (data: IDepartmentTree[]) => {
    const result = [] as IDepartmentTree[]
    data.forEach((item: IDepartmentTree) => {
      if (item.name?.toLowerCase().includes(keyword)) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData,
          })
        }
      }
    })
    return result
  }
  return loop(departmentTree.value)
}

const treeData = computed(() => {
  if (!searchKey.value) return departmentTree.value
  return search(searchKey.value.toLowerCase())
})

const reset = () => {
  selectedKeys.value = [0]
}

defineExpose({
  reset,
})

// onMounted(() => {
//   getDeptList()
// })
</script>

<style lang="less" scoped>
:deep(.arco-tree-node-title-text) {
  width: 100%;
  white-space: nowrap;
}

:deep(.arco-tree-node) {
  line-height: normal;
  border-radius: var(--border-radius-medium);
  &:hover {
    background-color: var(--color-secondary-hover);
  }

  .arco-tree-node-title {
    &:hover {
      background-color: transparent;
    }
  }
}

:deep(.arco-tree-node-selected) {
  font-weight: bold;
  background-color: rgba(var(--primary-6), 0.1);
  &:hover {
    background-color: rgba(var(--primary-6), 0.1);
  }
  .arco-typography {
    color: rgb(var(--primary-6));
  }
}
</style>
