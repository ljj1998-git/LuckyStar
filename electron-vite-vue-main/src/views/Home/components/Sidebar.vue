<template>
  <div
    class="bg-white rounded-r-md w-full h-full flex flex-col items-center justify-between py-4"
  >
    <div class="w-full flex flex-col items-center gap-2">
      <div>
        <n-avatar
          :style="{
            color: 'yellow',
            backgroundColor: 'red',
          }"
        >
          M
        </n-avatar>
      </div>

      <div class="flex flex-col items-center gap-2">
        <div>
          <n-button quaternary circle>
            <template #icon>
              <n-icon><CashIcon /></n-icon>
            </template>
          </n-button>
          <div class="text-xs">学习集</div>
        </div>
        <div>
          <n-button quaternary circle>
            <template #icon>
              <n-icon><CashIcon /></n-icon>
            </template>
          </n-button>
          <div class="text-xs">学习集</div>
        </div>
      </div>
    </div>
    <div class="cursor-pointer"></div>
  </div>
</template>

<script setup lang="ts">
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import { NButton, NAvatar, NIcon, NSpace } from "naive-ui";
</script>
