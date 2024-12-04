<template>
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

  const handleOk = () => {};

  const handleCancel = () => {
    visible.value = false;
  };
</script>
