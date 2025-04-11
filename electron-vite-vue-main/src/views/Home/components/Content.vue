<template>
  <n-layout>
    <n-layout-header bordered class="p-2">
      <n-space>
        <n-button type="primary" size="small">
          导入
          <template #icon>
            <DuplicateOutline />
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content content-style="padding: 16px">
      <n-space>
        <n-card hoverable class="w-20 cursor-pointer p-2" @click="handleClick">
          <template #cover>
            <n-image
              preview-disabled
              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
          </template>
        </n-card>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { DuplicateOutline } from "@vicons/ionicons5";
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NButton,
  NCard,
  NImage,
} from "naive-ui";
import router from "../../../routers";

const handleClick = () => {
  router.push("/WorkSpace");
};
</script>
