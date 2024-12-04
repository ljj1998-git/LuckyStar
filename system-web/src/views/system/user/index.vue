<template>
  <div class="content">
    <a-row>
      <a-col :flex="1">
        <a-form
          :model="form"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
          label-align="left"
        >
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item
                field="username"
                label="用户名"
                label-col-flex="50px"
              >
                <a-input v-model="form.username" placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-col :flex="'86px'" style="text-align: right">
        <a-space>
          <a-button type="primary">
            <template #icon>
              <icon-search />
            </template>
            查询
          </a-button>
          <a-button>
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <icon-plus />
            </template>
            新增
          </a-button>
          <a-upload action="/">
            <template #upload-button>
              <a-button type="primary" status="danger">
                <template #icon>
                  <icon-delete />
                </template>
                批量删除
              </a-button>
            </template>
          </a-upload>
        </a-space>
      </a-col>
      <a-col :span="24">
        <a-table></a-table>
      </a-col>
    </a-row>
  </div>
  <a-drawer
    :width="340"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title> 新增用户 </template>
    <div
      >You can customize modal body text by the current situation. This modal
      will be closed immediately once you press the OK button.
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const visible = ref(false);

  const form = ref({
    username: '',
  });

  const handleAdd = () => {
    visible.value = true;
  };

  const handleOk = () => {};

  const handleCancel = () => {
    visible.value = false;
  };
</script>

<style scoped lang="less">
  .content {
    margin: 16px;
    padding: 16px;
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    box-sizing: border-box;
    background-color: var(--color-bg-1);
  }
</style>
