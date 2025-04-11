<template>
  <RouterView />
</template>

<script setup lang="ts">
import { NConfigProvider } from "naive-ui";

const themeOverrides = {
  common: {
    primaryColor: "#5c8aff",
  },
};
</script>

<style></style>
